<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Experience;
use App\Models\Guide;
use App\Models\User;
use App\Services\Stripe\StripeCheckoutService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Stripe\Checkout\Session;
use Tests\TestCase;

class StripePaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_payment_page_shows_booking_amount(): void
    {
        [$tourist, $booking] = $this->createBooking();

        $this->actingAs($tourist)
            ->get(route('bookings.payment', $booking))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('bookings/payment')
                ->where('booking.id', $booking->id)
                ->where('booking.payment_status', 'pending')
            );
    }

    public function test_stripe_success_marks_booking_paid_when_session_is_paid(): void
    {
        [$tourist, $booking] = $this->createBooking([
            'stripe_checkout_session_id' => 'cs_test_123',
        ]);

        $stripe = new class extends StripeCheckoutService
        {
            public function retrieveCheckoutSession(string $sessionId): Session
            {
                return Session::constructFrom([
                    'id' => $sessionId,
                    'payment_status' => 'paid',
                    'payment_intent' => 'pi_test_123',
                ]);
            }
        };

        $this->instance(StripeCheckoutService::class, $stripe);

        $this->actingAs($tourist)
            ->get(route('stripe.checkout.success', [
                'booking' => $booking,
                'session_id' => 'cs_test_123',
            ]))
            ->assertRedirect(route('dashboard'));

        $booking->refresh();

        $this->assertSame('paid', $booking->payment_status);
        $this->assertSame('Stripe', $booking->payment_method);
        $this->assertSame('pi_test_123', $booking->transaction_id);
        $this->assertSame('pi_test_123', $booking->stripe_payment_intent_id);
        $this->assertNotNull($booking->paid_at);
    }

    public function test_user_cannot_open_another_users_stripe_checkout(): void
    {
        [, $booking] = $this->createBooking();
        $otherUser = User::factory()->create();

        $this->actingAs($otherUser)
            ->post(route('stripe.checkout', $booking))
            ->assertNotFound();
    }

    /**
     * @return array{0: User, 1: Booking}
     */
    private function createBooking(array $bookingOverrides = []): array
    {
        $tourist = User::factory()->create();
        $guideUser = User::factory()->create(['role' => 'guide']);

        $guide = Guide::query()->create([
            'user_id' => $guideUser->id,
            'bio' => 'Local Kigali guide',
            'languages' => ['English'],
            'specialties' => ['Culture'],
            'national_id' => 'NID-'.uniqid(),
            'is_verified' => true,
            'hourly_rate' => 25,
        ]);

        $experience = Experience::query()->create([
            'guide_id' => $guide->id,
            'title' => 'Kigali City Walk',
            'description' => 'A compact city experience.',
            'location_name' => 'Kigali',
            'duration' => '3 hours',
            'price' => 50,
            'category' => 'City Tour',
            'is_active' => true,
        ]);

        $booking = Booking::query()->create(array_merge([
            'user_id' => $tourist->id,
            'experience_id' => $experience->id,
            'booking_date' => now()->addDay()->toDateString(),
            'number_of_people' => 2,
            'total_price' => 100,
            'payment_status' => 'pending',
        ], $bookingOverrides));

        return [$tourist, $booking];
    }
}
