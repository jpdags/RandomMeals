import { useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

export default function Profile() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [sort, setSort] = useState('newest');
    const [showSort, setShowSort] = useState(false);

    // MODAL STATE
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [showModal, setShowModal] = useState(false);

    /* ========= LOAD FAVORITES ========= */
    const loadFavorites = async () => {
        setLoading(true);
        setError(null);

        const loadingToast = toast.loading('Loading favorites…');

        try {
            const res = await axios.get('/api/favorites');
            setFavorites(res.data.favorites || []);
            toast.success('Favorites loaded ❤️', { id: loadingToast });
        } catch (e) {
            setError('Failed to load favorites.');
            toast.error('Failed to load favorites', { id: loadingToast });
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    /* ========= REMOVE FAVORITE ========= */
    const removeFavorite = async (mealId) => {
        try {
            await axios.delete(`/api/favorites/${mealId}`);
            setFavorites((prev) => prev.filter((f) => f.meal_id !== mealId));
            toast.success('Removed from favorites 💔');
        } catch (e) {
            toast.error('Failed to remove favorite');
            console.error(e);
        }
    };

    /* ========= OPEN RECIPE (MODAL) ========= */
    const viewRecipe = async (mealId) => {
        try {
            const res = await axios.get(`/api/meals/${mealId}`);
            setSelectedMeal(res.data.meal);
            setShowModal(true);
            toast.success('Recipe opened 📕');
        } catch (e) {
            toast.error('Failed to load recipe');
            console.error(e);
        }
    };

    /* ========= PDF ========= */
    const downloadPDF = () => {
        if (!selectedMeal) return;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(selectedMeal.strMeal, 14, 20);

        doc.setFontSize(12);
        doc.text(`Category: ${selectedMeal.strCategory}`, 14, 30);

        let y = 40;
        doc.text('Ingredients:', 14, y);
        y += 8;

        selectedMeal.ingredientsWithMeasures?.forEach(item => {
            doc.text(`• ${item.measure} ${item.ingredient}`, 14, y);
            y += 6;
        });

        y += 8;
        doc.text('Instructions:', 14, y);
        y += 8;

        selectedMeal.strInstructions
            .split('. ')
            .filter(Boolean)
            .forEach((step, i) => {
                doc.text(`Step ${i + 1}: ${step}`, 14, y);
                y += 6;
            });

        doc.save(`${selectedMeal.strMeal}.pdf`);
        toast.success('Recipe downloaded 📄');
    };

    /* ========= SORT ========= */
    const sortedFavorites = [...favorites].sort((a, b) => {
        if (sort === 'newest') return new Date(b.created_at) - new Date(a.created_at);
        if (sort === 'oldest') return new Date(a.created_at) - new Date(b.created_at);
        if (sort === 'az') return a.meal_data?.strMeal.localeCompare(b.meal_data?.strMeal);
        if (sort === 'za') return b.meal_data?.strMeal.localeCompare(a.meal_data?.strMeal);
        return 0;
    });

    return (
        <Layout>
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-white">
                        Your Favorites ({favorites.length})
                    </h1>

                    {/* SORT */}
                    <div className="relative">
                        <button
                            onClick={() => setShowSort(!showSort)}
                            className="bg-black/40 text-white border border-white/20 rounded-lg px-4 py-2 min-w-[120px] flex justify-between items-center"
                        >
                            {sort === 'newest' && 'Newest'}
                            {sort === 'oldest' && 'Oldest'}
                            {sort === 'az' && 'A–Z'}
                            {sort === 'za' && 'Z–A'}
                            <span className="ml-2">▾</span>
                        </button>

                        {showSort && (
                            <div className="absolute right-0 mt-2 w-full bg-[#111] border border-white/20 rounded-lg shadow-xl z-50">
                                {[
                                    { value: 'newest', label: 'Newest' },
                                    { value: 'oldest', label: 'Oldest' },
                                    { value: 'az', label: 'A–Z' },
                                    { value: 'za', label: 'Z–A' },
                                ].map(item => (
                                    <button
                                        key={item.value}
                                        onClick={() => {
                                            setSort(item.value);
                                            setShowSort(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {loading && <p className="text-white/80">Loading favorites...</p>}
                {error && <p className="text-red-400">{error}</p>}

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedFavorites.map(fav => (
                        <div
                            key={fav.id}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6"
                        >
                            <img
                                src={fav.meal_data?.strMealThumb}
                                className="w-full h-48 object-cover rounded-xl mb-4"
                            />

                            <h3 className="text-xl font-bold text-white text-center mb-1">
                                {fav.meal_data?.strMeal}
                            </h3>

                            <div className="flex justify-center mb-5">
                                <span className="px-3 py-1 bg-red-600/30 text-red-200 rounded-full text-sm">
                                    {fav.meal_data?.strCategory}
                                </span>
                            </div>

                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => viewRecipe(fav.meal_id)}
                                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold text-sm"
                                >
                                    View Recipe
                                </button>

                                <button
                                    onClick={() => removeFavorite(fav.meal_id)}
                                    className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== MODAL ===== */}
            <AnimatePresence>
                {showModal && selectedMeal && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto px-4 pt-32 pb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.97, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.97, opacity: 0 }}
                            className="relative max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-white text-2xl hover:opacity-70"
                            >
                                ✕
                            </button>

                            <h2 className="text-3xl font-bold text-white mb-2">
                                {selectedMeal.strMeal}
                            </h2>

                            <span className="px-3 py-1 bg-red-600/30 text-red-200 rounded-full text-sm">
                                {selectedMeal.strCategory}
                            </span>

                            <div className="grid md:grid-cols-2 gap-10 mt-6 text-left">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Ingredients
                                    </h3>
                                    <ul className="space-y-2 text-white/90">
                                        {selectedMeal.ingredientsWithMeasures?.map((item, i) => (
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
                                        {selectedMeal.strInstructions
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

                            <div className="mt-10 flex justify-center">
                                <button
                                    onClick={downloadPDF}
                                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-red-500/50"
                                >
                                    Download Recipe as PDF
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
}
