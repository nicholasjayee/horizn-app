// @ts-nocheck
import React, { useMemo, useRef, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FluidParticles = forwardRef((props, ref) => {
  const points = useRef<THREE.Points>(null);
  const count = 4000;

  // Initialize particles
  const [positions, initialPositions, randomData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Sphere-like distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = Math.cbrt(Math.random()) * 4; // Radius

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;
      
      rnd[i] = Math.random();
    }
    return [pos, init, rnd];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    
    const time = state.clock.getElapsedTime();
    const array = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ix = initialPositions[i3];
      const iy = initialPositions[i3 + 1];
      const iz = initialPositions[i3 + 2];
      
      // Fluid-like wave motion
      const speed = 0.5;
      const amplitude = 0.5 + randomData[i] * 0.5;
      
      // Complex wave movement
      const x = ix + Math.sin(iy * 0.5 + time * speed) * amplitude;
      const y = iy + Math.cos(iz * 0.3 + time * speed) * amplitude;
      const z = iz + Math.sin(ix * 0.5 + time * speed) * amplitude;

      array[i3] = x;
      array[i3 + 1] = y;
      array[i3 + 2] = z;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the whole group slowly
    if (points.current) {
        points.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={ref} {...props}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#00ff88"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
});