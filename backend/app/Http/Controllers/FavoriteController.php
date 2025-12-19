<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    /**
     * Add a meal to favorites
     */
    public function store(Request $request)
    {
        $request->validate([
            'meal_id' => 'required|string',
            'meal_data' => 'nullable|array',
        ]);

        $favorite = Favorite::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'meal_id' => $request->meal_id,
            ],
            [
                'meal_data' => $request->meal_data,
            ]
        );

        return response()->json(['message' => 'Added to favorites', 'favorite' => $favorite]);
    }

    /**
     * Remove a meal from favorites
     */
    public function destroy(string $mealId)
    {
        $favorite = Favorite::where('user_id', Auth::id())
            ->where('meal_id', $mealId)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Removed from favorites']);
        }

        return response()->json(['message' => 'Favorite not found'], 404);
    }

    /**
     * Get user's favorites
     */
    public function index()
    {
        $favorites = Favorite::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['favorites' => $favorites]);
    }
}
