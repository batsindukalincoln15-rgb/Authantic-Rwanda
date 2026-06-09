<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\FirebaseAuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DiscoveryController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::get('explore', [DiscoveryController::class, 'index'])
    ->middleware('throttle:app-public')
    ->name('explore');

Route::get('/', [DiscoveryController::class, 'index'])
    ->middleware('throttle:app-public')
    ->name('home');

Route::post('firebase/auth', [FirebaseAuthController::class, 'store'])
    ->middleware('throttle:firebase-auth')
    ->name('firebase.auth');

// Auth Required Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Admin Routes
    Route::get('admin', [AdminController::class, 'index'])
        ->middleware('admin')
        ->name('admin.dashboard');

    // Booking Flow
    Route::post('bookings', [BookingController::class, 'store'])
        ->middleware('throttle:app-actions')
        ->name('bookings.store');
    Route::get('bookings/{id}/payment', [BookingController::class, 'payment'])->name('bookings.payment');
    Route::post('bookings/{id}/confirm', [BookingController::class, 'confirm'])
        ->middleware('throttle:app-actions')
        ->name('bookings.confirm');

    // Review Flow
    Route::post('reviews', [ReviewController::class, 'store'])
        ->middleware('throttle:app-actions')
        ->name('reviews.store');

    // Guide Profiles
    Route::get('profile/guide', [GuideController::class, 'edit'])->name('guide.profile.edit');
    Route::post('profile/guide', [GuideController::class, 'update'])
        ->middleware('throttle:app-actions')
        ->name('guide.profile.update');

    // Experience Management
    Route::get('experiences/create', [ExperienceController::class, 'create'])->name('experiences.create');
    Route::post('experiences', [ExperienceController::class, 'store'])
        ->middleware('throttle:app-actions')
        ->name('experiences.store');
    Route::get('experiences/{id}', [ExperienceController::class, 'show'])->name('experiences.show');
});

require __DIR__.'/settings.php';
