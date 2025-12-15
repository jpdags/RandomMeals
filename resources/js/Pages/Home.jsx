import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import RecipeCard from '../Components/RecipeCard';
import ThreeButton from '../Components/ThreeButton';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Home() {
    const { auth } = usePage().props;
    const [meal, setMeal] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasPressed, setHasPressed] = useState(false);

    const fetchRandomMeal = async () => {
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

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                    <ThreeButton onClick={fetchRandomMeal} disabled={loading} showLabel={!hasPressed} />
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

