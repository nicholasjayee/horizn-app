// @ts-nocheck
import React, { useRef, useMemo, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

export const ArchitectureModel = forwardRef((props, ref) => {
  const group = useRef<THREE.Group>(null);
  
  // Create a grid of cubes
  const count = 5;
  const spacing = 0.4;
  const offset = (count * spacing) / 2 - (spacing / 2);

  const cubes = useMemo(() => {
    const temp = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        for (let z = 0; z < count; z++) {
          // Only create cubes on the edges or random internal ones for a "structure" look
          if (
            Math.random() > 0.7 || 
            x === 0 || x === count - 1 || 
            y === 0 || y === count - 1 || 
            z === 0 || z === count - 1
          ) {
            temp.push({ x: x * spacing - offset, y: y * spacing - offset, z: z * spacing - offset });
          }
        }
      }
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (group.current) {
        // Slow structural rotation
        group.current.rotation.y = state.clock.elapsedTime * 0.1;
        group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={ref} {...props}>
      <group ref={group}>
        <Instances range={cubes.length}>
          <boxGeometry args={[0.25, 0.25, 0.25]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
          
          {cubes.map((data, i) => (
            <Instance 
                key={i} 
                position={[data.x, data.y, data.z]} 
            />
          ))}
        </Instances>
        
        {/* Inner glowing core representing the 'logic' */}
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.2} />
        </mesh>
      </group>
    </group>
  );
});