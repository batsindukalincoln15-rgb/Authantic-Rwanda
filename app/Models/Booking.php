<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'experience_id',
        'booking_date',
        'number_of_people',
        'total_price',
        'payment_status',
        'payment_method',
        'transaction_id'
    ];

    /**
     * Get the experience that was booked.
     */
    public function experience()
    {
        return $this->belongsTo(Experience::class);
    }

    /**
     * Get the user who made the booking.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
