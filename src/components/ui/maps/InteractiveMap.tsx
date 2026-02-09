// @ts-nocheck
import React, { useState, Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Globe3D } from './Globe3D';
import { FlatMap } from './FlatMap';
import { NetworkMap } from './NetworkMap';
import { Globe, Map as MapIcon, Share2, Plus, Minus } from 'lucide-react';

// Wrapper to handle programmatic zoom since buttons are outside Canvas
const MapControls = ({ viewMode, zoomTrigger }: { viewMode: string, zoomTrigger: { dir: 'in' | 'out', ts: number } | null }) => {
    const controlsRef = useRef<any>(null);

    useEffect(() => {
        if (zoomTrigger && controlsRef.current) {
            // Zoom step factor
            const step = 1.2; 
            
            // Note: Logic swapped based on user feedback that previous configuration was reversed.
            // 'in' (Plus) should Zoom In. 'out' (Minus) should Zoom Out.
            // If dollyIn was causing Zoom Out previously, we use dollyOut here to correct it.
            if (zoomTrigger.dir === 'in') {
                controlsRef.current?.dollyOut(step);
            } else {
                controlsRef.current?.dollyIn(step);
            }
            controlsRef.current?.update();
        }
    }, [zoomTrigger]);

    // Compute props based on viewMode
    const controlsProps = useMemo(() => {
        if (viewMode === '3d') {
            return {
                enableZoom: false,
                enablePan: false,
                minPolarAngle: Math.PI / 3,
                maxPolarAngle: Math.PI - Math.PI / 3,
                minDistance: 2.5,
                maxDistance: 12,
                enableRotate: true,
            };
        }
        if (viewMode === '2d') {
            return {
                enableRotate: false,
                enableZoom: false,
                enablePan: true,
                minDistance: 2,
                maxDistance: 7,
            };
        }
        if (viewMode === 'network') {
            return {
                enableRotate: true,
                enableZoom: false,
                enablePan: true,
                maxPolarAngle: Math.PI / 2.1,
                minDistance: 5,
                maxDistance: 35,
            };
        }
        return {};
    }, [viewMode]);

    return (
        <OrbitControls 
            key={viewMode} // CRITICAL: Force remount of controls when view mode changes to prevent stale camera state
            ref={controlsRef}
            {...controlsProps}
        />
    );
};

export const InteractiveMap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | '2d' | 'network'>('3d');
  const [zoomTrigger, setZoomTrigger] = useState<{ dir: 'in' | 'out', ts: number } | null>(null);

  const handleZoom = (dir: 'in' | 'out') => {
      setZoomTrigger({ dir, ts: Date.now() });
  };

  return (
    <div className="w-full h-[500px] md:h-[600px] relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm group">
      
      {/* UI Controls - High Z-index to overlay map labels */}
      <div className="absolute top-6 right-6 z-[100] flex flex-col gap-6">
          {/* View Mode Switcher */}
          <div className="flex flex-col gap-2">
            <button 
                onClick={() => setViewMode('3d')}
                className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 ${viewMode === '3d' ? 'bg-horizn-accent text-black border-horizn-accent' : 'bg-black/50 text-white border-white/10 hover:border-white/30'}`}
                title="Globe View"
            >
                <Globe size={20} />
            </button>
            <button 
                onClick={() => setViewMode('2d')}
                className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 ${viewMode === '2d' ? 'bg-horizn-accent text-black border-horizn-accent' : 'bg-black/50 text-white border-white/10 hover:border-white/30'}`}
                title="Flat Map"
            >
                <MapIcon size={20} />
            </button>
            <button 
                onClick={() => setViewMode('network')}
                className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 ${viewMode === 'network' ? 'bg-horizn-accent text-black border-horizn-accent' : 'bg-black/50 text-white border-white/10 hover:border-white/30'}`}
                title="Infrastructure Network"
            >
                <Share2 size={20} />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex flex-col gap-2">
            <button 
                onClick={() => handleZoom('in')}
                className="p-3 rounded-xl backdrop-blur-md border border-white/10 bg-black/50 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                title="Zoom In"
            >
                <Plus size={20} />
            </button>
            <button 
                onClick={() => handleZoom('out')}
                className="p-3 rounded-xl backdrop-blur-md border border-white/10 bg-black/50 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                title="Zoom Out"
            >
                <Minus size={20} />
            </button>
          </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 bg-horizn-accent rounded-full animate-pulse" />
             <span className="text-xs font-mono text-horizn-accent tracking-widest">
                {viewMode === 'network' ? 'INFRASTRUCTURE ONLINE' : 'NETWORK ACTIVE'}
             </span>
          </div>
          <div className="text-[10px] font-mono text-white/40 space-y-1">
             <p>NODES: {viewMode === 'network' ? '6 CORE' : '7'}</p>
             <p>LATENCY: 24ms</p>
             <p>REGION: GLOBAL</p>
          </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full cursor-move">
        <Canvas>
            <PerspectiveCamera makeDefault position={viewMode === 'network' ? [8, 8, 8] : [0, 0, 6]} fov={45} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <MapControls viewMode={viewMode} zoomTrigger={zoomTrigger} />

            <Suspense fallback={null}>
                {viewMode === '3d' && (
                    <Globe3D key="globe" />
                )}
                {viewMode === '2d' && (
                    <group key="flat" rotation={[0, 0, 0]}>
                        <FlatMap />
                    </group>
                )}
                {viewMode === 'network' && (
                    <group key="network">
                        <NetworkMap />
                    </group>
                )}
            </Suspense>
        </Canvas>
      </div>

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-2xl" />
    </div>
  );
};