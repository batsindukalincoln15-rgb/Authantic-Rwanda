<?php

namespace App\Services\Stripe;

use App\Models\Booking;
use Illuminate\Support\Facades\Config;
use Stripe\Checkout\Session;
use Stripe\Event;
use Stripe\Exception\SignatureVerificationException;
use Stripe\StripeClient;
use Stripe\Webhook;
use UnexpectedValueException;

class StripeCheckoutService
{
    public function createCheckoutSession(Booking $booking): Session
    {
        $client = $this->client();
        $booking->loadMissing(['experience', 'user']);
        $amount = (int) round((float) $booking->total_price * 100);

        return $client->checkout->sessions->create([
            'mode' => 'payment',
            'customer_email' => $booking->user->email,
            'client_reference_id' => (string) $booking->id,
            'line_items' => [[
                'quantity' => 1,
                'price_data' => [
                    'currency' => Config::string('services.stripe.currency', 'usd'),
                    'unit_amount' => $amount,
                    'product_data' => [
                        'name' => $booking->experience->title,
                    ],
                ],
            ]],
            'metadata' => [
                'booking_id' => (string) $booking->id,
                'user_id' => (string) $booking->user_id,
            ],
            'payment_intent_data' => [
                'metadata' => [
                    'booking_id' => (string) $booking->id,
                    'user_id' => (string) $booking->user_id,
                ],
            ],
            'success_url' => route('stripe.checkout.success', $booking, absolute: true).'?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('stripe.checkout.cancel', $booking, absolute: true),
        ]);
    }

    public function retrieveCheckoutSession(string $sessionId): Session
    {
        return $this->client()->checkout->sessions->retrieve($sessionId);
    }

    /**
     * @throws SignatureVerificationException
     * @throws UnexpectedValueException
     */
    public function constructWebhookEvent(string $payload, ?string $signature): Event
    {
        $secret = (string) Config::get('services.stripe.webhook_secret', '');

        if ($signature === null || $secret === '') {
            throw new SignatureVerificationException('Missing Stripe webhook signature or secret.', null);
        }

        return Webhook::constructEvent($payload, $signature, $secret);
    }

    private function client(): StripeClient
    {
        $secret = (string) Config::get('services.stripe.secret', '');

        if ($secret === '' || $secret === 'sk_test_your_key_here') {
            throw new UnexpectedValueException('Stripe secret key is not configured.');
        }

        if (! str_starts_with($secret, 'sk_test_') && ! str_starts_with($secret, 'sk_live_')) {
            throw new UnexpectedValueException('Stripe secret key must start with sk_test_ or sk_live_.');
        }

        return new StripeClient($secret);
    }
}
