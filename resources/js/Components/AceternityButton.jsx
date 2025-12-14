import { motion } from 'framer-motion';

export default function AceternityButton({ children, className = '', ...props }) {
    return (
        <motion.button
            className={`relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff6b6b_0%,#ffa500_50%,#ff6b6b_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl">
                {children}
            </span>
        </motion.button>
    );
}

