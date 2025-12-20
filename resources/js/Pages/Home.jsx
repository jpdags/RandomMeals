import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import RecipeCard from '../Components/RecipeCard';
import ThreeButton from '../Components/ThreeButton';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Loader2, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';

export default function Home() {
    const { auth } = usePage().props;
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasPressed, setHasPressed] = useState(false);

    const fetchRandomMeal = async () => {
        if (!hasStarted) {
            setHasStarted(true);
        }
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/meals/random');
            setMeal(response.data.meal);
            setUserData(response.data.userData);
            setHasPressed(true);
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

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                    <ThreeButton onClick={fetchRandomMeal} disabled={loading} showLabel={!hasPressed} />
                </motion.div>

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
