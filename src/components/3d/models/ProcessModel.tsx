// @ts-nocheck
import React, { forwardRef } from 'react';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ProcessModelProps {
  materialRef: any;
}

export const ProcessModel = forwardRef<THREE.Group, ProcessModelProps>(({ materialRef }, ref) => {
  return (
    <group ref={ref}>
      {/* Core Shape */}
      <mesh>
        <icosahedronGeometry args={[0.8, 0]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#ffffff"
          roughness={0.8}
          metalness={0.1}
          distort={0.3}
          speed={2}
          wireframe={true}
        />
      </mesh>
      
      {/* Abstract Tech Shell */}
      <mesh scale={1.2}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.15} 
        />
      </mesh>

      {/* Floating Elements */}
      <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
         <mesh scale={1.6}>
            <torusGeometry args={[1, 0.02, 16, 32]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.1} />
         </mesh>
      </group>
    </group>
  );
});
