import './bootstrap';
import { Toaster } from 'react-hot-toast';
import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Random Meals';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        if (!el) {
            console.error('Inertia: root element not found');
            return;
        }

        const root = createRoot(el);
        root.render(
            <>
                <Toaster position="top-right" />
                <App {...props} />
            </>
        );
    },
    progress: {
        color: '#F53003',
    },
});
