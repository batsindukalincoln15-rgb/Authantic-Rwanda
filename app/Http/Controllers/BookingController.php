<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    /**
     * Store a newly created booking.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $experience = Experience::findOrFail($request->experience_id);

        $validated = $request->validate([
            'experience_id' => 'required|exists:experiences,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'number_of_people' => 'required|integer|min:1',
        ]);

        $totalPrice = $experience->price * $validated['number_of_people'];

        $booking = Booking::create([
            'user_id' => $user->id,
            'experience_id' => $experience->id,
            'booking_date' => $validated['booking_date'],
            'number_of_people' => $validated['number_of_people'],
            'total_price' => $totalPrice,
            'payment_status' => 'pending',
        ]);

        // Redirect to a simulated payment page
        return redirect()->route('bookings.payment', ['id' => $booking->id]);
    }

    /**
     * Show the simulated payment page.
     */
    public function payment($id)
    {
        $booking = Booking::with('experience')->findOrFail($id);
        
        return Inertia::render('bookings/payment', [
            'booking' => $booking
        ]);
    }

    /**
     * Confirm the payment (Simulated).
     */
    public function confirm($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update([
            'payment_status' => 'paid',
            'payment_method' => 'MoMo',
            'transaction_id' => 'RW_' . uniqid()
        ]);

        return redirect()->route('dashboard')->with('status', 'Payment successful! Your adventure is confirmed.');
    }
}
