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
}
