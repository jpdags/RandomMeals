import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import RecipeCard from '../Components/RecipeCard';
<<<<<<< Updated upstream
import { motion } from 'framer-motion';
import axios from 'axios';
=======
import RecipeButton from '../Components/RecipeButton';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Loader2, RefreshCw } from 'lucide-react';
>>>>>>> Stashed changes

export default function Home() {
    const { auth } = usePage().props;
    const [meal, setMeal] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRandomMeal = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/meals/random');
            setMeal(response.data.meal);
            setUserData(response.data.userData);
        } catch (err) {
            setError('Failed to fetch meal. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
<<<<<<< Updated upstream
            <div className="text-center py-12 relative z-40">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-red-600 drop-shadow-2xl relative z-50"
                    style={{ 
                        WebkitTextFillColor: 'transparent',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        textShadow: '0 0 30px rgba(239, 68, 68, 0.3)'
                    }}
                >
                    Discover Random Meals
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-white mb-12 font-light drop-shadow-lg relative z-50"
                >
                    Explore delicious recipes from around the world
                </motion.p>

                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="flex justify-center"
                >
                    <button
                        onClick={fetchRandomMeal}
                        disabled={loading}
                        className="group relative px-12 py-6 text-white text-xl font-bold rounded-2xl overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 active:scale-95 transition-all duration-200 shadow-2xl hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed relative z-50"
                    >
                        <span className="relative z-10 font-extrabold tracking-wide">{loading ? 'Loading...' : 'RANDOM MEALS'}</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                        />
                    </button>
                </motion.div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/50 text-red-200 rounded-lg shadow-lg"
                    >
                        {error}
                    </motion.div>
                )}

                {meal && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12"
                    >
                        <RecipeCard
                            meal={meal}
                            userData={userData}
                            onUpdate={fetchRandomMeal}
                            isAuthenticated={!!auth?.user}
                        />
                    </motion.div>
                )}

                {!auth?.user && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl relative z-50"
                    >
                        <p className="text-white mb-4 text-lg font-medium">
                            Want to save favorites, add ratings, and take notes?{' '}
                            <Link href="/register" className="text-red-400 hover:text-red-300 underline font-bold">
                                Sign up for free
                            </Link>
                        </p>
                    </motion.div>
                )}
            </div>
        </Layout>
    );
}

=======
            <main className="relative z-10 py-8 md:py-12 flex-1">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10 md:mb-14"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 leading-tight">
                            Discover Your Next
                            <span className="block text-gradient">Delicious Meal</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-body leading-relaxed">
                            Press the button below to discover a random recipe from around the world. 
                            Save your favorites and build your personal cookbook!
                        </p>
                    </motion.div>

                    {/* Recipe Button - Show when no meal */}
                    {!meal && !loading && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex justify-center mb-12"
                        >
                            <RecipeButton onClick={fetchRandomMeal} disabled={loading} />
                        </motion.div>
                    )}

                    {/* Loading State */}
                    <AnimatePresence>
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <div className="relative">
                                    <Loader2 className="w-16 h-16 text-primary animate-spin" />
                                    <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 animate-ping" />
                                </div>
                                <p className="mt-6 text-muted-foreground font-display text-xl">
                                    Finding a delicious recipe...
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Error State */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center py-8"
                            >
                                <div className="bg-destructive/10 text-destructive px-6 py-4 rounded-xl inline-block mb-4 border border-destructive/20">
                                    <p className="font-medium">{error}</p>
                                </div>
                                <br />
                                <motion.button
                                    onClick={fetchRandomMeal}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn-vintage inline-flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Try again
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Recipe Card */}
                    <AnimatePresence>
                        {meal && !loading && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                            >
                                <RecipeCard
                                    meal={meal}
                                    userData={userData}
                                    onNextRecipe={fetchRandomMeal}
                                    isAuthenticated={!!auth?.user}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer CTA when recipe is shown */}
                    {meal && !loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center mt-10"
                        >
                            <p className="text-muted-foreground text-sm font-body">
                                Not what you're looking for? Click "Next Recipe" to discover more.
                            </p>
                        </motion.div>
                    )}

                </div>
            </main>
        </Layout>
    );
}
>>>>>>> Stashed changes
