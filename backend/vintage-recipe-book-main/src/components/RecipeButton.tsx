import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

interface RecipeButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function RecipeButton({ onClick, disabled = false }: RecipeButtonProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative w-36 h-36 rounded-full disabled:opacity-50 disabled:cursor-not-allowed group"
        style={{
          background: 'linear-gradient(145deg, hsl(15 60% 55%), hsl(15 60% 42%))',
          boxShadow: `
            0 15px 35px -10px rgba(199, 91, 57, 0.6), 
            0 5px 15px rgba(0,0,0,0.1),
            inset 0 2px 15px rgba(255,255,255,0.25),
            inset 0 -3px 10px rgba(0,0,0,0.15)
          `
        }}
      >
        {/* Inner highlight ring */}
        <div 
          className="absolute inset-2 rounded-full border-2 border-white/20"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 60%)'
          }}
        />
        
        {/* Icon */}
        <span className="relative z-10 flex items-center justify-center h-full">
          <Utensils className="w-12 h-12 text-white drop-shadow-lg group-hover:rotate-12 transition-transform" />
        </span>
        
        {/* Pulse effect on hover */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-white/10"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <p className="text-foreground font-display text-lg font-semibold mb-1">
          Press for a recipe!
        </p>
        <p className="text-muted-foreground text-sm">
          Discover something delicious
        </p>
      </motion.div>
    </div>
  );
}
