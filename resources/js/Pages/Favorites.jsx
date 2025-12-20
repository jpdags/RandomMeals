import { useState, useEffect } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../Components/Layout';
import RecipeCard from '../Components/RecipeCard';
import axios from 'axios';
import { Heart, BookOpen, Search, Sliders } from 'lucide-react';

export default function Favorites() {
    const { auth } = usePage().props;
    const [favorites, setFavorites] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [removingIds, setRemovingIds] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent'); // 'recent', 'old', 'most-hearts', 'least-hearts'

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/favorites');
            setFavorites(response.data.favorites || []);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch favorites:', err);
            setError('Failed to load your favorites');
        } finally {
            setLoading(false);
        }
    };

    // Filter and search logic
    const getFilteredAndSortedFavorites = () => {
        let filtered = [...favorites];

        // Apply search filter - only search by recipe name, case-insensitive
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(fav => {
                const mealName = (fav.meal_data?.strMeal || '').toLowerCase();
                return mealName.includes(query);
            });
        }

        // Apply sorting
        if (sortBy === 'most-hearts') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'least-hearts') {
            filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        } else if (sortBy === 'old') {
            filtered.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        } else if (sortBy === 'recent') {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        return filtered;
    };

    const handleRemoveFavorite = async (mealId) => {
        try {
            await axios.delete(`/api/favorites/${mealId}`);

            // Trigger breaking animation
            setRemovingIds((prev) => [...prev, mealId]);

            // After animation completes, remove from DOM/state
            setTimeout(() => {
                setFavorites((prev) => prev.filter((fav) => fav.meal_id !== mealId));
                setRemovingIds((prev) => prev.filter((id) => id !== mealId));

                if (selectedRecipe?.idMeal === mealId) {
                    setSelectedRecipe(null);
                }
            }, 650);
        } catch (err) {
            console.error('Failed to remove favorite:', err);
            setError('Failed to remove from favorites');
        }
    };

    const viewRecipe = async (mealId) => {
        try {
            const res = await axios.get(`/api/meals/${mealId}`);
            setSelectedRecipe(res.data.meal);
        } catch (e) {
            console.error('Failed to load recipe', e);
        }
    };

    return (
        <Layout>
            <Head title="My Cookbook - Favorites" />

            <main className="relative z-10 py-8 md:py-12 flex-1 min-h-screen bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 flex items-center justify-center gap-3">
                            <Heart className="w-10 h-10 text-destructive fill-destructive" />
                            My Personalized Cookbook
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
                        <>
                            {/* Search and Filter Controls */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 space-y-4"
                            >
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search by recipe name..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition"
                                    />
                                </div>

                                {/* Sort Dropdown */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        Sort By
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { value: 'recent', label: '📌 Recent' },
                                            { value: 'old', label: '📅 Old' },
                                            { value: 'most-hearts', label: '❤️ Most Hearts' },
                                            { value: 'least-hearts', label: '🤍 Least Hearts' },
                                        ].map(option => (
                                            <motion.button
                                                key={option.value}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSortBy(option.value)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                                    sortBy === option.value
                                                        ? 'bg-[#b87225] text-white'
                                                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                                }`}
                                            >
                                                {option.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Results Counter */}
                                {(searchQuery || sortBy !== 'recent') && (
                                    <div className="text-sm text-muted-foreground">
                                        Found {getFilteredAndSortedFavorites().length} of {favorites.length} recipes
                                    </div>
                                )}
                            </motion.div>

                            {/* Filtered Recipes Grid */}
                            {getFilteredAndSortedFavorites().length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="book-cover p-8 max-w-md mx-auto">
                                        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                                        <h3 className="text-lg font-display font-bold text-foreground mb-2">
                                            No Recipes Found
                                        </h3>
                                        <p className="text-muted-foreground font-body mb-4">
                                            Try adjusting your search or filters
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSortBy('recent');
                                            }}
                                            className="btn-vintage-gold text-sm"
                                        >
                                            Clear Filters
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="recipe-grid">
                                    {getFilteredAndSortedFavorites().map((fav, index) => (
                                        <motion.div
                                            key={fav.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.02 }}
                                            className={`recipe-card p-6 cursor-pointer favorite-card ${removingIds.includes(fav.meal_id) ? 'favorite-removing' : ''}`}
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
                                                    
                                                    {/* Show Rating Badge */}
                                                    {fav.rating && (
                                                        <div className="mb-2 flex items-center gap-1">
                                                            <span className="text-yellow-500">★</span>
                                                            <span className="font-semibold text-foreground">{fav.rating}/5</span>
                                                        </div>
                                                    )}

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
                                                            handleRemoveFavorite(fav.meal_id);
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
                        </>
                    )}
                </div>
            </main>

            {/* Recipe Modal */}
            {selectedRecipe && (
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
                                onClick={() => setSelectedRecipe(null)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-vintage text-sm px-3 py-2"
                            >
                                Back
                            </motion.button>
                        </div>
                        <RecipeCard
                            meal={selectedRecipe}
                            initialExpanded={true}
                        />
                    </div>
                </motion.div>
            )}
        </Layout>
    );
}
