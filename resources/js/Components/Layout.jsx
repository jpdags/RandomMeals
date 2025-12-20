import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Background3D from './Background3D';
import { Button } from '@/components/ui/button';
import { Home, Heart, User, ChevronDown, LogOut, Music } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
    const { props, url } = usePage();
    const { auth } = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const backgroundAudioRef = useRef(null);
    const gameMusicLoop = '/audio/game-music-loop-7-145285.mp3';
    const currentPath = url || '';
    const isProfileOrFavorites =
        currentPath.startsWith('/profile') || currentPath.startsWith('/favorites');
    const [menuOpen, setMenuOpen] = useState(false);

    // Initialize audio only once (globally) on component mount
    useEffect(() => {
        // Only create audio if it doesn't exist in window
        if (!window.__audioInstance) {
            const audio = new Audio(gameMusicLoop);
            audio.loop = true;
            audio.volume = 1;
            window.__audioInstance = audio;
            backgroundAudioRef.current = audio;

            // Auto-play music when layout initializes
            const playAudio = () => {
                if (window.__audioInstance && window.__audioInstance.paused) {
                    window.__audioInstance.play()
                        .then(() => setIsPlaying(true))
                        .catch(err => console.log('Audio play error:', err));
                }
            };

            // Try to play on mount (may be blocked by browser autoplay policy)
            playAudio();

            // Also try playing on user interaction
            window.addEventListener('click', playAudio, { once: true });
            window.addEventListener('scroll', playAudio, { once: true });

            return () => {
                window.removeEventListener('click', playAudio);
                window.removeEventListener('scroll', playAudio);
            };
        } else {
            // Use existing global audio instance
            backgroundAudioRef.current = window.__audioInstance;
            // Check current playing state
            setIsPlaying(!window.__audioInstance.paused);
        }
    }, []);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        // Always update the global audio instance
        if (window.__audioInstance) {
            window.__audioInstance.volume = newVolume;
        } else if (backgroundAudioRef.current) {
            backgroundAudioRef.current.volume = newVolume;
        }
    };

    const toggleMusic = () => {
        const audio = window.__audioInstance || backgroundAudioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play()
                .then(() => setIsPlaying(true))
                .catch(err => console.log('Audio play error:', err));
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden vintage-bg flex flex-col">
            <div className="fixed inset-0 -z-10 overflow-hidden bg-picnic">
                {/* Animated Sun */}
                <div
                    className="absolute w-32 h-32 rounded-full"
                    style={{
                        top: '10%',
                        right: '15%',
                        background: 'radial-gradient(circle, #FFD85E 0%, #FFE69A 50%, transparent 70%)',
                        boxShadow: '0 0 60px 30px rgba(255, 216, 94, 0.4)',
                        animation: 'float 6s ease-in-out infinite'
                    }}
                />
                {/* Sun glow effect */}
                <div
                    className="absolute w-40 h-40 rounded-full opacity-30"
                    style={{
                        top: '8%',
                        right: '12%',
                        background: 'radial-gradient(circle, #FFE69A 0%, transparent 70%)',
                        animation: 'pulse 4s ease-in-out infinite',
                        animationDelay: '0.5s'
                    }}
                />
                
                {/* Clouds with smooth animation */}
                <div
                    className="absolute"
                    style={{
                        top: '15%',
                        left: '-10%',
                        animation: 'cloudMove 30s linear infinite'
                    }}
                >
                    <div className="flex gap-0">
                        <div className="w-20 h-14 bg-white rounded-full opacity-90 shadow-lg" />
                        <div className="w-16 h-12 bg-white rounded-full opacity-90 -ml-8 mt-2 shadow-lg" />
                        <div className="w-14 h-10 bg-white rounded-full opacity-90 -ml-6 mt-4 shadow-lg" />
                    </div>
                </div>
                <div
                    className="absolute"
                    style={{
                        top: '25%',
                        left: '-15%',
                        animation: 'cloudMove 40s linear infinite',
                        animationDelay: '-15s'
                    }}
                >
                    <div className="flex gap-0">
                        <div className="w-24 h-16 bg-white rounded-full opacity-85 shadow-md" />
                        <div className="w-18 h-14 bg-white rounded-full opacity-85 -ml-10 mt-2 shadow-md" />
                        <div className="w-16 h-12 bg-white rounded-full opacity-85 -ml-8 mt-4 shadow-md" />
                    </div>
                </div>
                <div
                    className="absolute"
                    style={{
                        top: '8%',
                        left: '-5%',
                        animation: 'cloudMove 35s linear infinite',
                        animationDelay: '-25s'
                    }}
                >
                    <div className="flex gap-0">
                        <div className="w-16 h-10 bg-white rounded-full opacity-80 shadow-md" />
                        <div className="w-12 h-8 bg-white rounded-full opacity-80 -ml-6 mt-1 shadow-md" />
                    </div>
                </div>
                
                {/* Extra clouds for variety */}
                <div
                    className="absolute"
                    style={{
                        top: '35%',
                        right: '-8%',
                        animation: 'cloudMove 45s linear infinite reverse',
                        animationDelay: '-10s'
                    }}
                >
                    <div className="flex gap-0">
                        <div className="w-20 h-12 bg-white rounded-full opacity-75 shadow-sm" />
                        <div className="w-16 h-10 bg-white rounded-full opacity-75 -ml-8 shadow-sm" />
                    </div>
                </div>
                
                {/* Grass bottom layer */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-[35%]"
                    style={{
                        background: 'linear-gradient(to top, #7BC043 0%, #92D162 50%, transparent 100%)',
                        animation: 'grassSway 4s ease-in-out infinite'
                    }}
                />
            </div>
            <header className="bg-gradient-to-r from-[#F5E6D3] to-[#E8D5C4] backdrop-blur-md border-b-2 border-[#d4c4b0] sticky top-0 z-50 shadow-lg relative">
                <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-display font-bold text-[#4a3728] hover:text-[#b87225] transition-colors focus-vintage">
                        <span className="text-3xl"></span>
                        <span className="hidden sm:inline">RandomMeals</span>
                    </Link>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Music Controls - Only show for logged-in users */}
                        {auth?.user && (
                            <motion.button
                                onClick={toggleMusic}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center w-10 h-10 rounded-lg text-[#4a3728] hover:text-[#b87225] hover:bg-[#b87225]/10 transition-all focus-vintage"
                                title={isPlaying ? 'Pause Music' : 'Play Music'}
                            >
                                <Music className="w-5 h-5" />
                            </motion.button>
                        )}

                        {auth?.user ? (
                            <>
                                {!isProfileOrFavorites && (
                                    <>
                                        <Link href="/meals" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-[#4a3728]/70 hover:text-[#b87225] hover:bg-[#b87225]/10 transition-all font-medium text-xs sm:text-sm group focus-vintage">
                                            <Home className="w-5 h-5 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">Home</span>
                                        </Link>
                                        <Link href="/favorites" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-[#4a3728]/70 hover:text-red-600 hover:bg-red-600/10 transition-all font-medium text-xs sm:text-sm focus-vintage">
                                            <Heart className="w-5 h-5 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">Favorites</span>
                                        </Link>
                                        <Link href="/profile" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-[#4a3728]/70 hover:text-[#b87225] hover:bg-[#b87225]/10 transition-all font-medium text-xs sm:text-sm focus-vintage">
                                            <User className="w-5 h-5 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">Profile</span>
                                        </Link>
                                    </>
                                )}

                                {isProfileOrFavorites && (
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setMenuOpen((open) => !open)}
                                            className="flex items-center gap-2 rounded-full border border-[#d4c4b0] bg-[#F5E6D3] px-3 py-1.5 shadow-sm hover:bg-[#E8D5C4] transition-colors focus-vintage"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b87225] to-[#a05f1f] flex items-center justify-center text-white">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-[#8b7355]" />
                                        </button>

                                        {menuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                    className="absolute right-0 mt-2 w-44 rounded-xl border border-[#d4c4b0] bg-[#F5E6D3] shadow-lg overflow-hidden z-50"
                                            >
                                                <div className="py-1 text-sm">
                                                    <Link
                                                        href="/meals"
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#E8D5C4] text-[#4a3728] focus-vintage"
                                                    >
                                                        <Home className="w-4 h-4" />
                                                        <span>Home</span>
                                                    </Link>
                                                    <Link
                                                        href="/favorites"
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#E8D5C4] text-[#4a3728] focus-vintage"
                                                    >
                                                        <Heart className="w-4 h-4 text-destructive" />
                                                        <span>Favorite</span>
                                                    </Link>
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#E8D5C4] text-[#4a3728] focus-vintage"
                                                    >
                                                        <User className="w-4 h-4" />
                                                        <span>Profile</span>
                                                    </Link>
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        as="button"
                                                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-100 text-red-600 text-left focus-vintage"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        <span>Logout</span>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <Button onClick={() => (window.location.href = '/login')} size="sm" className="bg-[#b87225] hover:bg-[#a05f1f] text-white focus-vintage">
                                    Login
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => (window.location.href = '/register')}
                                    size="sm"
                                    className="border-[#b87225] text-[#b87225] hover:bg-[#b87225] hover:text-white focus-vintage"
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="relative z-20 flex-1">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-30"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
