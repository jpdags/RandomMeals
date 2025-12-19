// Animated gradient background with CSS (3D version optionally loads when WebGL supported)
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const foodEmojis = ["🍕", "🍔", "🥗", "🍜", "🥘", "🍰", "🥐", "🍱"];

export default function Background3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ 
        background: 'linear-gradient(180deg, #87CEEB 0%, #FEEAC9 50%, #92D162 100%)' 
      }}
    >
      {/* Animated sun */}
      {mounted && (
        <div 
          className="absolute w-32 h-32 rounded-full animate-float"
          style={{
            top: '10%',
            right: '15%',
            background: 'radial-gradient(circle, #FFD85E 0%, #FFE69A 50%, transparent 70%)',
            boxShadow: '0 0 60px 30px rgba(255, 216, 94, 0.4)',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
      )}
      
      {/* Animated clouds */}
      {mounted && (
        <>
          <div 
            className="absolute"
            style={{
              top: '15%',
              left: '-10%',
              animation: 'cloudMove 30s linear infinite'
            }}
          >
            <div className="flex gap-0">
              <div className="w-20 h-14 bg-white rounded-full opacity-90" />
              <div className="w-16 h-12 bg-white rounded-full opacity-90 -ml-8 mt-2" />
              <div className="w-14 h-10 bg-white rounded-full opacity-90 -ml-6 mt-4" />
            </div>
          </div>
          
          <div 
            className="absolute"
            style={{
              top: '25%',
              left: '-15%',
              animation: 'cloudMove 40s linear infinite',
              animationDelay: '-15s'
            }}
          >
            <div className="flex gap-0">
              <div className="w-24 h-16 bg-white rounded-full opacity-85" />
              <div className="w-18 h-14 bg-white rounded-full opacity-85 -ml-10 mt-2" />
              <div className="w-16 h-12 bg-white rounded-full opacity-85 -ml-8 mt-4" />
            </div>
          </div>
          
          <div 
            className="absolute"
            style={{
              top: '8%',
              left: '-5%',
              animation: 'cloudMove 35s linear infinite',
              animationDelay: '-25s'
            }}
          >
            <div className="flex gap-0">
              <div className="w-16 h-10 bg-white rounded-full opacity-80" />
              <div className="w-12 h-8 bg-white rounded-full opacity-80 -ml-6 mt-1" />
            </div>
          </div>
        </>
      )}
      
      {/* Grass texture overlay at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{
          background: 'linear-gradient(to top, #7BC043 0%, #92D162 50%, transparent 100%)'
        }}
      />

      {/* Floating food emojis */}
      {mounted && foodEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-3xl sm:text-4xl opacity-10"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
          }}
          animate={{
            y: [null, -50, 50],
            x: [null, Math.random() * 30 - 15],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.5,
          }}
          style={{
            left: `${10 + (index * 12)}%`,
            top: `${10 + (index * 10)}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Ambient glow orbs */}
      {mounted && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-burgundy/5 rounded-full blur-3xl" />
        </>
      )}
      
      <style>{`
        @keyframes cloudMove {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(100vw + 200px));
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}
