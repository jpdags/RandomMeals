import { useState } from 'react';
import Layout from '../Components/Layout';
import { usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Mail, Lock, Trash2 } from 'lucide-react';

export default function Profile() {
    const { auth } = usePage().props;
    const [actionStatus, setActionStatus] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: auth?.user?.name || '',
    });

    const sendPasswordReset = async () => {
        setActionStatus(null);
        try {
            await fetch('/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: auth?.user?.email }),
            });
            setActionStatus('Password reset link sent to your email.');
        } catch (e) {
            setActionStatus('Failed to send reset link.');
            console.error(e);
        }
    };

    const deleteAccount = async () => {
        const ok = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
        if (!ok) return;
        try {
            await fetch('/account', { method: 'DELETE' });
            window.location.href = '/';
        } catch (e) {
            setActionStatus('Failed to delete account.');
            console.error(e);
        }
    };

    return (
        <Layout>
            <main className="relative z-10 py-8 md:py-12 flex-1">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2 flex items-center justify-center gap-3">
                            <User className="w-10 h-10 text-primary" />
                            Your Profile
                        </h1>
                        <p className="text-lg text-muted-foreground font-body">
                            Manage your account settings and preferences
                        </p>
                    </motion.div>

                    {/* Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="book-cover rounded-2xl p-8 mb-8 max-w-2xl mx-auto"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-vintage">
                                    <User className="w-12 h-12 text-primary-foreground" />
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                                    {auth?.user?.name}
                                </h2>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-4">
                                    <Mail className="w-4 h-4" />
                                    <p className="font-body">{auth?.user?.email}</p>
                                </div>
                                <p className="text-sm text-muted-foreground font-body">
                                    Member since {new Date(auth?.user?.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                </p>
                            </div>
                        </div>

                        {/* Status Message */}
                        {actionStatus && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mb-6 p-4 rounded-lg font-body text-sm ${
                                    actionStatus.includes('success') || actionStatus.includes('sent')
                                        ? 'bg-green-100/30 text-green-700 border border-green-400/50'
                                        : 'bg-red-100/30 text-red-700 border border-red-400/50'
                                }`}
                            >
                                {actionStatus}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Actions Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="book-cover rounded-2xl p-8 max-w-2xl mx-auto"
                    >
                        <h3 className="text-2xl font-display font-bold text-foreground mb-6">Account Settings</h3>
                        
                        <div className="space-y-4">
                            {/* Reset Password Button */}
                            <motion.button
                                onClick={sendPasswordReset}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-primary/20 hover:border-primary/40 bg-primary/5 hover:bg-primary/10 transition-all group"
                            >
                                <Lock className="w-5 h-5 text-primary group-hover:text-primary transition-colors" />
                                <div className="text-left flex-1">
                                    <p className="font-display font-semibold text-foreground">Reset Password</p>
                                    <p className="text-sm text-muted-foreground">Send password reset link to email</p>
                                </div>
                                <span className="text-primary text-lg">→</span>
                            </motion.button>

                            {/* Delete Account Button */}
                            <motion.button
                                onClick={deleteAccount}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center gap-3 p-4 rounded-xl border-2 border-destructive/20 hover:border-destructive/40 bg-destructive/5 hover:bg-destructive/10 transition-all group"
                            >
                                <Trash2 className="w-5 h-5 text-destructive group-hover:text-destructive transition-colors" />
                                <div className="text-left flex-1">
                                    <p className="font-display font-semibold text-foreground">Delete Account</p>
                                    <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                                </div>
                                <span className="text-destructive text-lg">→</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </Layout>
    );
}
