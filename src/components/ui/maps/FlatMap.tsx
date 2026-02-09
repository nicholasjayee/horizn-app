// @ts-nocheck
import React, { useMemo, useRef } from 'react';
import { Plane, Html, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LOCATIONS, latLonToVector2 } from '../../../utils/geo';

export const FlatMap: React.FC = () => {
  const width = 10;
  const height = 5;
  const group = useRef<THREE.Group>(null);

  // Load Earth texture (dark theme)
  const texture = useTexture('https://unpkg.com/three-globe/example/img/earth-dark.jpg');
  
  // Animated scanline
  const scanlineRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
      // Explicitly check if the mesh is available
      const mesh = scanlineRef.current;
      if (mesh) {
          // Move scanline up and down
          mesh.position.y = (Math.sin(state.clock.elapsedTime * 0.2) * (height / 2.2));
      }
  });

  const markers = useMemo(() => {
    return LOCATIONS.map((loc, i) => {
      const pos = latLonToVector2(loc.lat, loc.lon, width, height);
      return (
        <group key={i} position={pos}>
           {/* Marker Ring */}
           <mesh position={[0, 0, 0.02]}>
              <ringGeometry args={[0.03, 0.05, 32]} />
              <meshBasicMaterial color="#00ff88" side={THREE.DoubleSide} />
           </mesh>
           
           {/* Marker Dot */}
           <mesh position={[0, 0, 0.02]}>
              <circleGeometry args={[0.02, 16]} />
              <meshBasicMaterial color="#ffffff" />
           </mesh>
           
           {/* Vertical 'Hologram' Line */}
           <mesh position={[0, 0.15, 0.02]}>
              <planeGeometry args={[0.005, 0.3]} />
              <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
           </mesh>

           {/* Label */}
           <Html position={[0, 0.35, 0.02]} center zIndexRange={[100, 0]}>
                <div className="flex flex-col items-center group cursor-pointer transition-transform hover:scale-110">
                    <div className="bg-black/90 border border-horizn-accent/30 px-2 py-1 rounded backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <div className="text-[9px] font-bold font-mono text-horizn-accent whitespace-nowrap uppercase tracking-wider">
                            {loc.name}
                        </div>
                    </div>
                    <div className="h-2 w-px bg-horizn-accent/50" />
                </div>
           </Html>
        </group>
      );
    });
  }, []);

  return (
    <group ref={group}>
        {/* Map Plane */}
        <Plane args={[width, height]} position={[0, 0, 0]}>
            <meshStandardMaterial 
                map={texture} 
                roughness={0.7} 
                metalness={0.4}
                color="#888" // Tint to fit dark theme
            />
        </Plane>
        
        {/* Grid Overlay for Tech feel */}
        <Plane args={[width, height]} position={[0, 0, 0.01]}>
             <meshBasicMaterial 
                color="#00ff88" 
                wireframe 
                transparent 
                opacity={0.03}
             />
        </Plane>
        
        {/* Horizontal Scanline Effect */}
        <mesh ref={scanlineRef} position={[0, 0, 0.02]}>
            <planeGeometry args={[width, 0.02]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {markers}
    </group>
  );
};