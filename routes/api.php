<?php

use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MealController;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

// Apply Sanctum middleware to all API routes
Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    'auth:sanctum'
])->group(function () {
    // Favorites routes
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{mealId}', [FavoriteController::class, 'destroy']);
    
    // Meals route for viewing recipes
    Route::get('/meals/{mealId}', [MealController::class, 'show']);
});