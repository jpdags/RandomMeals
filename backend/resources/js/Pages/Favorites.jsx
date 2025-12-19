import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../Components/Layout';
import { motion } from 'framer-motion';
import axios from 'axios';
import RecipeCard from '../Components/RecipeCard';
import { Heart, BookOpen } from 'lucide-react';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeMeal, setActiveMeal] = useState(null);
    const [activeUserData, setActiveUserData] = useState(null);

    const loadFavorites = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get('/api/favorites');
            setFavorites(res.data.favorites || []);
        } catch (e) {
            setError('Failed to load favorites.');
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    const removeFavorite = async (mealId) => {
        try {
            await axios.delete(`/api/favorites/${mealId}`);
            setFavorites((prev) => prev.filter((f) => f.meal_id !== mealId));
        } catch (e) {
            console.error('Failed to remove favorite', e);
        }
    };

    const viewRecipe = async (mealId) => {
        try {
            const res = await axios.get(`/api/meals/${mealId}`);
            setActiveMeal(res.data.meal);
            setActiveUserData(res.data.userData || {});
        } catch (e) {
            console.error('Failed to load recipe', e);
        }
    };

    return (
        <Layout>
            <main className="relative z-10 py-8 md:py-12 flex-1">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                            <Heart className="w-10 h-10 text-destructive fill-destructive" />
                            Your Favorites
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                            Save your favorite recipes to build your personal cookbook collection.
                        </p>
                    </motion.div>

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto"
                        >
                            <div className="book-cover p-8 animate-pulse">
                                <div className="w-20 h-20 bg-muted-foreground/20 rounded mx-auto mb-4"></div>
                                <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
                                <div className="h-4 bg-muted-foreground/20 rounded mb-6"></div>
                                <div className="h-10 bg-muted-foreground/20 rounded"></div>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8"
                        >
                            <div className="bg-destructive/10 text-destructive px-6 py-4 rounded-xl inline-block border border-destructive/20">
                                <p className="font-medium">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {!loading && favorites.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-md mx-auto text-center"
                        >
                            <div className="book-cover p-8 mb-6">
                                <BookOpen className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                                    No Favorites Yet
                                </h3>
                                <p className="text-muted-foreground font-body mb-6">
                                    Explore recipes and tap the heart icon to save your favorites here.
                                </p>
                                <Link href="/">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="btn-vintage-gold"
                                    >
                                        Discover Recipes
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    )}

                    {!loading && favorites.length > 0 && (
                        <div className="recipe-grid">
                            {favorites.map((fav, index) => (
                                <motion.div
                                    key={fav.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="recipe-card p-6 cursor-pointer"
                                    onClick={() => viewRecipe(fav.meal_id)}
                                >
                                    <div className="flex flex-col gap-4 h-full">
                                        <img
                                            src={fav.meal_data?.strMealThumb}
                                            alt={fav.meal_data?.strMeal}
                                            className="w-full h-40 object-cover rounded-lg shadow-vintage"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-foreground font-semibold font-display mb-2 text-lg">
                                                {fav.meal_data?.strMeal || fav.meal_id}
                                            </h3>
                                            <div className="flex flex-col gap-2">
                                                {fav.meal_data?.strCategory && (
                                                    <p className="text-sm text-muted-foreground font-body">
                                                        <span className="font-semibold text-foreground">Cuisine:</span> {fav.meal_data?.strCategory}
                                                    </p>
                                                )}
                                                {fav.meal_data?.strArea && (
                                                    <p className="text-sm text-muted-foreground font-body">
                                                        <span className="font-semibold text-foreground">Region:</span> {fav.meal_data?.strArea}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-auto pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => viewRecipe(fav.meal_id)}
                                                className="btn-vintage text-xs px-3 py-2 flex-1"
                                            >
                                                View Recipe
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeFavorite(fav.meal_id);
                                                }}
                                                className="btn-vintage-secondary text-xs px-3 py-2"
                                            >
                                                Remove
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Recipe Modal */}
            {activeMeal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4 py-8 overflow-y-auto"
                >
                    <div className="max-w-5xl w-full book-backdrop my-auto">
                        <div className="flex justify-between items-center mb-4 px-4 pt-4 sm:px-6 sm:pt-6">
                            <h2 className="text-lg font-display font-bold text-foreground">Recipe Details</h2>
                            <motion.button
                                onClick={() => { setActiveMeal(null); setActiveUserData(null); }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-vintage text-sm px-3 py-2"
                            >
                                Back
                            </motion.button>
                        </div>
                        <RecipeCard
                            meal={activeMeal}
                            userData={activeUserData}
                            isAuthenticated={true}
                            initialExpanded={true}
                        />
                    </div>
                </motion.div>
            )}
        </Layout>
    );
}
