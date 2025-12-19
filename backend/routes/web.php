<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RecipeRatingController;
use App\Http\Controllers\RecipeNoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [MealController::class, 'index'])->name('home');

// Authentication routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login')->middleware('guest');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register')->middleware('guest');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Google OAuth routes
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');

// Password reset routes
Route::get('/forgot-password', [AuthController::class, 'showForgotPasswordForm'])->name('password.request')->middleware('guest');
Route::post('/forgot-password', [AuthController::class, 'sendPasswordResetLink'])->name('password.email')->middleware('guest');
Route::get('/reset-password/{token}', [AuthController::class, 'showResetPasswordForm'])->name('password.reset')->middleware('guest');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update')->middleware('guest');

// Meal API routes (public)
Route::get('/api/meals/random', [MealController::class, 'getRandomMeal'])->name('meals.random');
Route::get('/api/meals/{mealId}', [MealController::class, 'getMeal'])->name('meals.show');

// Protected routes - User content CRUD
Route::middleware('auth')->group(function () {
    // Profile page
    Route::get('/profile', function () {
        return Inertia::render('Profile');
    })->name('profile');
    // Favorites page
    Route::get('/favorites', function () {
        return Inertia::render('Favorites');
    })->name('favorites');
    Route::delete('/account', [AuthController::class, 'deleteAccount'])->name('account.delete');

    // Favorites
    Route::get('/api/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/api/favorites', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('/api/favorites/{mealId}', [FavoriteController::class, 'destroy'])->name('favorites.destroy');
    
    // Ratings
    Route::post('/api/ratings', [RecipeRatingController::class, 'store'])->name('ratings.store');
    Route::put('/api/ratings/{mealId}', [RecipeRatingController::class, 'update'])->name('ratings.update');
    Route::delete('/api/ratings/{mealId}', [RecipeRatingController::class, 'destroy'])->name('ratings.destroy');
    
    // Notes
    Route::post('/api/notes', [RecipeNoteController::class, 'store'])->name('notes.store');
    Route::put('/api/notes/{mealId}', [RecipeNoteController::class, 'update'])->name('notes.update');
    Route::delete('/api/notes/{mealId}', [RecipeNoteController::class, 'destroy'])->name('notes.destroy');
});
