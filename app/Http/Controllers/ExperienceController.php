<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use App\Models\Guide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the guide's own experiences.
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->role !== 'guide') {
            return redirect()->route('dashboard');
        }

        $guide = Guide::where('user_id', $user->id)->first();

        $experiences = $guide
            ? Experience::where('guide_id', $guide->id)->latest()->get()
            : collect([]);

        return Inertia::render('experiences/index', [
            'experiences' => $experiences,
            'guide' => $guide,
        ]);
    }

    /**
     * Show the form for creating a new experience.
     */
    public function create()
    {
        $user = Auth::user();

        if ($user->role !== 'guide') {
            return redirect()->route('dashboard');
        }

        // Auto-create a guide profile if it doesn't exist yet
        $guide = Guide::firstOrCreate(
            ['user_id' => $user->id],
            [
                'bio' => null,
                'specialties' => [],
                'languages' => [],
                'is_verified' => false,
                'national_id' => 'PENDING_'.$user->id,
            ]
        );

        return Inertia::render('experiences/create');
    }

    /**
     * Display the specified experience.
     */
    public function show($id)
    {
        $experience = Experience::with(['guide.user', 'reviews.user'])->findOrFail($id);

        return Inertia::render('experiences/show', [
            'experience' => $experience,
        ]);
    }

    /**
     * Store a newly created experience in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        if ($user->role !== 'guide') {
            abort(403);
        }

        // Auto-create a guide profile if it doesn't exist yet
        $guide = Guide::firstOrCreate(
            ['user_id' => $user->id],
            [
                'bio' => null,
                'specialties' => [],
                'languages' => [],
                'is_verified' => false,
                'national_id' => 'PENDING_'.$user->id,
            ]
        );

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

        return redirect()->route('experiences.index')->with('status', 'Experience created successfully!');
    }

    /**
     * Show the form for editing the specified experience.
     */
    public function edit($id)
    {
        $user = Auth::user();

        if ($user->role !== 'guide') {
            return redirect()->route('dashboard');
        }

        $guide = Guide::where('user_id', $user->id)->first();

        if (! $guide) {
            return redirect()->route('experiences.index');
        }

        $experience = Experience::where('guide_id', $guide->id)->findOrFail($id);

        return Inertia::render('experiences/edit', [
            'experience' => $experience,
        ]);
    }

    /**
     * Update the specified experience in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if ($user->role !== 'guide') {
            abort(403);
        }

        $guide = Guide::where('user_id', $user->id)->first();

        if (! $guide) {
            abort(403);
        }

        $experience = Experience::where('guide_id', $guide->id)->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location_name' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $experience->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location_name' => $validated['location_name'],
            'duration' => $validated['duration'],
            'price' => $validated['price'],
            'category' => $validated['category'] ?? 'General',
            'is_active' => $validated['is_active'] ?? $experience->is_active,
        ]);

        return redirect()->route('experiences.index')->with('status', 'Experience updated successfully!');
    }

    /**
     * Remove the specified experience from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();

        if ($user->role !== 'guide') {
            abort(403);
        }

        $guide = Guide::where('user_id', $user->id)->first();

        if (! $guide) {
            abort(403);
        }

        $experience = Experience::where('guide_id', $guide->id)->findOrFail($id);
        $experience->delete();

        return redirect()->route('experiences.index')->with('status', 'Experience deleted successfully.');
    }
}
