<?php

namespace App\Http\Controllers;

use App\Models\RecipeRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeRatingController extends Controller
{
    /**
     * Store or update a rating
     */
    public function store(Request $request)
    {
        $request->validate([
            'meal_id' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $rating = RecipeRating::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'meal_id' => $request->meal_id,
            ],
            [
                'rating' => $request->rating,
            ]
        );

        return response()->json(['message' => 'Rating saved', 'rating' => $rating]);
    }

    /**
     * Update a rating
     */
    public function update(Request $request, string $mealId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $rating = RecipeRating::where('user_id', Auth::id())
            ->where('meal_id', $mealId)
            ->first();

        if ($rating) {
            $rating->update(['rating' => $request->rating]);
            return response()->json(['message' => 'Rating updated', 'rating' => $rating]);
        }

        return response()->json(['message' => 'Rating not found'], 404);
    }

    /**
     * Delete a rating
     */
    public function destroy(string $mealId)
    {
        $rating = RecipeRating::where('user_id', Auth::id())
            ->where('meal_id', $mealId)
            ->first();

        if ($rating) {
            $rating->delete();
            return response()->json(['message' => 'Rating deleted']);
        }

        return response()->json(['message' => 'Rating not found'], 404);
    }
}
