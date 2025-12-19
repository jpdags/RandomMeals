import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Background3D from './Background3D';
import { Button } from '@/components/ui/button';
import { Home, Heart, User, ChevronDown, LogOut } from 'lucide-react';

export default function Layout({ children }) {
    const { props, url } = usePage();
    const { auth } = props;
    const currentPath = url || '';
    const isProfileOrFavorites =
        currentPath.startsWith('/profile') || currentPath.startsWith('/favorites');
    const [menuOpen, setMenuOpen] = useState(false);

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
            <header className="bg-card/95 backdrop-blur-md border-b-2 border-primary/20 sticky top-0 z-50 shadow-lg relative">
                <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-display font-bold text-foreground hover:text-primary transition-colors focus-vintage">
                        <span className="text-3xl">🎲</span>
                        <span className="hidden sm:inline">RandomMeals</span>
                    </Link>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                        {auth?.user ? (
                            <>
                                {!isProfileOrFavorites && (
                                    <>
                                        <Link href="/" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all font-medium text-xs sm:text-sm group focus-vintage">
                                            <Home className="w-5 h-5 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">Home</span>
                                        </Link>
                                        <Link href="/favorites" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-all font-medium text-xs sm:text-sm focus-vintage">
                                            <Heart className="w-5 h-5 sm:w-4 sm:h-4" />
                                            <span className="hidden sm:inline">Favorites</span>
                                        </Link>
                                        <Link href="/profile" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all font-medium text-xs sm:text-sm focus-vintage">
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
                                            className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-sm hover:bg-accent/40 transition-colors focus-vintage"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                        </button>

                                        {menuOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-popover shadow-lg overflow-hidden z-50"
                                            >
                                                <div className="py-1 text-sm">
                                                    <Link
                                                        href="/"
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-accent/60 text-foreground focus-vintage"
                                                    >
                                                        <Home className="w-4 h-4" />
                                                        <span>Home</span>
                                                    </Link>
                                                    <Link
                                                        href="/favorites"
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-accent/60 text-foreground focus-vintage"
                                                    >
                                                        <Heart className="w-4 h-4 text-destructive" />
                                                        <span>Favorite</span>
                                                    </Link>
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center gap-2 px-3 py-2 hover:bg-accent/60 text-foreground focus-vintage"
                                                    >
                                                        <User className="w-4 h-4" />
                                                        <span>Profile</span>
                                                    </Link>
                                                    <Link
                                                        href="/logout"
                                                        method="post"
                                                        as="button"
                                                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-destructive/10 text-destructive text-left focus-vintage"
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
                                <Button onClick={() => (window.location.href = '/login')} size="sm" className="focus-vintage">
                                    Login
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => (window.location.href = '/register')}
                                    size="sm"
                                    className="focus-vintage"
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
