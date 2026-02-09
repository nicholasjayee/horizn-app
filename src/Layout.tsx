import React, { useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import * as THREE from 'three';
import { Experience } from './components/3d/Experience';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { LoadingScreen } from './components/ui/LoadingScreen';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      
      {/* Loading Screen Overlay - Uses standard React Suspense for "suspend-react" calls inside it if any, plus standard state */}
      <Suspense fallback={null}>
        <LoadingScreen />
      </Suspense>
      
      {/* 3D Background - Fixed & Pointer Events None so text is selectable */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas 
          shadows 
          gl={{ antialias: false, stencil: false, alpha: false }}
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ scene }) => { scene.background = new THREE.Color('#0a0a0a') }}
        >
           {/* Suspense is needed for async assets like Environment or useGLTF */}
           <Suspense fallback={null}>
              <Experience />
           </Suspense>
        </Canvas>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="w-full flex-grow pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};