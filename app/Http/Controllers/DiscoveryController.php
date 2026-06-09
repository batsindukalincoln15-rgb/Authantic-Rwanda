<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscoveryController extends Controller
{
    /**
     * Display the discovery page with all experiences.
     */
    public function index(Request $request)
    {
        $query = Experience::with('guide.user')->where('is_active', true);

        // Simple filtering by category if provided
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        $experiences = $query->latest()->get();

        return Inertia::render('explore', [
            'experiences' => $experiences,
            'filters' => $request->only(['category']),
        ]);
    }
}
