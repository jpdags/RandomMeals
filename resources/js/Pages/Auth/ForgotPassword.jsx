import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import Background3D from '../../Components/Background3D';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowSuccess(true);
                // Store email for next step
                sessionStorage.setItem('resetEmail', email);
                // Redirect to verify OTP page after 2 seconds
                setTimeout(() => {
                    window.location.href = '/verify-otp';
                }, 2000);
            } else {
                setError(data.message || 'Failed to send verification code. Please try again.');
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
            <Head title="Forgot Password" />
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
                        href="/login"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-body"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
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
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                                Forgot Password?
                            </h1>
                            <p className="text-muted-foreground font-body">
                                No worries! Enter your email and we'll send you a verification code.
                            </p>
                        </motion.div>

                        {/* Success State */}
                        {showSuccess ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-8"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100/30 mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-green-700 font-body mb-2">Verification code sent!</p>
                                <p className="text-sm text-muted-foreground font-body">
                                    Check your email at <strong>{email}</strong>
                                </p>
                                <p className="text-sm text-muted-foreground font-body mt-2">
                                    Redirecting to verification...
                                </p>
                            </motion.div>
                        ) : (
                            /* Form */
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-display font-semibold text-foreground mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
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
                                    disabled={isLoading || !email}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#b87225] to-[#a05f1f] text-white font-display font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Sending...' : 'Send Verification Code'}
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
                        )}
                    </div>
                </motion.div>
            </main>
        </>
    );
}

