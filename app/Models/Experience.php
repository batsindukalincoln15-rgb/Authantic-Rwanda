<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'guide_id',
        'title',
        'description',
        'location_name',
        'latitude',
        'longitude',
        'duration',
        'price',
        'category',
        'cover_image',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function guide()
    {
        return $this->belongsTo(Guide::class);
    }

    /**
     * Get the reviews for the experience.
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
