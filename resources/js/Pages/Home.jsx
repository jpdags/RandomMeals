import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';
import RecipeCard from '../Components/RecipeCard';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Home() {
    const { auth } = usePage().props;

    const [meal, setMeal] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasLoadedMeal, setHasLoadedMeal] = useState(false);

    const fetchRandomMeal = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axios.get('/api/meals/random');
            setMeal(response.data.meal);
            setUserData(response.data.userData);
            setHasLoadedMeal(true);
            toast.success('New meal served 🥘');
        } catch (err) {
            toast.error('Failed to fetch meal.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="text-center py-12 relative z-40">

                {/* TITLE */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-red-600">
                    Discover Random Meals
                </h1>

                {/* TEXT */}
                <p className="text-xl md:text-2xl text-white mb-12 font-light">
                    {!hasLoadedMeal
                        ? 'What’s on the plate today? 👀'
                        : 'Try another one! 🤤'}
                </p>

                {/* 🍽️ PLATE */}
                <motion.button
                    onClick={fetchRandomMeal}
                    className="text-7xl md:text-8xl cursor-pointer select-none mb-12 hover:scale-110 transition-transform"
                    aria-label="Get random meal"
                    animate={loading ? { rotate: 360 } : undefined}
                    transition={
                        loading
                            ? {
                                  repeat: Infinity,
                                  duration: 1,
                                  ease: 'linear',
                              }
                            : undefined
                    }
                >
                    🍽️
                </motion.button>

                {/* RECIPE */}
                {meal && (
                    <div className="mt-12">
                        <RecipeCard
                            meal={meal}
                            userData={userData}
                            isAuthenticated={!!auth?.user}
                        />
                    </div>
                )}

                {/* CTA */}
                {!auth?.user && (
                    <div className="mt-12 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl">
                        <p className="text-white text-lg">
                            Want to save favorites, rate recipes, and add notes?{' '}
                            <Link href="/register" className="text-red-400 underline font-bold">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
