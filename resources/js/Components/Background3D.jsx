// Animated gradient background with Spline 3D integration
import { useEffect, useState, Suspense, lazy } from 'react';

// Lazy load Spline to avoid SSR issues
const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineLoader = () => (
  <div className="absolute inset-0 w-full h-full opacity-80 bg-gradient-to-b from-[#F5E6D3] to-[#E8D5C4]" />
);

export default function Background3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ 
        background: 'linear-gradient(180deg, #F5E6D3 0%, #E8D5C4 100%)' 
      }}
    >
      {/* Spline 3D Background */}
      {mounted && (
        <Suspense fallback={<SplineLoader />}>
          <div className="absolute inset-0 w-full h-full opacity-80">
            <Spline scene="https://prod.spline.design/c0UTMzQphpuwFt-e/scene.splinecode" />
          </div>
        </Suspense>
      )}
      
      {/* Grass texture overlay at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{
          background: 'linear-gradient(to top, #7BC043 0%, #92D162 50%, transparent 100%)'
        }}
      />

      {/* Ambient glow orbs */}
      {mounted && (
        <>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b87225]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#92D162]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#e8d5c4]/5 rounded-full blur-3xl" />
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
