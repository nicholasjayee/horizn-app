// @ts-nocheck
import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import { LOCATIONS, latLonToVector3 } from '../../../utils/geo';

export const Globe3D: React.FC = () => {
  const globeRef = useRef<THREE.Group>(null);
  
  // Load a stylish dark earth texture
  const texture = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-dark.jpg');
  
  // Auto-rotate the globe
  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }
  });

  const markers = useMemo(() => {
    return LOCATIONS.map((loc, i) => {
      // Place markers slightly above the surface (radius > 2)
      const pos = latLonToVector3(loc.lat, loc.lon, 2.04);
      return (
        <group key={i} position={pos}>
           {/* Marker Dot */}
           <mesh>
             <sphereGeometry args={[0.03, 16, 16]} />
             <meshBasicMaterial color="#00ff88" toneMapped={false} />
           </mesh>
           {/* Pulsing Ring */}
           <mesh scale={[1.5, 1.5, 1.5]}>
             <ringGeometry args={[0.03, 0.05, 32]} />
             <meshBasicMaterial color="#00ff88" transparent opacity={0.4} side={THREE.DoubleSide} toneMapped={false} />
             <Html distanceFactor={15} zIndexRange={[100, 0]}>
                <div className="pointer-events-none select-none">
                    <div className="text-[8px] font-mono text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 whitespace-nowrap mt-2 shadow-xl">
                        {loc.name}
                    </div>
                </div>
             </Html>
           </mesh>
        </group>
      );
    });
  }, []);

  return (
    <group ref={globeRef}>
          {/* Main Earth Sphere with Texture */}
          <Sphere args={[2, 64, 64]}>
            <meshStandardMaterial 
                map={texture}
                color="#cccccc" // Slight tint to ensure it's not too dark
                roughness={0.6}
                metalness={0.2}
                envMapIntensity={0.5}
            />
          </Sphere>
          
          {/* Tech Grid Overlay (Subtle) */}
          <Sphere args={[2.01, 32, 32]}>
             <meshBasicMaterial 
                color="#00ff88" 
                wireframe 
                transparent 
                opacity={0.03} 
             />
          </Sphere>

          {/* Atmosphere Glow */}
          <mesh scale={[2.15, 2.15, 2.15]}>
             <sphereGeometry args={[1, 32, 32]} />
             <meshBasicMaterial 
                color="#0044ff" 
                transparent 
                opacity={0.08} 
                blending={THREE.AdditiveBlending} 
                side={THREE.BackSide} 
                depthWrite={false}
             />
          </mesh>

          {/* Locations */}
          {markers}
          
          {/* Decorative Rings around globe */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
             <torusGeometry args={[2.5, 0.005, 16, 100]} />
             <meshBasicMaterial color="#ffffff" transparent opacity={0.05} />
          </mesh>
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
             <torusGeometry args={[2.8, 0.005, 16, 100]} />
             <meshBasicMaterial color="#00ff88" transparent opacity={0.05} />
          </mesh>
    </group>
  );
};
