<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MealDBService
{
    private const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

    /**
     * Fetch a random meal from TheMealDB API
     */
    public function getRandomMeal(): ?array
    {
        try {
            $response = Http::get(self::BASE_URL . '/random.php');
            
            if ($response->successful()) {
                $data = $response->json();
                
                if (isset($data['meals']) && !empty($data['meals'])) {
                    return $this->formatMeal($data['meals'][0]);
                }
            }
            
            return null;
        } catch (\Exception $e) {
            Log::error('TheMealDB API Error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Get meal by ID
     */
    public function getMealById(string $mealId): ?array
    {
        $cacheKey = 'meal_' . $mealId;
        
        return Cache::remember($cacheKey, 86400, function () use ($mealId) {
            try {
                $response = Http::get(self::BASE_URL . '/lookup.php', [
                    'i' => $mealId,
                ]);
                
                if ($response->successful()) {
                    $data = $response->json();
                    
                    if (isset($data['meals']) && !empty($data['meals'])) {
                        return $this->formatMeal($data['meals'][0]);
                    }
                }
                
                return null;
            } catch (\Exception $e) {
                Log::error('TheMealDB API Error: ' . $e->getMessage());
                return null;
            }
        });
    }

    /**
     * Format meal data from API response
     */
    private function formatMeal(array $meal): array
    {
        $ingredients = [];
        $measures = [];
        
        // Extract ingredients and measures
        for ($i = 1; $i <= 20; $i++) {
            $ingredientKey = "strIngredient{$i}";
            $measureKey = "strMeasure{$i}";
            
            if (!empty($meal[$ingredientKey])) {
                $ingredients[] = $meal[$ingredientKey];
                $measures[] = $meal[$measureKey] ?? '';
            }
        }
        
        return [
            'idMeal' => $meal['idMeal'] ?? null,
            'strMeal' => $meal['strMeal'] ?? '',
            'strCategory' => $meal['strCategory'] ?? '',
            'strArea' => $meal['strArea'] ?? '',
            'strInstructions' => $meal['strInstructions'] ?? '',
            'strMealThumb' => $meal['strMealThumb'] ?? '',
            'strTags' => $meal['strTags'] ?? null,
            'strYoutube' => $meal['strYoutube'] ?? null,
            'ingredients' => $ingredients,
            'measures' => $measures,
            'ingredientsWithMeasures' => array_map(function ($ingredient, $measure) {
                return [
                    'ingredient' => $ingredient,
                    'measure' => trim($measure),
                ];
            }, $ingredients, $measures),
        ];
    }
}

