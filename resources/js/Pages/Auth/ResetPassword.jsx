import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft } from 'lucide-react';
import Background3D from '../../Components/Background3D';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Get token and email from URL
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get('email');
        const tokenParam = window.location.pathname.split('/').pop();
        
        if (emailParam) setEmail(decodeURIComponent(emailParam));
        if (tokenParam) setToken(tokenParam);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({
                    token,
                    email,
                    password,
                    password_confirmation: passwordConfirm,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Clear session storage
                sessionStorage.removeItem('resetEmail');
                sessionStorage.removeItem('resetToken');
                
                // Redirect to login with success message
                window.location.href = '/login?reset=success';
            } else {
                setError(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head title="Reset Password" />
            <Background3D />
            
            <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    {/* Back Link */}
                    <Link
                        href="/forgot-password"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-body"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Forgot Password
                    </Link>

                    {/* Card */}
                    <div className="book-cover rounded-3xl p-8 shadow-2xl">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <Lock className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                                Set New Password
                            </h1>
                            <p className="text-muted-foreground font-body">
                                Create a strong password to secure your account
                            </p>
                            {email && (
                                <p className="text-sm text-primary font-body mt-2">
                                    {email}
                                </p>
                            )}
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-display font-semibold text-foreground mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 8 characters"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none bg-white/50 font-body transition-colors"
                                    required
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-muted-foreground font-body mt-2">
                                    Must be at least 8 characters long
                                </p>
                            </div>

                            {/* Confirm Password Input */}
                            <div>
                                <label htmlFor="passwordConfirm" className="block text-sm font-display font-semibold text-foreground mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    placeholder="Re-enter your password"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none bg-white/50 font-body transition-colors"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 rounded-lg bg-red-100/30 text-red-700 border border-red-400/50 text-sm font-body"
                                >
                                    {error}
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isLoading || !password || !passwordConfirm}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#b87225] to-[#a05f1f] text-white font-display font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </motion.button>

                            {/* Footer */}
                            <div className="text-center pt-4 border-t border-primary/10">
                                <p className="text-sm text-muted-foreground font-body">
                                    Remember your password?{' '}
                                    <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </main>
        </>
    );
}

