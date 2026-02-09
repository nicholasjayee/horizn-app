import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Globe3D } from './Globe3D';
import { FlatMap } from './FlatMap';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Map as MapIcon, Maximize2 } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  return (
    <div className="w-full h-[500px] md:h-[600px] relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm group">
      
      {/* UI Controls */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
        <button 
            onClick={() => setViewMode('3d')}
            className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 ${viewMode === '3d' ? 'bg-horizn-accent text-black border-horizn-accent' : 'bg-black/50 text-white border-white/10 hover:border-white/30'}`}
        >
            <Globe size={20} />
        </button>
        <button 
            onClick={() => setViewMode('2d')}
            className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 ${viewMode === '2d' ? 'bg-horizn-accent text-black border-horizn-accent' : 'bg-black/50 text-white border-white/10 hover:border-white/30'}`}
        >
            <MapIcon size={20} />
        </button>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 bg-horizn-accent rounded-full animate-pulse" />
             <span className="text-xs font-mono text-horizn-accent tracking-widest">NETWORK ACTIVE</span>
          </div>
          <div className="text-[10px] font-mono text-white/40 space-y-1">
             <p>NODES: 7</p>
             <p>LATENCY: 24ms</p>
             <p>REGION: GLOBAL</p>
          </div>
      </div>

      {/* 3D Canvas */}
      <div className="w-full h-full cursor-move">
        <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            
            <Suspense fallback={null}>
                <AnimatePresence mode="wait">
                    {viewMode === '3d' ? (
                        <Globe3D key="globe" />
                    ) : (
                        <group key="flat" rotation={[0, 0, 0]}>
                            {/* Adjust camera for 2D view or move object */}
                            <FlatMap />
                            <OrbitControls enableRotate={false} enableZoom={true} minZoom={0.5} maxZoom={2} />
                        </group>
                    )}
                </AnimatePresence>
            </Suspense>
        </Canvas>
      </div>

      {/* Grid Overlay Texture */}
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-2xl" />
    </div>
  );
};