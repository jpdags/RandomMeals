<?php

namespace App\Http\Controllers;

use App\Models\RecipeNote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeNoteController extends Controller
{
    /**
     * Store or update notes
     */
    public function store(Request $request)
    {
        $request->validate([
            'meal_id' => 'required|string',
            'notes' => 'required|string',
        ]);

        $note = RecipeNote::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'meal_id' => $request->meal_id,
            ],
            [
                'notes' => $request->notes,
            ]
        );

        return response()->json(['message' => 'Notes saved', 'note' => $note]);
    }

    /**
     * Update notes
     */
    public function update(Request $request, string $mealId)
    {
        $request->validate([
            'notes' => 'required|string',
        ]);

        $note = RecipeNote::where('user_id', Auth::id())
            ->where('meal_id', $mealId)
            ->first();

        if ($note) {
            $note->update(['notes' => $request->notes]);
            return response()->json(['message' => 'Notes updated', 'note' => $note]);
        }

        return response()->json(['message' => 'Note not found'], 404);
    }

    /**
     * Delete notes
     */
    public function destroy(string $mealId)
    {
        $note = RecipeNote::where('user_id', Auth::id())
            ->where('meal_id', $mealId)
            ->first();

        if ($note) {
            $note->delete();
            return response()->json(['message' => 'Notes deleted']);
        }

        return response()->json(['message' => 'Note not found'], 404);
    }
}
