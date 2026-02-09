import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useStore, AppStage } from '../store/useStore';
import { SceneContainer } from '../components/3d/SceneContainer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PerspectiveCamera, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SelectedWorkSection } from './sections/work/SelectedWorkSection';
import { ProjectArchiveSection } from './sections/work/ProjectArchiveSection';

gsap.registerPlugin(ScrollTrigger);

// --- 3D Background Components ---

const CustomModel = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.2;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Central Core */}
        <mesh>
          <icosahedronGeometry args={[1.2, 0]} />
          <MeshDistortMaterial
            color="#00ff88"
            speed={3}
            distort={0.4}
            radius={1}
            roughness={0.1}
            metalness={0.8}
            emissive="#003311"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Wireframe Cage */}
        <mesh scale={1.5}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#ffffff" 
            roughness={0.1} 
            metalness={1} 
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Floating Panels */}
        {[...Array(6)].map((_, i) => (
           <group key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
             <mesh position={[2, 0, 0]}>
                <boxGeometry args={[0.1, 0.5, 1]} />
                <meshStandardMaterial color="#333" roughness={0.2} metalness={0.8} />
             </mesh>
           </group>
        ))}
      </Float>
    </group>
  );
};

const WorkExperience = () => (
  <>
    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
    <ambientLight intensity={0.5} />
    <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={20} color="#ffffff" />
    <pointLight position={[-10, -10, -5]} intensity={5} color="#00ff88" />
    
    <CustomModel />
    
    <Environment preset="city" />
    <EffectComposer enableNormalPass={false}>
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  </>
);

// --- Main Page Component ---

export const Work: React.FC = () => {
  const setStage = useStore(state => state.setStage);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStage(AppStage.PRODUCT);
  }, [setStage]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main title on load
      gsap.fromTo('.work-title',
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power4.out" }
      );

      // Animate footer text
      gsap.fromTo('.work-footer',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.work-footer',
            start: "top 90%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SceneContainer>
        <WorkExperience />
      </SceneContainer>

      <div ref={containerRef} className="w-full min-h-screen p-6 md:p-20 pt-32 perspective-1000">
          <div className="w-full max-w-7xl mx-auto space-y-12">
              <div className="overflow-hidden">
                <h1 className="work-title text-6xl md:text-8xl font-bold tracking-tighter mb-12 origin-top-left transform-style-3d">
                  SELECTED<br/> <span className="text-horizn-accent">WORK</span>
                </h1>
              </div>
              
              <SelectedWorkSection />
              
              <ProjectArchiveSection />

              <div className="work-footer pt-12 border-t border-white/10 mt-12">
                <p className="text-xl text-white/60 max-w-2xl">
                  Our portfolio spans across fintech, fashion, and futuristic interfaces. We don't just build websites; we build worlds.
                </p>
              </div>
          </div>
      </div>
    </>
  );
};