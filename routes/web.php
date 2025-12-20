<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RecipeRatingController;
use App\Http\Controllers\RecipeNoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Animated welcome page (LANDING PAGE)
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

// Main meals page
Route::get('/meals', [MealController::class, 'index'])->name('home');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::get('/login', [AuthController::class, 'showLoginForm'])
    ->name('login')
    ->middleware('guest');

Route::post('/login', [AuthController::class, 'login']);

Route::get('/register', [AuthController::class, 'showRegisterForm'])
    ->name('register')
    ->middleware('guest');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->name('logout')
    ->middleware('auth');

/*
|--------------------------------------------------------------------------
| Google OAuth
|--------------------------------------------------------------------------
*/

Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])
    ->name('auth.google');

Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])
    ->name('auth.google.callback');

/*
|--------------------------------------------------------------------------
| Password Reset (Forgot Password Flow)
|--------------------------------------------------------------------------
*/

// For authenticated users - send OTP
Route::post('/password/send-otp', [AuthController::class, 'sendPasswordResetOtp'])
    ->name('password.send-otp')
    ->middleware('auth');

// For non-authenticated users - forgot password flow
Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])
    ->name('password.request')
    ->middleware('guest');

Route::post('/forgot-password', [AuthController::class, 'sendPasswordResetOtp'])
    ->name('password.email')
    ->middleware('guest');

// Verify OTP page (for all users)
Route::get('/verify-otp', [AuthController::class, 'showVerifyOtpForm'])
    ->name('password.verify-form');

Route::post('/password/verify-otp', [AuthController::class, 'verifyPasswordResetOtp'])
    ->name('password.verify-otp');

// Reset password page and submission (available to all users)
Route::get('/reset-password/{token}', [AuthController::class, 'showResetPasswordForm'])
    ->name('password.reset');

Route::post('/reset-password', [AuthController::class, 'resetPassword'])
    ->name('password.update');

/*
|--------------------------------------------------------------------------
| Public Meal API
|--------------------------------------------------------------------------
*/

Route::get('/api/meals/random', [MealController::class, 'getRandomMeal'])
    ->name('meals.random');

Route::get('/api/meals/{mealId}', [MealController::class, 'getMeal'])
    ->name('meals.show');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    // Profile page
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');

    // Favorites page
    Route::get('/favorites', function () {
        return Inertia::render('Favorites');
    })->name('favorites.page');

    // Favorites API
    Route::get('/api/favorites', [FavoriteController::class, 'index'])
        ->name('favorites.index');

    Route::post('/api/favorites', [FavoriteController::class, 'store'])
        ->name('favorites.store');

    Route::delete('/api/favorites/{mealId}', [FavoriteController::class, 'destroy'])
        ->name('favorites.destroy');

    // Ratings API
    Route::post('/api/ratings', [RecipeRatingController::class, 'store'])
        ->name('ratings.store');

    Route::put('/api/ratings/{mealId}', [RecipeRatingController::class, 'update'])
        ->name('ratings.update');

    Route::delete('/api/ratings/{mealId}', [RecipeRatingController::class, 'destroy'])
        ->name('ratings.destroy');

    // Notes API
    Route::post('/api/notes', [RecipeNoteController::class, 'store'])
        ->name('notes.store');

    Route::put('/api/notes/{mealId}', [RecipeNoteController::class, 'update'])
        ->name('notes.update');

    Route::delete('/api/notes/{mealId}', [RecipeNoteController::class, 'destroy'])
        ->name('notes.destroy');

    // Account Management
    Route::post('/account/delete', [AuthController::class, 'deleteAccount'])
        ->name('account.delete');
});
