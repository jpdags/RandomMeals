import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Background3D from './Background3D';

export default function Layout({ children }) {
    const { auth } = usePage().props;

    return (
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
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg hover:shadow-red-500/50"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-30"
                >
                    {children}
                </motion.div>
            </main>
            
            <footer className="container mx-auto px-4 pb-8 relative z-20">
                <div className="mt-4 text-center text-white/70 text-sm">
                    
                </div>
            </footer>
        </div>
    );
}

