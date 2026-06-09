<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ReviewController extends Controller
{
    /**
     * Store a newly created review.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'experience_id' => [
                'required',
                'exists:experiences,id',
                Rule::unique('reviews')->where(fn ($query) => $query->where('user_id', Auth::id())),
            ],
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $hasPaidBooking = Booking::query()
            ->where('user_id', Auth::id())
            ->where('experience_id', $validated['experience_id'])
            ->where('payment_status', 'paid')
            ->exists();

        if (! $hasPaidBooking) {
            return back()->withErrors([
                'experience_id' => 'You can only review experiences you have completed.',
            ]);
        }

        Review::create([
            'user_id' => Auth::id(),
            'experience_id' => $validated['experience_id'],
            'rating' => $validated['rating'],
            'comment' => $validated['comment'] ?? null,
        ]);

        return back()->with('status', 'Thank you for your feedback! Your review has been posted.');
    }
}
