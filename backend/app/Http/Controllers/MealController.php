<?php

namespace App\Http\Controllers;

use App\Services\MealDBService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MealController extends Controller
{
    protected MealDBService $mealDBService;

    public function __construct(MealDBService $mealDBService)
    {
        $this->mealDBService = $mealDBService;
    }

    /**
     * Show landing page
     */
    public function index(): Response
    {
        return Inertia::render('Home');
    }

    /**
     * Get a random meal
     */
    public function getRandomMeal(Request $request)
    {
        $meal = $this->mealDBService->getRandomMeal();

        if (!$meal) {
            return response()->json(['error' => 'Failed to fetch meal'], 500);
        }

        // If user is authenticated, get their related data
        $userData = null;
        if (auth()->check()) {
            $user = auth()->user();
            $userData = [
                'isFavorite' => $user->favorites()->where('meal_id', $meal['idMeal'])->exists(),
                'rating' => $user->ratings()->where('meal_id', $meal['idMeal'])->first()?->rating,
                'notes' => $user->notes()->where('meal_id', $meal['idMeal'])->first()?->notes,
            ];
        }

        return response()->json([
            'meal' => $meal,
            'userData' => $userData,
        ]);
    }

    /**
     * Get meal by ID
     */
    public function getMeal(string $mealId)
    {
        $meal = $this->mealDBService->getMealById($mealId);

        if (!$meal) {
            return response()->json(['error' => 'Meal not found'], 404);
        }

        // If user is authenticated, get their related data
        $userData = null;
        if (auth()->check()) {
            $user = auth()->user();
            $userData = [
                'isFavorite' => $user->favorites()->where('meal_id', $mealId)->exists(),
                'rating' => $user->ratings()->where('meal_id', $mealId)->first()?->rating,
                'notes' => $user->notes()->where('meal_id', $mealId)->first()?->notes,
            ];
        }

        return response()->json([
            'meal' => $meal,
            'userData' => $userData,
        ]);
    }
}
