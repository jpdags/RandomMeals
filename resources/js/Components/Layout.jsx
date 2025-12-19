import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
<<<<<<< Updated upstream
import Background3D from './Background3D';
=======
import { Button } from '@/components/ui/button';
import { Home, Heart, User } from 'lucide-react';
>>>>>>> Stashed changes

export default function Layout({ children }) {
    const { auth } = usePage().props;

    return (
<<<<<<< Updated upstream
        <div className="min-h-screen bg-gradient-to-br from-red-950 via-gray-900 to-orange-950 relative overflow-hidden">
            <Background3D />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-900/60 pointer-events-none z-0" />
            <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg relative">
                <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-white hover:text-red-400 transition-colors drop-shadow-lg">
                        🍽️ Random Meals
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        {auth?.user ? (
                            <>
                                <Link
                                    href="/"
                                    className="text-white/90 hover:text-red-400 transition-colors font-medium"
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/profile"
                                    className="text-white/90 hover:text-red-400 transition-colors font-medium"
                                >
                                    Profile
=======
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
                    <Link href="/" className="flex items-center gap-2 text-2xl font-display font-bold text-foreground hover:text-primary transition-colors">
                        <span className="text-3xl">📖</span>
                        <span className="hidden sm:inline">Vintage Recipe</span>
                    </Link>
                    
                    <div className="flex items-center gap-1 sm:gap-2">
                        {auth?.user ? (
                            <>
                                <Link href="/" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all font-medium text-xs sm:text-sm group">
                                    <Home className="w-5 h-5 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Home</span>
                                </Link>
                                <Link href="/favorites" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-all font-medium text-xs sm:text-sm">
                                    <Heart className="w-5 h-5 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Favorites</span>
                                </Link>
                                <Link href="/profile" className="flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all font-medium text-xs sm:text-sm">
                                    <User className="w-5 h-5 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Profile</span>
>>>>>>> Stashed changes
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
<<<<<<< Updated upstream
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-red-500/50"
                                >
                                    Logout
=======
                                    className="relative inline-flex h-9 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ml-1 sm:ml-2"
                                >
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--secondary))_0%,hsl(var(--primary))_50%,hsl(var(--secondary))_100%)]" />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-card px-3 sm:px-6 py-2 text-xs sm:text-sm font-medium text-foreground">
                                        Logout
                                    </span>
>>>>>>> Stashed changes
                                </Link>
                            </>
                        ) : (
                            <>
<<<<<<< Updated upstream
                                <Link
                                    href="/login"
                                    className="text-white/90 hover:text-red-400 transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-red-500/50"
                                >
                                    Register
                                </Link>
=======
                                <Button onClick={() => (window.location.href = '/login')} size="sm">Login</Button>
                                <Button variant="outline" onClick={() => (window.location.href = '/register')} size="sm">Register</Button>
>>>>>>> Stashed changes
                            </>
                        )}
                    </div>
                </nav>
            </header>

<<<<<<< Updated upstream
            <main className="container mx-auto px-4 py-8 relative z-20">
=======
            <main className="relative z-20 flex-1">
>>>>>>> Stashed changes
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-30"
                >
                    {children}
                </motion.div>
            </main>
<<<<<<< Updated upstream
            
            <footer className="container mx-auto px-4 pb-8 relative z-20">
                <div className="mt-4 text-center text-white/70 text-sm">
                    Inspired by GROUP 10: Baquiran, Daguio, Jonio, Sayahan
                </div>
            </footer>
        </div>
    );
}

=======
        </div>
    );
}
>>>>>>> Stashed changes
