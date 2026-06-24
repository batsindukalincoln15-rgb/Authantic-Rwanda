<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Services\Stripe\StripeCheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Stripe\Exception\ApiErrorException;
use Stripe\Exception\SignatureVerificationException;
use Symfony\Component\HttpFoundation\Response;
use UnexpectedValueException;

class StripePaymentController extends Controller
{
    public function checkout(Booking $booking, StripeCheckoutService $stripe): Response
    {
        $this->authorizeBooking($booking);

        if ($booking->payment_status === 'paid') {
            return redirect()->route('dashboard')->with('status', 'This booking has already been paid.');
        }

        try {
            $session = $stripe->createCheckoutSession($booking);
        } catch (UnexpectedValueException $e) {
            report($e);

            return back()->withErrors([
                'payment' => 'Stripe is not configured yet. Add STRIPE_SECRET to your .env file and restart the server.',
            ]);
        } catch (ApiErrorException $e) {
            report($e);

            return back()->withErrors([
                'payment' => 'Stripe checkout is unavailable. Please try again shortly.',
            ]);
        }

        $booking->forceFill([
            'payment_method' => 'Stripe',
            'stripe_checkout_session_id' => $session->id,
        ])->save();

        return Inertia::location($session->url);
    }

    public function success(Request $request, Booking $booking, StripeCheckoutService $stripe): RedirectResponse
    {
        $this->authorizeBooking($booking);

        $sessionId = $request->string('session_id')->toString();

        if ($sessionId !== '' && $sessionId === $booking->stripe_checkout_session_id) {
            try {
                $session = $stripe->retrieveCheckoutSession($sessionId);
                $this->markBookingPaidFromSession($booking, $session);
            } catch (ApiErrorException|UnexpectedValueException $e) {
                report($e);
            }
        }

        return redirect()->route('dashboard')->with('status', 'Thanks. We are confirming your Stripe payment.');
    }

    public function cancel(Booking $booking): RedirectResponse
    {
        $this->authorizeBooking($booking);

        return redirect()
            ->route('bookings.payment', $booking)
            ->with('status', 'Stripe checkout was cancelled. You can try again when ready.');
    }

    public function webhook(Request $request, StripeCheckoutService $stripe): Response
    {
        try {
            $event = $stripe->constructWebhookEvent(
                $request->getContent(),
                $request->header('Stripe-Signature'),
            );
        } catch (SignatureVerificationException|UnexpectedValueException $e) {
            Log::warning('Rejected Stripe webhook.', ['message' => $e->getMessage()]);

            return response('Invalid Stripe webhook.', 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;

            if (is_object($session) && isset($session->id)) {
                $booking = Booking::query()
                    ->where('stripe_checkout_session_id', $session->id)
                    ->first();

                if ($booking) {
                    $this->markBookingPaidFromSession($booking, $session);
                }
            }
        }

        return response('', 200);
    }

    private function authorizeBooking(Booking $booking): void
    {
        abort_unless($booking->user_id === Auth::id(), 404);
    }

    private function markBookingPaidFromSession(Booking $booking, object $session): void
    {
        if ($session->payment_status !== 'paid') {
            return;
        }

        $booking->forceFill([
            'payment_status' => 'paid',
            'payment_method' => 'Stripe',
            'transaction_id' => is_string($session->payment_intent) ? $session->payment_intent : $booking->transaction_id,
            'stripe_payment_intent_id' => is_string($session->payment_intent) ? $session->payment_intent : $booking->stripe_payment_intent_id,
            'paid_at' => $booking->paid_at ?? now(),
        ])->save();
    }
}
