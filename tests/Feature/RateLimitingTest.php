<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RateLimitingTest extends TestCase
{
    use RefreshDatabase;

    public function test_firebase_auth_is_rate_limited(): void
    {
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->post(route('firebase.auth'))->assertSessionHasErrors('id_token');
        }

        $this->post(route('firebase.auth'))->assertTooManyRequests();
    }
}
