<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Experience;
use App\Models\Guide;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityHardeningTest extends TestCase
{
    use RefreshDatabase;

    public function test_debug_migration_route_is_not_available(): void
    {
        $this->get('/debug/migrate')->assertNotFound();
    }

    public function test_admin_dashboard_requires_admin_role(): void
    {
        $user = User::factory()->create(['role' => 'tourist']);

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertForbidden();
    }

    public function test_admin_can_view_admin_dashboard(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }

    public function test_users_cannot_view_or_confirm_another_users_booking(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $experience = $this->createExperience();
        $booking = Booking::create([
            'user_id' => $owner->id,
            'experience_id' => $experience->id,
            'booking_date' => now()->addDay()->toDateString(),
            'number_of_people' => 2,
            'total_price' => 100,
            'payment_status' => 'pending',
        ]);

        $this->actingAs($otherUser)
            ->get(route('bookings.payment', $booking))
            ->assertNotFound();

        $this->actingAs($otherUser)
            ->post(route('bookings.confirm', $booking))
            ->assertNotFound();

        $this->assertSame('pending', $booking->fresh()->payment_status);
    }

    public function test_users_can_only_review_paid_booked_experiences_once(): void
    {
        $user = User::factory()->create();
        $experience = $this->createExperience();

        $this->actingAs($user)
            ->post(route('reviews.store'), [
                'experience_id' => $experience->id,
                'rating' => 5,
                'comment' => 'Excellent.',
            ])
            ->assertSessionHasErrors('experience_id');

        Booking::create([
            'user_id' => $user->id,
            'experience_id' => $experience->id,
            'booking_date' => now()->subDay()->toDateString(),
            'number_of_people' => 1,
            'total_price' => 50,
            'payment_status' => 'paid',
        ]);

        $this->actingAs($user)
            ->post(route('reviews.store'), [
                'experience_id' => $experience->id,
                'rating' => 5,
                'comment' => 'Excellent.',
            ])
            ->assertSessionHasNoErrors();

        $this->assertDatabaseCount(Review::class, 1);

        $this->actingAs($user)
            ->post(route('reviews.store'), [
                'experience_id' => $experience->id,
                'rating' => 4,
                'comment' => 'Still good.',
            ])
            ->assertSessionHasErrors('experience_id');

        $this->assertDatabaseCount(Review::class, 1);
    }

    public function test_unverified_guides_cannot_create_experiences(): void
    {
        $guideUser = User::factory()->create(['role' => 'guide']);

        Guide::create([
            'user_id' => $guideUser->id,
            'national_id' => 'PENDING_'.$guideUser->id,
            'is_verified' => false,
        ]);

        $this->actingAs($guideUser)
            ->post(route('experiences.store'), [
                'title' => 'Kigali City Walk',
                'description' => 'A guided city walk.',
                'location_name' => 'Kigali',
                'duration' => '2 hours',
                'price' => 30,
                'category' => 'City Tour',
            ])
            ->assertRedirect(route('guide.profile.edit'));

        $this->assertDatabaseCount(Experience::class, 0);
    }

    private function createExperience(): Experience
    {
        $guideUser = User::factory()->create(['role' => 'guide']);
        $guide = Guide::create([
            'user_id' => $guideUser->id,
            'national_id' => 'NID_'.$guideUser->id,
            'is_verified' => true,
        ]);

        return Experience::create([
            'guide_id' => $guide->id,
            'title' => 'Kigali City Walk',
            'description' => 'A guided city walk.',
            'location_name' => 'Kigali',
            'duration' => '2 hours',
            'price' => 50,
            'category' => 'City Tour',
            'is_active' => true,
        ]);
    }
}
