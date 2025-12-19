import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function StarRating({ rating, onRatingChange, disabled = false }) {
    const [hoverRating, setHoverRating] = useState(null);

    const handleClick = (value) => {
        if (!disabled && onRatingChange) {
            onRatingChange(value);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((love) => {
                    const active = love <= (hoverRating || rating || 0);
                    return (
                    <motion.button
                        key={love}
                        onClick={() => handleClick(love)}
                        onMouseEnter={() => !disabled && setHoverRating(love)}
                        onMouseLeave={() => setHoverRating(null)}
                        disabled={disabled}
                        className="focus:outline-none disabled:cursor-not-allowed"
                        whileHover={!disabled ? { scale: 1.1 } : {}}
                        whileTap={!disabled ? { scale: 0.95 } : {}}
                        aria-label={`Rate ${love} out of 5 hearts`}
                    >
                        <Heart
                            className={`w-10 h-10 transition-colors ${
                                active
                                    ? 'text-pink-500 fill-pink-500 drop-shadow-[0_0_12px_rgba(236,72,153,0.45)]'
                                    : 'text-muted-foreground/40'
                            }`}
                            strokeWidth={1.8}
                            fill={active ? 'currentColor' : 'none'}
                        />
                    </motion.button>
                    );
                })}
            </div>
            {rating && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-semibold text-white"
                >
                    You loved this {rating} / 5
                </motion.p>
            )}
            {!rating && (
                <p className="text-white/70">Tap the hearts to show your love</p>
            )}
        </div>
    );
}

