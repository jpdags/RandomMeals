import { useState } from 'react';
import { motion } from 'framer-motion';

export default function StarRating({ rating, onRatingChange, disabled = false }) {
    const [hoverRating, setHoverRating] = useState(null);

    const handleClick = (value) => {
        if (!disabled && onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => !disabled && setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        disabled={disabled}
                        className="text-5xl focus:outline-none disabled:cursor-not-allowed"
                        whileHover={!disabled ? { scale: 1.2 } : {}}
                        whileTap={!disabled ? { scale: 0.9 } : {}}
                    >
                        <span
                            className={
                                star <= (hoverRating || rating || 0)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }
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
                    className="text-xl font-semibold text-white"
                >
                    You rated this {rating} out of 5
                </motion.p>
            )}
            {!rating && (
                <p className="text-white/70">Click to rate this recipe</p>
            )}
        </div>
    );
}

