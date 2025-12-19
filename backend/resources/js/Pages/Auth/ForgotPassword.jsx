import { useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="vintage-card rounded-2xl shadow-2xl p-8"
                >
                    <h1 className="text-3xl font-bold vintage-title mb-2 text-center">Forgot Password</h1>
                    <p className="text-muted-foreground text-center mb-6">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    {status && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-border text-foreground placeholder:text-muted-foreground"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'Sending...' : 'Send password reset link'}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
}
