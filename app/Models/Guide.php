<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guide extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'photo_url',
        'languages',
        'specialties',
        'national_id',
        'is_verified',
        'hourly_rate',
        'total_bookings',
        'avg_rating'
    ];

    protected $casts = [
        'languages' => 'array',
        'specialties' => 'array',
        'is_verified' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }
}
