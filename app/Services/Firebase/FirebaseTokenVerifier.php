<?php

namespace App\Services\Firebase;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class FirebaseTokenVerifier
{
    private const CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

    /**
     * @return array<string, mixed>
     */
    public function verify(string $idToken): array
    {
        $projectId = config('services.firebase.project_id');

        if (! is_string($projectId) || $projectId === '') {
            throw ValidationException::withMessages([
                'firebase' => 'Firebase project ID is not configured.',
            ]);
        }

        [$encodedHeader, $encodedPayload, $encodedSignature] = $this->splitToken($idToken);
        $header = $this->decodeJsonSegment($encodedHeader);
        $payload = $this->decodeJsonSegment($encodedPayload);

        if (($header['alg'] ?? null) !== 'RS256' || ! is_string($header['kid'] ?? null)) {
            $this->fail();
        }

        $cert = $this->certificates()[$header['kid']] ?? null;

        if (! is_string($cert)) {
            $this->fail();
        }

        $signature = $this->base64UrlDecode($encodedSignature);
        $verified = openssl_verify(
            $encodedHeader.'.'.$encodedPayload,
            $signature,
            $cert,
            OPENSSL_ALGO_SHA256,
        );

        if ($verified !== 1) {
            $this->fail();
        }

        $now = time();
        $issuer = 'https://securetoken.google.com/'.$projectId;

        if (
            ($payload['aud'] ?? null) !== $projectId ||
            ($payload['iss'] ?? null) !== $issuer ||
            ! is_string($payload['sub'] ?? null) ||
            $payload['sub'] === '' ||
            strlen($payload['sub']) > 128 ||
            ! is_numeric($payload['iat'] ?? null) ||
            ! is_numeric($payload['exp'] ?? null) ||
            (int) $payload['iat'] > $now ||
            (int) $payload['exp'] <= $now
        ) {
            $this->fail();
        }

        return $payload;
    }

    /**
     * @return array{string, string, string}
     */
    private function splitToken(string $idToken): array
    {
        $segments = explode('.', $idToken);

        if (count($segments) !== 3) {
            $this->fail();
        }

        return [$segments[0], $segments[1], $segments[2]];
    }

    /**
     * @return array<string, mixed>
     */
    private function decodeJsonSegment(string $segment): array
    {
        $decoded = json_decode($this->base64UrlDecode($segment), true);

        if (! is_array($decoded)) {
            $this->fail();
        }

        return $decoded;
    }

    private function base64UrlDecode(string $value): string
    {
        $decoded = base64_decode(strtr($value, '-_', '+/'), true);

        if ($decoded === false) {
            $this->fail();
        }

        return $decoded;
    }

    /**
     * @return array<string, string>
     */
    private function certificates(): array
    {
        return Cache::remember('firebase.securetoken.certificates', now()->addHour(), function () {
            $response = Http::acceptJson()->timeout(10)->get(self::CERTS_URL);

            if (! $response->successful()) {
                throw ValidationException::withMessages([
                    'firebase' => 'Firebase certificates could not be loaded.',
                ]);
            }

            /** @var array<string, string> $certificates */
            $certificates = $response->json();

            return $certificates;
        });
    }

    private function fail(): never
    {
        throw ValidationException::withMessages([
            'firebase' => 'Firebase authentication failed.',
        ]);
    }
}
