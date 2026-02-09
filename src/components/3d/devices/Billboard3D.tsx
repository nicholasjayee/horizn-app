// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';

export const Billboard3D = (props: any) => {
  const group = useRef<THREE.Group>(null);

  // Optional: Add some sway or movement if desired
  useFrame((state) => {
     if(!group.current) return;
     // Subtle wind sway
     group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.005;
  });

  return (
    <group ref={group} {...props} dispose={null}>
       {/* Main Frame Structure */}
       <Box args={[4.2, 1.4, 0.2]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
       </Box>

       {/* Screen Content */}
       <Plane args={[4, 1.2]} position={[0, 0, 0.11]}>
          <meshStandardMaterial color="#000000" emissive="#ffffff" emissiveIntensity={0.8}>
             <videoTexture attach="map" args={[document.createElement('video')]} /> 
             {/* Note: In a real app, you'd pass a video ref or url. For now, this is a placeholder 
                 or assumes a texture is provided via props or just emissive white for 'bright screen' */}
          </meshStandardMaterial>
       </Plane>

       {/* Top Light Fixtures */}
       {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
          <group key={i} position={[x, 0.8, 0.1]} rotation={[0.5, 0, 0]}>
             <Box args={[0.1, 0.05, 0.2]}>
                <meshStandardMaterial color="#333" />
             </Box>
             {/* Light Beam visualization */}
             <group position={[0, -0.5, 0.5]} rotation={[-0.5, 0, 0]}>
                <mesh>
                   <coneGeometry args={[0.2, 1, 32]} />
                   <meshBasicMaterial color="#ffffff" transparent opacity={0.1} depthWrite={false} />
                </mesh>
             </group>
          </group>
       ))}

       {/* Support Pole */}
       <Cylinder args={[0.2, 0.2, 3]} position={[0, -2.1, 0]}>
          <meshStandardMaterial color="#222" metalness={0.6} roughness={0.7} />
       </Cylinder>
       
       {/* Base */}
       <Cylinder args={[0.5, 0.5, 0.2]} position={[0, -3.6, 0]}>
          <meshStandardMaterial color="#333" />
       </Cylinder>
    </group>
  );
};