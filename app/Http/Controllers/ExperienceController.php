<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Guide;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ExperienceController extends Controller
{
    /**
     * Show the form for creating a new experience.
     */
    public function create()
    {
        $user = Auth::user();
        
        if ($user->role !== 'guide') {
            return redirect()->route('dashboard');
        }

        return Inertia::render('experiences/create');
    }

    /**
     * Display the specified experience.
     */
    public function show($id)
    {
        $experience = Experience::with(['guide.user', 'reviews.user'])->findOrFail($id);

        return Inertia::render('experiences/show', [
            'experience' => $experience
        ]);
    }

    /**
     * Store a newly created experience in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $guide = Guide::where('user_id', $user->id)->first();

        if (!$guide) {
            return redirect()->route('guide.profile.edit')->with('error', 'Please complete your guide profile first.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location_name' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:255',
        ]);

        $experience = Experience::create([
            'guide_id' => $guide->id,
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location_name' => $validated['location_name'],
            'duration' => $validated['duration'],
            'price' => $validated['price'],
            'category' => $validated['category'] ?? 'General',
            'is_active' => true,
        ]);

        return redirect()->route('dashboard')->with('status', 'Experience created successfully!');
    }
}
