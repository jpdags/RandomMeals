import { Link, useForm, usePage } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { motion } from 'framer-motion';

export default function Register() {
    const { oauth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <Layout>
            <main className="relative z-10 py-8 md:py-12 flex-1">
                <div className="container mx-auto px-4 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="book-cover rounded-2xl shadow-2xl p-8"
                    >
                        <h1 className="text-3xl font-display font-bold text-foreground mb-6 text-center">Register</h1>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 font-display">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-white/50 border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground font-body transition-all"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-destructive font-body">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 font-display">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-white/50 border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground font-body transition-all"
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-destructive font-body">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2 font-display">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-white/50 border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground font-body transition-all"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-destructive font-body">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-foreground mb-2 font-display">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-white/50 border-2 border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-foreground placeholder:text-muted-foreground font-body transition-all"
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-destructive font-body">{errors.password_confirmation}</p>
                                )}
                            </div>

                            <motion.button
                                type="submit"
                                disabled={processing}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-vintage disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {processing ? 'Registering...' : 'Register'}
                            </motion.button>

                            {oauth?.googleEnabled && (
                                <>
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-border/50"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-paper text-muted-foreground font-body">Or continue with</span>
                                        </div>
                                    </div>

                                    <a
                                        href="/auth/google"
                                        className="flex items-center justify-center gap-3 w-full px-4 py-3 border-2 border-border bg-white/30 hover:bg-white/50 rounded-lg transition-all font-body text-foreground hover:text-primary"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Register with Google
                                    </a>
                                </>
                            )}

                            <p className="text-center text-sm text-muted-foreground font-body">
                                Already have an account?{' '}
                                <Link href="/login" className="text-primary hover:text-primary/80 font-semibold hover:underline">
                                    Log In Here
                                </Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </main>
        </Layout>
    );
}

