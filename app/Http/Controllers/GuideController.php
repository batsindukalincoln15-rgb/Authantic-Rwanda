<?php

namespace App\Http\Controllers;

use App\Models\Guide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GuideController extends Controller
{
    /**
     * Show the form for editing the guide profile.
     */
    public function edit()
    {
        $user = Auth::user();
        
        // Ensure the user is actually a guide
        if ($user->role !== 'guide') {
            return redirect()->route('dashboard');
        }

        $guide = Guide::where('user_id', $user->id)->first();

        return Inertia::render('guide/profile', [
            'guide' => $guide,
        ]);
    }

    /**
     * Update the guide profile.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        
        if ($user->role !== 'guide') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'bio' => 'nullable|string|max:1000',
            'specialties' => 'nullable|string',
            'languages' => 'nullable|string',
        ]);

        // Convert comma-separated strings to arrays
        $specialties = $validated['specialties'] 
            ? array_map('trim', explode(',', $validated['specialties'])) 
            : [];
            
        $languages = $validated['languages'] 
            ? array_map('trim', explode(',', $validated['languages'])) 
            : [];

        $guide = Guide::updateOrCreate(
            ['user_id' => $user->id],
            [
                'bio' => $validated['bio'] ?? null,
                'specialties' => $specialties,
                'languages' => $languages,
                'is_verified' => false,
                'national_id' => 'PENDING_' . $user->id, // Add dummy ID to satisfy DB constraint
            ]
        );

        return redirect()->back()->with('status', 'Profile updated successfully!');
    }
}
