import { useState, useCallback } from 'react';
import type { Meal } from '@/components/RecipeCard';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';

interface MealDBResponse {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube?: string;
    strSource?: string;
    [key: string]: string | undefined;
  }>;
}

function extractIngredients(meal: MealDBResponse['meals'][0]): Array<{ ingredient: string; measure: string }> {
  const ingredients: Array<{ ingredient: string; measure: string }> = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || ''
      });
    }
  }
  
  return ingredients;
}

export function useRandomMeal() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomMeal = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      
      const data: MealDBResponse = await response.json();
      
      if (!data.meals || data.meals.length === 0) {
        throw new Error('No recipe found');
      }
      
      const rawMeal = data.meals[0];
      
      const transformedMeal: Meal = {
        idMeal: rawMeal.idMeal,
        strMeal: rawMeal.strMeal,
        strCategory: rawMeal.strCategory,
        strArea: rawMeal.strArea,
        strInstructions: rawMeal.strInstructions,
        strMealThumb: rawMeal.strMealThumb,
        strYoutube: rawMeal.strYoutube,
        strSource: rawMeal.strSource,
        ingredientsWithMeasures: extractIngredients(rawMeal)
      };
      
      setMeal(transformedMeal);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    meal,
    loading,
    error,
    fetchRandomMeal
  };
}
