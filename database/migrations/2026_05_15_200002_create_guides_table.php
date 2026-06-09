<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guides', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('bio')->nullable();
            $table->string('photo_url')->nullable();
            $table->json('languages')->nullable(); // Array of languages
            $table->json('specialties')->nullable(); // Array of specialties
            $table->string('national_id')->unique();
            $table->boolean('is_verified')->default(false);
            $table->decimal('hourly_rate', 8, 2)->default(0.00);
            $table->integer('total_bookings')->default(0);
            $table->decimal('avg_rating', 3, 2)->default(0.00);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guides');
    }
};
