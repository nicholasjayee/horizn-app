// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export const Laptop = (props: any) => {
  const group = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if(!group.current) return;
    const t = state.clock.getElapsedTime();
    // Gentle floating animation
    group.current.rotation.y = Math.sin(t / 2) * 0.1;
    group.current.position.y = Math.sin(t) * 0.1;
  });

  return (
    <group ref={group} {...props} dispose={null}>
       {/* Base */}
       <RoundedBox args={[3, 0.2, 2]} radius={0.1} smoothness={4}>
         <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
       </RoundedBox>
       
       {/* Screen Hinge Group - Pivots from back */}
       <group position={[0, 0.1, -1]} rotation={[0.2, 0, 0]} ref={screenRef}> 
         {/* Screen Chassis */}
         <group position={[0, 1, 0]}> 
             <RoundedBox args={[3, 2, 0.1]} radius={0.1} smoothness={4}>
                <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.8} />
             </RoundedBox>
             {/* Screen Display */}
             <mesh position={[0, 0, 0.06]}>
               <planeGeometry args={[2.8, 1.8]} />
               <meshStandardMaterial color="#050505" emissive="#00ff88" emissiveIntensity={0.15} />
               {/* Mock Code Lines */}
               <group position={[-1, 0.5, 0.01]} scale={0.5}>
                  <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[1.5, 0.1]} />
                    <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
                  </mesh>
                  <mesh position={[0.2, -0.2, 0]}>
                    <planeGeometry args={[1, 0.1]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                  </mesh>
                  <mesh position={[0.4, -0.4, 0]}>
                    <planeGeometry args={[0.8, 0.1]} />
                    <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
                  </mesh>
               </group>
             </mesh>
         </group>
       </group>
    </group>
  );
};