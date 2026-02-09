import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { LoadingScreen } from '../ui/LoadingScreen';

interface SceneContainerProps {
  children: React.ReactNode;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({ children }) => {
  return (
    <>
      <LoadingScreen />
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <Canvas 
          shadows 
          gl={{ antialias: false, stencil: false, alpha: false }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ scene }) => { scene.background = new THREE.Color('#0a0a0a') }}
        >
           <Suspense fallback={null}>
              {children}
           </Suspense>
        </Canvas>
      </div>
    </>
  );
};