<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Firebase\FirebaseTokenVerifier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FirebaseAuthController extends Controller
{
    public function store(Request $request, FirebaseTokenVerifier $verifier): RedirectResponse
    {
        $validated = $request->validate([
            'id_token' => ['required', 'string'],
            'phone_number' => ['nullable', 'string', 'max:30'],
        ]);

        $payload = $verifier->verify($validated['id_token']);
        $email = $payload['email'] ?? null;

        if (! is_string($email) || $email === '') {
            return back()->withErrors([
                'firebase' => 'Your Firebase account must include an email address.',
            ]);
        }

        $user = User::query()
            ->where('firebase_uid', $payload['sub'])
            ->orWhere('email', $email)
            ->first();

        if (! $user) {
            $user = User::create([
                'firebase_uid' => $payload['sub'],
                'name' => $this->displayName($payload, $email),
                'email' => $email,
                'email_verified_at' => ($payload['email_verified'] ?? false) ? now() : null,
                'password' => Str::password(40),
                'role' => 'tourist',
                'phone_number' => $validated['phone_number'] ?? null,
            ]);
        } else {
            $user->forceFill([
                'firebase_uid' => $user->firebase_uid ?: $payload['sub'],
                'email_verified_at' => $user->email_verified_at
                    ?: (($payload['email_verified'] ?? false) ? now() : null),
            ])->save();
        }

        Auth::login($user, true);
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function displayName(array $payload, string $email): string
    {
        if (is_string($payload['name'] ?? null) && $payload['name'] !== '') {
            return $payload['name'];
        }

        return Str::of($email)->before('@')->replace(['.', '_', '-'], ' ')->title()->toString();
    }
}
