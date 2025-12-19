<<<<<<< Updated upstream
import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function FloatingFood({ position, color }) {
    const meshRef = useRef();
    
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
    );
}

function Particles() {
    const count = 100;
    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#ff6b6b" />
        </points>
    );
}

function CanvasContent() {
    const foodColors = ['#ff6b6b', '#ffa500', '#ffd700', '#ff6347', '#ff8c00'];
    const foodPositions = useMemo(() => {
        return Array.from({ length: 15 }, () => [
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 15,
        ]);
    }, []);

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Particles />
            {foodPositions.map((pos, i) => (
                <FloatingFood
                    key={i}
                    position={pos}
                    color={foodColors[i % foodColors.length]}
                />
            ))}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
        </>
    );
}

export default function Background3D() {
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-950 via-gray-900 to-orange-950" />
        );
    }

    return (
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-950 via-gray-900 to-orange-950" style={{ zIndex: -10 }}>
            <Suspense 
                fallback={<div className="w-full h-full bg-gradient-to-br from-red-950 via-gray-900 to-orange-950" />}
            >
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    style={{ width: '100%', height: '100%' }}
                    gl={{ alpha: true, antialias: true }}
                    onError={() => {
                        console.error('Canvas error occurred');
                        setHasError(true);
                    }}
                >
                    <CanvasContent />
                </Canvas>
            </Suspense>
        </div>
    );
=======
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
>>>>>>> Stashed changes
}
