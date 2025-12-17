import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import StarRating from './StarRating';
import RecipeNotes from './RecipeNotes';

export default function RecipeCard({ meal, userData, isAuthenticated }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [rating, setRating] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    /* ✅ Sync state when NEW MEAL loads */
    useEffect(() => {
        setIsExpanded(false);
        setIsFavorite(userData?.isFavorite || false);
        setRating(userData?.rating || null);
        setNotes(userData?.notes || '');
    }, [meal?.idMeal, userData]);

    /* ================= PDF ================= */
    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(meal.strMeal, 14, 20);

        doc.setFontSize(12);
        doc.text(`Category: ${meal.strCategory}`, 14, 30);

        let y = 40;
        doc.text('Ingredients:', 14, y);
        y += 8;

        meal.ingredientsWithMeasures?.forEach(item => {
            doc.text(`• ${item.measure || ''} ${item.ingredient}`, 14, y);
            y += 6;
        });

        y += 8;
        doc.text('Instructions:', 14, y);
        y += 8;

        meal.strInstructions
            .split('. ')
            .filter(Boolean)
            .forEach((step, i) => {
                doc.text(`Step ${i + 1}: ${step}`, 14, y);
                y += 6;
            });

        doc.save(`${meal.strMeal}.pdf`);
        toast.success('Recipe downloaded as PDF 📄');
    };

    /* ================= FAVORITE ================= */
    const toggleFavorite = async () => {
        if (!isAuthenticated) {
            toast.error('Please log in to use favorites');
            return;
        }

        if (loading) return;

        setLoading(true);
        try {
            if (isFavorite) {
                await axios.delete(`/api/favorites/${meal.idMeal}`);
                setIsFavorite(false);
                toast.success('Removed from favorites 💔');
            } else {
                await axios.post('/api/favorites', {
                    meal_id: meal.idMeal,
                    meal_data: meal,
                });
                setIsFavorite(true);
                toast.success('Added to favorites ❤️');
            }
        } catch (e) {
            console.error(e);
            toast.error('Failed to update favorite');
        } finally {
            setLoading(false);
        }
    };

    /* ================= RATING ================= */
    const handleRatingChange = async (newRating) => {
        if (!isAuthenticated) {
            toast.error('Please log in to rate recipes');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/api/ratings', {
                meal_id: meal.idMeal,
                rating: newRating,
            });
            setRating(newRating);
            toast.success('Rating saved ⭐');
        } catch {
            toast.error('Failed to save rating');
        } finally {
            setLoading(false);
        }
    };

    /* ================= NOTES ================= */
    const handleNotesSave = async (newNotes) => {
        if (!isAuthenticated) {
            toast.error('Please log in to save notes');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/api/notes', {
                meal_id: meal.idMeal,
                notes: newNotes,
            });
            setNotes(newNotes);
            toast.success('Notes saved 📝');
        } catch {
            toast.error('Failed to save notes');
        } finally {
            setLoading(false);
        }
    };

    /* ================= VIEW / CLOSE RECIPE ================= */
    const handleViewRecipe = () => {
        setIsExpanded(prev => {
            const next = !prev;
            toast.success(next ? 'Recipe opened 📖' : 'Recipe closed 📘');
            return next;
        });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden">

                {/* TOP CARD */}
                <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <img
                            src={meal.strMealThumb}
                            alt={meal.strMeal}
                            className="w-full md:w-80 h-64 object-cover rounded-xl shadow-lg"
                        />

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-full">
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {meal.strMeal}
                                    </h2>
                                    <span className="px-3 py-1 bg-red-600/30 text-red-200 rounded-full text-sm">
                                        {meal.strCategory}
                                    </span>
                                </div>

                                {isAuthenticated && (
                                    <button
                                        onClick={toggleFavorite}
                                        disabled={loading}
                                        className={`text-3xl ml-4 -mt-3 transition ${
                                            isFavorite ? 'text-red-500' : 'text-gray-300'
                                        }`}
                                    >
                                        {isFavorite ? '❤️' : '🤍'}
                                    </button>
                                )}
                            </div>

                            <button
                                onClick={handleViewRecipe}
                                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-red-500/50"
                            >
                                {isExpanded ? 'Close Recipe' : 'View Recipe'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* EXPAND DOWN */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden px-8 pb-8"
                        >
                            <div className="grid md:grid-cols-2 gap-10 mt-6 text-left">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Ingredients
                                    </h3>
                                    <ul className="space-y-2 text-white/90">
                                        {meal.ingredientsWithMeasures?.map((item, i) => (
                                            <li key={i}>
                                                • {item.measure} {item.ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Instructions
                                    </h3>
                                    <div className="space-y-2 text-white/90">
                                        {meal.strInstructions
                                            .split('. ')
                                            .filter(Boolean)
                                            .map((step, i) => (
                                                <p key={i}>
                                                    <strong>Step {i + 1}:</strong> {step}
                                                </p>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={downloadPDF}
                                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-red-500/50"
                                >
                                    Download Recipe as PDF
                                </button>
                            </div>

                            {isAuthenticated && (
                                <>
                                    <div className="mt-8">
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            Your Rating
                                        </h3>
                                        <StarRating
                                            rating={rating}
                                            onRatingChange={handleRatingChange}
                                            disabled={loading}
                                        />
                                    </div>

                                    <RecipeNotes
                                        notes={notes}
                                        onSave={handleNotesSave}
                                        disabled={loading}
                                    />
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
