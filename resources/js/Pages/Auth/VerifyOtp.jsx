import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import Background3D from '../../Components/Background3D';

export default function VerifyOtp() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resetToken, setResetToken] = useState(null);

    useEffect(() => {
        // Get email from session storage or redirect to forgot password
        const storedEmail = sessionStorage.getItem('resetEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/password/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({ email, otp }),
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                setError('Server error. Please try again later.');
                console.error('Response is not JSON:', response.status, response.statusText);
                setIsLoading(false);
                return;
            }

            const data = await response.json();

            if (response.ok) {
                // Store reset token and redirect to password reset
                sessionStorage.setItem('resetToken', data.reset_token);
                sessionStorage.setItem('resetEmail', email);
                window.location.href = `/reset-password/${data.reset_token}?email=${encodeURIComponent(email)}`;
            } else {
                setError(data.message || 'Invalid OTP. Please try again.');
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
            <Head title="Verify OTP" />
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
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                                Verify Code
                            </h1>
                            <p className="text-muted-foreground font-body">
                                Enter the 6-digit code we sent to your email
                            </p>
                            {email && (
                                <p className="text-sm text-primary font-body mt-2">
                                    {email}
                                </p>
                            )}
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* OTP Input */}
                            <div>
                                <label htmlFor="otp" className="block text-sm font-display font-semibold text-foreground mb-2">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="000000"
                                    maxLength="6"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none bg-white/50 font-body text-center text-2xl tracking-widest transition-colors"
                                    required
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-muted-foreground font-body mt-2">
                                    Enter the 6-digit code from your email
                                </p>
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
                                disabled={isLoading || otp.length !== 6}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#b87225] to-[#a05f1f] text-white font-display font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Verifying...' : 'Verify Code'}
                            </motion.button>

                            {/* Footer */}
                            <div className="text-center pt-4 border-t border-primary/10">
                                <p className="text-sm text-muted-foreground font-body">
                                    Didn't receive the code?{' '}
                                    <Link href="/forgot-password" className="text-primary hover:text-primary/80 font-semibold">
                                        Request again
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
