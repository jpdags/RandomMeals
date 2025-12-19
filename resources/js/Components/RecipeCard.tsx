import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarRating from './StarRating';
import RecipeNotes from './RecipeNotes';
import { Heart, X, ExternalLink, ChefHat, BookOpen } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

interface PageProps extends InertiaPageProps {
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
      avatar?: string;
    } | null;
  };
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  strSource?: string;
  ingredientsWithMeasures: Array<{ ingredient: string; measure: string }>;
  // Populated by Laravel if authenticated
  isFavorite?: boolean;
  rating?: number;
  notes?: string;
}

interface RecipeCardProps {
  meal: Meal;
  onNextRecipe?: () => void;
  initialExpanded?: boolean;
}

export default function RecipeCard({
  meal,
  onNextRecipe,
  initialExpanded = false
}: RecipeCardProps) {
  const { auth } = usePage<PageProps>().props;
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [isFavorite, setIsFavorite] = useState(meal.isFavorite || false);
  const [rating, setRating] = useState<number | null>(meal.rating || null);
  const [notes, setNotes] = useState(meal.notes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset states when meal changes
  useEffect(() => {
    setIsExpanded(false);
    setIsFavorite(meal.isFavorite || false);
    setRating(meal.rating || null);
    setNotes(meal.notes || '');
    setError(null);
  }, [meal.idMeal]);

  const toggleFavorite = async () => {
    if (!auth?.user) {
      router.visit('/login');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (isFavorite) {
        await axios.delete(`/api/favorites/${meal.idMeal}`);
        setIsFavorite(false);
      } else {
        await axios.post('/api/favorites', { 
          meal_id: meal.idMeal,
          meal_data: meal 
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      setError('Failed to update favorite. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingChange = async (newRating: number) => {
    if (!auth?.user) {
      router.visit('/login');
      return;
    }

    setRating(newRating);
    try {
      await axios.post('/api/ratings', {
        meal_id: meal.idMeal,
        rating: newRating
      });
    } catch (error) {
      console.error('Failed to save rating:', error);
    }
  };

  const handleNotesSave = async (newNotes: string) => {
    if (!auth?.user) {
      router.visit('/login');
      return;
    }

    setNotes(newNotes);
    try {
      await axios.post('/api/notes', {
        meal_id: meal.idMeal,
        notes: newNotes
      });
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${meal.idMeal}-${isExpanded ? 'expanded' : 'collapsed'}`}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="recipe-card overflow-hidden"
          style={{ perspective: '2000px' }}
        >
          {!isExpanded ? (
            // Collapsed Card View
            <div className="book-cover">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="relative overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-64 md:h-72 object-cover shadow-vintage"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                </motion.div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 leading-tight">
                          {meal.strMeal}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {meal.strCategory && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/20 text-foreground rounded-full text-sm font-medium border border-accent/30">
                              <ChefHat className="w-3 h-3" />
                              {meal.strCategory}
                            </span>
                          )}
                          {meal.strArea && (
                            <span className="inline-block px-3 py-1 bg-secondary/20 text-foreground rounded-full text-sm font-medium border border-secondary/30">
                              {meal.strArea}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={toggleFavorite}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`heart-btn text-3xl ${isFavorite ? 'favorited' : ''}`}
                      >
                        <Heart 
                          className={`w-8 h-8 transition-colors ${
                            isFavorite 
                              ? 'fill-destructive text-destructive' 
                              : 'text-muted-foreground hover:text-destructive'
                          }`}
                        />
                      </motion.button>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-4 font-body leading-relaxed">
                      {meal.strInstructions?.substring(0, 200)}...
                    </p>
                  </div>
                  
                    <div className="flex flex-wrap gap-3">
                    <motion.button
                      onClick={() => setIsExpanded(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-vintage-gold flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      Open recipe
                    </motion.button>
                    <motion.button
                      onClick={onNextRecipe}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-vintage-secondary"
                    >
                      Next recipe
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Expanded Book View
            <div className="book relative">
              <div className="hidden md:block book-spine" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[560px]">
                {/* Left Page - Recipe Details */}
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="book-page book-page-left overflow-y-auto max-h-[640px]"
                >
                  <div className="flex justify-end mb-4">
                    <motion.button
                      onClick={() => setIsExpanded(false)}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                  
                  <div className="mb-6">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-48 md:h-56 object-cover rounded-xl shadow-vintage mb-4"
                    />
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                      {meal.strMeal}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {meal.strCategory && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/20 text-foreground rounded-full text-sm font-medium border border-accent/30">
                          {meal.strCategory}
                        </span>
                      )}
                      {meal.strArea && (
                        <span className="inline-block px-3 py-1 bg-secondary/20 text-foreground rounded-full text-sm font-medium border border-secondary/30">
                          {meal.strArea}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Ingredients */}
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary" />
                      Ingredients
                    </h3>
                    <ul className="space-y-1">
                      {meal.ingredientsWithMeasures?.map((item, index) => (
                        <li key={index} className="ingredient-item">
                          <span className="ingredient-bullet" />
                          <span className="text-foreground font-body">
                            {item.measure && `${item.measure} `}
                            <span className="font-medium">{item.ingredient}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Instructions */}
                  <div className="mb-6">
                    <h3 className="text-xl font-display font-bold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-8 h-0.5 bg-primary" />
                      Instructions
                    </h3>
                    <p className="text-foreground whitespace-pre-line leading-relaxed font-body">
                      {meal.strInstructions}
                    </p>
                  </div>
                  
                  {/* External Links */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {meal.strYoutube && (
                      <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Watch on YouTube
                      </a>
                    )}
                    {meal.strSource && (
                      <a
                        href={meal.strSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-semibold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Original Source
                      </a>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                    <motion.button
                      onClick={() => setIsExpanded(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-vintage-gold"
                    >
                      Back to Cover
                    </motion.button>
                    <motion.button
                      onClick={onNextRecipe}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-vintage-secondary"
                    >
                      Next Recipe
                    </motion.button>
                  </div>
                </motion.div>
                
                {/* Right Page - Ratings & Notes */}
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="book-page book-page-right border-t md:border-t-0 md:border-l border-border flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      Your review
                    </h3>
                    <motion.button
                      onClick={toggleFavorite}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isFavorite 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-muted text-muted-foreground hover:text-destructive'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      {isFavorite ? 'Favorited' : 'Add to favorites'}
                    </motion.button>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-display font-semibold text-foreground mb-4">
                      Rate this recipe
                    </h4>
                    <StarRating
                      rating={rating}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <RecipeNotes
                      notes={notes}
                      onSave={handleNotesSave}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
