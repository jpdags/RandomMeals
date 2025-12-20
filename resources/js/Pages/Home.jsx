import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import RecipeCard from '../Components/RecipeCard';
import RecipeButton from '../Components/RecipeButton';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Loader2, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
    const { auth } = usePage().props;
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasStarted, setHasStarted] = useState(false);

    const fetchRandomMeal = async () => {
        if (!hasStarted) {
            setHasStarted(true);
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/meals/random');
            setMeal(response.data.meal);
        } catch (err) {
            setError('Failed to fetch meal. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <main className="relative z-10 py-8 md:py-12 flex-1 min-h-screen bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4]">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Hero Section (hidden after first discover click this session) */}
                    {!hasStarted && (
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
                    )}

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
                                    onNextRecipe={fetchRandomMeal}
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
