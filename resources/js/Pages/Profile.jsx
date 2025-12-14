import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Profile() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            const meal = res.data.meal;
            window.alert(`Recipe: ${meal.strMeal}\nCategory: ${meal.strCategory}`);
        } catch (e) {
            console.error('Failed to load recipe', e);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-6"
                >
                    Your Profile
                </motion.h1>

                {loading && (
                    <p className="text-white/80">Loading favorites...</p>
                )}
                {error && (
                    <p className="text-red-400">{error}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((fav) => (
                        <motion.div
                            key={fav.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={fav.meal_data?.strMealThumb}
                                    alt={fav.meal_data?.strMeal}
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold">
                                        {fav.meal_data?.strMeal || fav.meal_id}
                                    </h3>
                                    <p className="text-white/70 text-sm">
                                        {fav.meal_data?.strCategory}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => viewRecipe(fav.meal_id)}
                                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                                >
                                    View Recipe
                                </button>
                                <button
                                    onClick={() => removeFavorite(fav.meal_id)}
                                    className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 text-sm border border-white/20"
                                >
                                    Remove
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
