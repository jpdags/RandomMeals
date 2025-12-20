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

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <Layout>
            <main className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="form-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                    >
                        {/* Header */}
                        <motion.div
                            className="text-center mb-8"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-[#4a3728] mb-3">
                                Register
                            </h1>
                            <p className="text-base text-[#8b7355] font-body">
                                Create your account to get started
                            </p>
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <label htmlFor="name" className="label">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                    className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.name
                                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                            : 'border-[#d4c4b0] focus:ring-[#b87225]/20 focus:border-[#b87225] bg-white'
                                    }`}
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 font-body">{errors.name}</p>
                                )}
                            </motion.div>

                            {/* Email Field */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2 font-display">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="you@example.com"
                                    className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg font-body placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.email
                                            ? 'border-destructive focus:ring-destructive'
                                            : 'border-border focus:ring-primary focus:border-primary'
                                    }`}
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-destructive font-body">{errors.email}</p>
                                )}
                            </motion.div>

                            {/* Password Field */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <label htmlFor="password" className="block text-sm font-bold text-foreground mb-2 font-display">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg font-body placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.password
                                            ? 'border-destructive focus:ring-destructive'
                                            : 'border-border focus:ring-primary focus:border-primary'
                                    }`}
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-destructive font-body">{errors.password}</p>
                                )}
                            </motion.div>

                            {/* Confirm Password Field */}
                            <motion.div
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <label htmlFor="password_confirmation" className="block text-sm font-bold text-foreground mb-2 font-display">
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 bg-white/70 border-2 rounded-lg font-body placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.password_confirmation
                                            ? 'border-destructive focus:ring-destructive'
                                            : 'border-border focus:ring-primary focus:border-primary'
                                    }`}
                                    required
                                />
                                {errors.password_confirmation && (
                                    <p className="mt-1 text-sm text-destructive font-body">{errors.password_confirmation}</p>
                                )}
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={processing}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 btn-vintage disabled:opacity-50 disabled:cursor-not-allowed font-semibold mt-2"
                            >
                                {processing ? 'Registering...' : 'Register'}
                            </motion.button>

                            {/* Divider */}
                            {oauth?.googleEnabled && (
                                <motion.div
                                    className="relative my-6"
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border/50"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-2 bg-paper text-muted-foreground font-body text-sm">Or continue with</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Google OAuth */}
                            {oauth?.googleEnabled && (
                                <motion.a
                                    href="/auth/google"
                                    className="flex items-center justify-center gap-3 w-full px-4 py-3 border-2 border-border bg-white/50 hover:bg-white/70 rounded-lg transition-all font-body text-foreground hover:text-primary"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Register with Google
                                </motion.a>
                            )}

                            {/* Footer Links */}
                            <motion.div
                                className="text-center pt-4"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <p className="text-sm text-muted-foreground font-body">
                                    Already have an account?{' '}
                                    <Link href="/login" className="text-primary hover:text-primary/80 font-semibold hover:underline">
                                        Log In Here
                                    </Link>
                                </p>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>
            </main>
        </Layout>
    );
}

