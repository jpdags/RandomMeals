import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function ThreeButton({ onClick, disabled = false, showLabel = true }) {
    const pressedRef = useRef(false);
    const handleClick = () => {
        if (disabled) return;
        if (onClick) onClick();
        pressedRef.current = true;
    };
    return (
        <div className="w-[280px] h-[200px] mx-auto relative">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 5, 5]} intensity={1} />
                <mesh position={[0, -0.7, 0]}>
                    <cylinderGeometry args={[2.2, 2.2, 0.6, 64]} />
                    <meshStandardMaterial color="#555" metalness={0.2} roughness={0.6} />
                </mesh>
                <mesh
                    position={[0, 0.2, 0]}
                    onPointerDown={handleClick}
                    scale={disabled ? 1 : 1}
                >
                    <cylinderGeometry args={[2, 2, 0.8, 64]} />
                    <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.2} />
                </mesh>
                {showLabel && (
                    <Html center>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white text-sm bg-black/40 px-3 py-1 rounded"
                        >
                            Press the button, please.
                        </motion.div>
                    </Html>
                )}
            </Canvas>
            <button
                type="button"
                onClick={handleClick}
                disabled={disabled}
                className="absolute inset-0 cursor-pointer"
                aria-label="Random Meals"
            />
        </div>
    );
}
