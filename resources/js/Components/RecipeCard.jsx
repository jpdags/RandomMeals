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

    // Create paper texture data URL (fixed version)
    const paperTexture = "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E";

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                layout
                className="relative bg-amber-50/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden vintage-card"
            >
                {/* Vintage wear and tear effects */}
                <div className="absolute inset-0 border border-amber-200/30 rounded-2xl pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent"></div>
                
                {/* Random stains and marks */}
                <div className="absolute top-6 left-8 w-4 h-4 rounded-full bg-amber-300/10"></div>
                <div className="absolute bottom-6 right-10 w-6 h-3 bg-amber-400/5 rotate-45"></div>
                <div className="absolute top-1/4 left-4 w-10 h-1 bg-amber-300/5 rotate-12"></div>
                
                {/* Card corners wear */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-amber-50/80 rounded-full blur-sm"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-50/80 rounded-full blur-sm"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-amber-50/80 rounded-full blur-sm"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-50/80 rounded-full blur-sm"></div>

                {!isExpanded ? (
                    // Collapsed vintage card view
                    <div className="p-8 relative z-10">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-shrink-0 relative">
                                {/* Vintage photo frame effect */}
                                <div className="absolute -inset-2 bg-gradient-to-br from-amber-800/10 to-amber-600/5 rounded-lg blur-sm"></div>
                                <div className="absolute inset-0 border-2 border-amber-300/30 rounded-xl"></div>
                                <motion.img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="relative w-full md:w-80 h-64 object-cover rounded-lg shadow-lg vintage-image"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Photo corner effects */}
                                <div className="absolute -top-2 -left-2 w-6 h-6 bg-amber-50/80 rounded-sm rotate-45"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-50/80 rounded-sm rotate-45"></div>
                                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-amber-50/80 rounded-sm rotate-45"></div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-amber-50/80 rounded-sm rotate-45"></div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h2 className="text-3xl font-bold text-amber-900 mb-2 font-serif tracking-tight vintage-title">
                                            {meal.strMeal}
                                        </h2>
                                        <span className="inline-block px-4 py-1.5 bg-amber-800/20 text-amber-900 rounded-full text-sm font-semibold border border-amber-700/20 vintage-tag">
                                            {meal.strCategory}
                                        </span>
                                    </div>
                                    {isAuthenticated && (
                                        <button
                                            onClick={toggleFavorite}
                                            disabled={loading}
                                            className={`text-3xl transition-all hover:scale-110 vintage-favorite ${
                                                isFavorite 
                                                    ? 'text-red-700 filter drop-shadow-[0_2px_2px_rgba(185,28,28,0.3)]' 
                                                    : 'text-amber-900/40 hover:text-amber-900/60'
                                            }`}
                                            style={{ textShadow: isFavorite ? '0 2px 4px rgba(185,28,28,0.4)' : 'none' }}
                                        >
                                            {isFavorite ? '♥' : '♡'}
                                        </button>
                                    )}
                                </div>

                                <p className="text-amber-900/80 mb-6 line-clamp-4 font-serif leading-relaxed tracking-wide vintage-text">
                                    {meal.strInstructions?.substring(0, 200)}...
                                </p>

                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="relative px-8 py-3 bg-gradient-to-br from-amber-700 to-amber-900 text-amber-50 rounded-lg hover:from-amber-800 hover:to-amber-950 transition-all font-semibold shadow-lg hover:shadow-amber-800/50 vintage-button group overflow-hidden"
                                >
                                    <span className="relative z-10">View Recipe</span>
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 via-amber-600/10 to-amber-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Expanded vintage card view - Old recipe book style
                    <div className="flex flex-col md:flex-row h-auto md:h-[600px]">
                        {/* Left side - Rating (Old book margin) */}
                        {isAuthenticated && (
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="w-full md:w-1/2 bg-gradient-to-br from-amber-900/10 to-amber-800/5 backdrop-blur-sm p-8 border-r border-amber-700/20 flex flex-col relative"
                            >
                                {/* Margin lines like old paper */}
                                <div className="absolute top-0 left-4 bottom-0 w-px bg-amber-700/10"></div>
                                <div className="absolute top-0 left-8 bottom-0 w-px bg-amber-700/10"></div>
                                
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-amber-900 font-serif">Your Rating</h3>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-2xl hover:scale-110 transition-transform text-amber-900/70 hover:text-amber-900"
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
                            className={`w-full ${isAuthenticated ? 'md:w-1/2' : 'md:w-full'} p-8 overflow-y-auto bg-amber-50/95 relative`}
                        >
                            {!isAuthenticated && (
                                <div className="flex justify-end mb-4">
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-2xl hover:scale-110 transition-transform text-amber-900/70 hover:text-amber-900"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            {/* Paper texture overlay */}
                            <div 
                                className="absolute inset-0 pointer-events-none opacity-10"
                                style={{ 
                                    backgroundImage: `url("${paperTexture}")`,
                                    backgroundSize: '100px 100px'
                                }}
                            ></div>

                            <div className="mb-6 relative">
                                <div className="absolute -inset-2 bg-gradient-to-br from-amber-800/5 to-transparent rounded-xl blur-sm"></div>
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="relative w-full h-64 object-cover rounded-lg shadow-lg border border-amber-300/30 vintage-image"
                                />
                                <h2 className="text-3xl font-bold text-amber-900 mt-4 mb-2 font-serif tracking-tight vintage-title">
                                    {meal.strMeal}
                                </h2>
                                <span className="inline-block px-4 py-1.5 bg-amber-800/20 text-amber-900 rounded-full text-sm font-semibold border border-amber-700/20 vintage-tag">
                                    {meal.strCategory}
                                </span>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif border-b border-amber-700/20 pb-2">Ingredients</h3>
                                <ul className="space-y-2">
                                    {meal.ingredientsWithMeasures?.map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <span className="text-amber-700">↠</span>
                                            <span className="text-amber-900/90 font-serif">
                                                {item.measure && `${item.measure} `}
                                                {item.ingredient}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif border-b border-amber-700/20 pb-2">Instructions</h3>
                                <p className="text-amber-900/90 font-serif leading-relaxed tracking-wide vintage-text">
                                    {meal.strInstructions}
                                </p>
                            </div>

                            {meal.strYoutube && (
                                <div className="mb-6">
                                    <a
                                        href={meal.strYoutube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold font-serif transition-colors vintage-link"
                                    >
                                        <span>Watch on YouTube</span>
                                        <span className="text-lg">↗</span>
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

            <style jsx>{`
                .vintage-card {
                    box-shadow: 
                        0 10px 30px rgba(120, 53, 15, 0.2),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        0 0 20px rgba(120, 53, 15, 0.1);
                    position: relative;
                    overflow: visible !important;
                }

                .vintage-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        45deg,
                        transparent 0%,
                        rgba(251, 191, 36, 0.03) 50%,
                        transparent 100%
                    );
                    pointer-events: none;
                    z-index: 1;
                }

                .vintage-image {
                    filter: sepia(0.3) contrast(1.1) brightness(1.05);
                    transition: filter 0.3s ease;
                }

                .vintage-image:hover {
                    filter: sepia(0.2) contrast(1.2) brightness(1.1);
                }

                .vintage-title {
                    text-shadow: 1px 1px 0px rgba(251, 191, 36, 0.3);
                    position: relative;
                    display: inline-block;
                }

                .vintage-title::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(to right, transparent, rgba(146, 64, 14, 0.3), transparent);
                }

                .vintage-text {
                    letter-spacing: 0.01em;
                }

                .vintage-tag {
                    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    position: relative;
                    overflow: hidden;
                }

                .vintage-tag::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(
                        135deg,
                        rgba(255, 255, 255, 0.1) 0%,
                        rgba(255, 255, 255, 0) 50%,
                        rgba(255, 255, 255, 0.1) 100%
                    );
                }

                .vintage-button {
                    box-shadow: 
                        0 4px 6px rgba(120, 53, 15, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    position: relative;
                    overflow: hidden;
                }

                .vintage-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    transition: left 0.6s ease;
                }

                .vintage-button:hover::before {
                    left: 100%;
                }

                .vintage-favorite {
                    transition: all 0.3s ease;
                    position: relative;
                }

                .vintage-favorite:hover {
                    transform: scale(1.2) rotate(5deg);
                }

                .vintage-link {
                    position: relative;
                    padding-bottom: 2px;
                }

                .vintage-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: linear-gradient(to right, #92400e, #d97706);
                    transition: width 0.3s ease;
                }

                .vintage-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </div>
    );
}
