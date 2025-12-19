import { useState } from 'react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  rating: number | null;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ 
  rating, 
  onRatingChange, 
  disabled = false,
  size = 'lg' 
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (value: number) => {
    if (!disabled && onRatingChange) {
      onRatingChange(value);
    }
  };

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !disabled && setHoverRating(star)}
            onMouseLeave={() => setHoverRating(null)}
            disabled={disabled}
            className={`${sizeClasses[size]} focus:outline-none disabled:cursor-not-allowed`}
            whileHover={!disabled ? { scale: 1.2 } : {}}
            whileTap={!disabled ? { scale: 0.9 } : {}}
          >
            <span
              className={`transition-colors duration-200 ${
                star <= (hoverRating || rating || 0)
                  ? 'text-accent'
                  : 'text-muted'
              }`}
            >
              ★
            </span>
          </motion.button>
        ))}
      </div>
      {rating && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-display font-semibold text-foreground"
        >
          You rated this {rating} out of 5
        </motion.p>
      )}
      {!rating && !disabled && (
        <p className="text-muted-foreground">Click to rate this recipe</p>
      )}
    </div>
  );
}
