<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Store a newly created review.
     */
    public function store(Request $request)
    {
        $request->validate([
            'experience_id' => 'required|exists:experiences,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        Review::create([
            'user_id' => Auth::id(),
            'experience_id' => $request->experience_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('status', 'Thank you for your feedback! Your review has been posted.');
    }
}
