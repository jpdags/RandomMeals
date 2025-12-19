import { useForm } from '@inertiajs/react';
import Layout from '../../Components/Layout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="vintage-card rounded-2xl shadow-2xl p-8"
                >
                    <h1 className="text-3xl font-bold vintage-title mb-6 text-center">Reset Password</h1>

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

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-border text-foreground placeholder:text-muted-foreground"
                                required
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-muted-foreground mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-border text-foreground placeholder:text-muted-foreground"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <Button type="submit" disabled={processing} className="w-full">
                            {processing ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                </motion.div>
            </div>
        </Layout>
    );
}

