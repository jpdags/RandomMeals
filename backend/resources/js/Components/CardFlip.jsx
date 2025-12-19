import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CardFlip({ front, back, className = '' }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className={`relative w-full h-full cursor-pointer perspective-1000 ${className}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
            >
                <div className="absolute w-full h-full backface-hidden">
                    {front}
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    {back}
                </div>
            </motion.div>
            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </div>
    );
}

