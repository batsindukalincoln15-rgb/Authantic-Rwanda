<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Experience;
use App\Models\Guide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with relevant stats and bookings.
     */
    public function index()
    {
        $user = Auth::user();
        $isGuide = $user->role === 'guide';
        
        $bookings = [];

        if ($isGuide) {
            // Find the guide profile
            $guide = Guide::where('user_id', $user->id)->first();
            
            if ($guide) {
                // Get bookings for all experiences owned by this guide
                $bookings = Booking::whereIn('experience_id', function($query) use ($guide) {
                    $query->select('id')->from('experiences')->where('guide_id', $guide->id);
                })->with(['experience', 'user'])->latest()->limit(5)->get();
            }
        } else {
            // Get bookings made by this tourist
            $bookings = Booking::where('user_id', $user->id)
                ->with(['experience.guide.user'])
                ->latest()
                ->limit(5)
                ->get();
        }

        return Inertia::render('dashboard', [
            'bookings' => $bookings,
            'isGuide' => $isGuide
        ]);
    }
}
