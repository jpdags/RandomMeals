import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import StarRating from './StarRating';
import RecipeNotes from './RecipeNotes';

export default function RecipeCard({ meal, userData, onUpdate, isAuthenticated }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(userData?.isFavorite || false);
    const [rating, setRating] = useState(userData?.rating || null);
    const [notes, setNotes] = useState(userData?.notes || '');
    const [loading, setLoading] = useState(false);

    const toggleFavorite = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            if (isFavorite) {
                await axios.delete(`/api/favorites/${meal.idMeal}`);
                setIsFavorite(false);
            } else {
                await axios.post('/api/favorites', {
                    meal_id: meal.idMeal,
                    meal_data: meal,
                });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRatingChange = async (newRating) => {
        if (!isAuthenticated) return;

        const confirmed = rating 
            ? window.confirm('Are you sure you want to update your rating?')
            : true;

        if (!confirmed) return;

        setLoading(true);
        try {
            await axios.post('/api/ratings', {
                meal_id: meal.idMeal,
                rating: newRating,
            });
            setRating(newRating);
        } catch (error) {
            console.error('Error saving rating:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNotesSave = async (newNotes) => {
        if (!isAuthenticated) return;

        setLoading(true);
        try {
            await axios.post('/api/notes', {
                meal_id: meal.idMeal,
                notes: newNotes,
            });
            setNotes(newNotes);
        } catch (error) {
            console.error('Error saving notes:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                layout
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            >
                {!isExpanded ? (
                    // Collapsed view
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-shrink-0">
                                <motion.img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-full md:w-80 h-64 object-cover rounded-xl shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                                            {meal.strMeal}
                                        </h2>
                                        <span className="inline-block px-3 py-1 bg-red-600/30 text-red-200 rounded-full text-sm font-semibold backdrop-blur-sm">
                                            {meal.strCategory}
                                        </span>
                                    </div>
                                    {isAuthenticated && (
                                        <button
                                            onClick={toggleFavorite}
                                            disabled={loading}
                                            className={`text-3xl transition-transform hover:scale-110 ${
                                                isFavorite ? 'text-red-600' : 'text-gray-300'
                                            }`}
                                        >
                                            {isFavorite ? '❤️' : '🤍'}
                                        </button>
                                    )}
                                </div>

                                <p className="text-white/80 mb-6 line-clamp-4">
                                    {meal.strInstructions?.substring(0, 200)}...
                                </p>

                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all font-semibold shadow-lg hover:shadow-red-500/50"
                                >
                                    View Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Expanded view - Flipbook style
                    <div className="flex flex-col md:flex-row h-auto md:h-[600px]">
                        {/* Left side - Rating */}
                        {isAuthenticated && (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="w-full md:w-1/2 bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-md p-8 border-r border-white/20 flex flex-col"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-white">Your Rating</h3>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-2xl hover:scale-110 transition-transform text-white"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <StarRating
                                    rating={rating}
                                    onRatingChange={handleRatingChange}
                                    disabled={loading}
                                />
                            </motion.div>
                        )}

                        {/* Right side - Recipe Details & Notes */}
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className={`w-full ${isAuthenticated ? 'md:w-1/2' : 'md:w-full'} p-8 overflow-y-auto bg-white/5`}
                        >
                            {!isAuthenticated && (
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-2xl hover:scale-110 transition-transform text-white"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            <div className="mb-6">
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-full h-64 object-cover rounded-xl shadow-lg mb-4"
                                />
                                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                                    {meal.strMeal}
                                </h2>
                                <span className="inline-block px-3 py-1 bg-red-600/30 text-red-200 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                                    {meal.strCategory}
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-3">Ingredients</h3>
                                <ul className="space-y-2">
                                    {meal.ingredientsWithMeasures?.map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="text-red-400">•</span>
                                            <span className="text-white/90">
                                                {item.measure && `${item.measure} `}
                                                {item.ingredient}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-white mb-3">Instructions</h3>
                                <p className="text-white/90 whitespace-pre-line leading-relaxed">
                                    {meal.strInstructions}
                                </p>
                            </div>

                            {meal.strYoutube && (
                                <div className="mb-6">
                                    <a
                                        href={meal.strYoutube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-400 hover:text-red-300 font-semibold underline transition-colors"
                                    >
                                        Watch on YouTube →
                                    </a>
                                </div>
                            )}

                            {isAuthenticated && (
                                <RecipeNotes
                                    notes={notes}
                                    onSave={handleNotesSave}
                                    disabled={loading}
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

