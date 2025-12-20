import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '../Components/Layout';

export default function Welcome() {
    const [particles, setParticles] = useState([]);
    const audioContextRef = useRef(null);

    const foods = [
        '🍕', '🍔', '🍟', '🌭', '🍿', '🧀', '🥓', '🍗', '🍖', '🥩',
        '🍤', '🍣', '🍱', '🍛', '🍜', '🍝', '🍲', '🥗', '🥙', '🌮',
        '🌯', '🥪', '🥞', '🧇', '🥐', '🍞', '🥨', '🧈', '🍩', '🍪',
        '🎂', '🍰', '🧁', '🍦', '🍨', '🍧', '🍫', '🍬', '🍭', '🍮',
        '🍎', '🍌', '🍇', '🍓', '🍍', '🥭', '🍑', '🍒', '🍉', '🥥'
    ];

    useEffect(() => {
        // Initialize audio context for pop sounds
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Create initial particles
        const initialParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            food: foods[Math.floor(Math.random() * foods.length)],
            left: Math.random() * 100,
            size: Math.random() * 2.5 + 1.2,
            duration: Math.random() * 18 + 12,
            delay: Math.random() * -25,
            isPopped: false
        }));
        setParticles(initialParticles);
    }, []);

    const createAmbientLoop = () => {
        const audio = document.querySelector('audio');
        if (audio) {
            audio.play().catch(err => console.log('Audio play error:', err));
        }
    };

    const playPop = () => {
        if (!audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
    };

    const handleParticleClick = (id) => {
        if (navigator.vibrate) navigator.vibrate(20);
        playPop();

        setParticles(particles.map(p =>
            p.id === id ? { ...p, isPopped: true } : p
        ));

        setTimeout(() => {
            setParticles(particles.filter(p => p.id !== id));
        }, 500);
    };

    const exploreMeals = () => {
        // Navigate to meals page (music continues via Layout)
        window.location.href = '/meals';
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4]">
            {/* Particles Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {particles.map(particle => (
                    <motion.div
                        key={particle.id}
                        className={`fixed pointer-events-auto cursor-pointer select-none text-center ${
                            particle.isPopped ? 'animate-pop' : ''
                        }`}
                        style={{
                            fontSize: `${particle.size}rem`,
                            left: `${particle.left}%`,
                        }}
                        initial={{ y: '100vh', opacity: 0, rotate: 0 }}
                        animate={{ y: '-100vh', opacity: [0, 0.8, 0], rotate: 360 }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            ease: 'linear',
                            repeat: Infinity,
                        }}
                        onClick={() => handleParticleClick(particle.id)}
                    >
                        {particle.food}
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 text-center px-6 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Emoji Header */}
                <motion.div
                    className="flex justify-center gap-4 text-5xl mb-8"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <span>🍕</span>
                    <span>🍔</span>
                    <span>🍜</span>
                    <span>🥗</span>
                    <span>🍣</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    className="text-5xl md:text-6xl font-bold text-[#3d2817] mb-4 font-serif"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    You don't choose.
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-lg md:text-xl text-[#6b5344] mb-8 leading-relaxed max-w-lg mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Can't decide what to eat?<br />
                    <span className="font-semibold">
                        Let the internet decide your fate.
                    </span>
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    className="relative inline-block mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    {/* Pulse Ring */}
                    <motion.div
                        className="absolute inset-[-20px] border-2 border-[rgba(184,114,37,0.3)] rounded-full"
                        animate={{ scale: [0.9, 1.3], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <button
                        onClick={exploreMeals}
                        className="relative px-12 py-4 bg-gradient-to-br from-[#b87225] to-[#a05f1f] text-white font-serif text-xl font-semibold rounded-lg border-2 border-[#8b4513] shadow-lg hover:shadow-xl transition-all active:scale-95 overflow-hidden group"
                    >
                        {/* Ripple Effect */}
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity" />
                        <span className="relative">Discover a Meal</span>
                    </button>
                </motion.div>

                {/* Footer Text */}
                <motion.p
                    className="text-sm text-[#6b5344] italic mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    No filters. No preferences. No overthinking.
                </motion.p>
            </motion.div>

            <style>{`
                @keyframes pop {
                    0% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(2) rotate(180deg);
                        opacity: 0;
                    }
                }

                .animate-pop {
                    animation: pop 0.5s ease-out forwards !important;
                }
            `}</style>
            </div>
        </Layout>
    );
}
