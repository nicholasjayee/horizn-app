// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export const Phone = (props: any) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if(!group.current) return;
    const t = state.clock.getElapsedTime();
    // Complex floating animation
    group.current.rotation.z = Math.sin(t / 2) * 0.1;
    group.current.rotation.y = Math.sin(t / 3) * 0.2;
    group.current.position.y = Math.sin(t) * 0.15;
  });

  return (
    <group ref={group} {...props} dispose={null}>
       {/* Body */}
       <RoundedBox args={[1, 2, 0.15]} radius={0.1} smoothness={4}>
         <meshStandardMaterial color="#2a2a2a" roughness={0.2} metalness={0.9} />
       </RoundedBox>
       
       {/* Screen */}
       <mesh position={[0, 0, 0.08]}>
         <planeGeometry args={[0.9, 1.9]} />
         <meshStandardMaterial color="#000000" emissive="#00ff88" emissiveIntensity={0.4} />
         
         {/* Animated Circle on screen */}
         <mesh position={[0, 0, 0.01]}>
            <ringGeometry args={[0.2, 0.25, 32]} />
            <meshBasicMaterial color="#ffffff" />
         </mesh>
       </mesh>
       
       {/* Notch/Camera */}
       <mesh position={[0, 0.9, 0.09]}>
         <circleGeometry args={[0.03]} />
         <meshBasicMaterial color="#000" />
       </mesh>
    </group>
  );
};