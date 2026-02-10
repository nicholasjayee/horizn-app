// @ts-nocheck
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore, AppStage } from '../../store/useStore';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import { Laptop } from './devices/Laptop';
import { Phone } from './devices/Phone';
import { ProcessModel } from './models/ProcessModel';
import { FluidParticles } from './models/FluidParticles';
import { ArchitectureModel } from './models/ArchitectureModel';
import gsap from 'gsap';

export const HeroObject: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<any>(null);
  const laptopRef = useRef<THREE.Group>(null);
  const phoneRef = useRef<THREE.Group>(null);
  const fluidRef = useRef<THREE.Group>(null);
  const architectureRef = useRef<THREE.Group>(null);
  
  const currentStage = useStore(state => state.currentStage);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const duration = 1;
      const ease = "power2.inOut";
      const elastic = "elastic.out(1, 0.5)";

      switch (currentStage) {
        case AppStage.IDEA:
           if (meshRef.current) {
               gsap.to(meshRef.current.position, { x: 0, y: 0, z: 0, duration, ease });
               gsap.to(meshRef.current.rotation, { x: 0, y: 0, z: 0, duration, ease });
               gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration, ease });
           }
           if (materialRef.current) {
               const c = new THREE.Color('#ffffff');
               gsap.to(materialRef.current.color, { r: c.r, g: c.g, b: c.b, duration, ease });
               gsap.to(materialRef.current, { roughness: 0.8, metalness: 0.1, distort: 0.3, duration, ease });
               materialRef.current.wireframe = true;
           }
           // Hide others
           if (laptopRef.current) gsap.to(laptopRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (phoneRef.current) gsap.to(phoneRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (fluidRef.current) gsap.to(fluidRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (architectureRef.current) gsap.to(architectureRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           break;

        case AppStage.CODE:
           if (meshRef.current) {
               gsap.to(meshRef.current.scale, { x: 0, y: 0, z: 0, duration, ease: "back.in(1)" });
               gsap.to(meshRef.current.position, { x: 2, y: 0, z: 0, duration, ease });
           }
           // Hide devices
           if (laptopRef.current) gsap.to(laptopRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (phoneRef.current) gsap.to(phoneRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
           if (fluidRef.current) gsap.to(fluidRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           
           // Show Architecture Model
           if (architectureRef.current) {
               gsap.to(architectureRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration, ease: elastic });
               gsap.to(architectureRef.current.position, { x: 2, y: 0, z: 0, duration, ease });
           }
           break;

        case AppStage.MOTION:
           if (meshRef.current) {
               gsap.to(meshRef.current.scale, { x: 0, y: 0, z: 0, duration, ease: "back.in(1)" });
           }
           if (laptopRef.current) gsap.to(laptopRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
           if (phoneRef.current) gsap.to(phoneRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.5 });
           if (architectureRef.current) gsap.to(architectureRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           
           // Show Fluid Particles
           if (fluidRef.current) {
               gsap.to(fluidRef.current.scale, { x: 1, y: 1, z: 1, duration, ease });
               gsap.to(fluidRef.current.position, { x: 0, y: 0, z: 0, duration, ease });
           }
           break;

        case AppStage.POLISH:
           if (meshRef.current) {
               gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration, ease: elastic });
               gsap.to(meshRef.current.position, { x: 0, y: 0, z: 0, duration, ease });
               gsap.to(meshRef.current.rotation, { x: Math.PI / 2, y: 0, z: 0, duration, ease });
           }
           if (materialRef.current) {
               const c = new THREE.Color('#111111');
               gsap.to(materialRef.current.color, { r: c.r, g: c.g, b: c.b, duration, ease });
               gsap.to(materialRef.current, { roughness: 0.1, metalness: 0.9, distort: 0, duration, ease });
               materialRef.current.wireframe = false;
           }
           if (laptopRef.current) gsap.to(laptopRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (phoneRef.current) gsap.to(phoneRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (fluidRef.current) gsap.to(fluidRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (architectureRef.current) gsap.to(architectureRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           break;

        case AppStage.PRODUCT:
           if (meshRef.current) {
               gsap.to(meshRef.current.scale, { x: 3, y: 2, z: 0.1, duration, ease });
               gsap.to(meshRef.current.position, { x: 0, y: 0, z: -2, duration, ease });
               gsap.to(meshRef.current.rotation, { x: 0, y: 0, z: 0, duration, ease });
           }
           if (materialRef.current) {
               const c = new THREE.Color('#ffffff');
               gsap.to(materialRef.current.color, { r: c.r, g: c.g, b: c.b, duration, ease });
               gsap.to(materialRef.current, { roughness: 0.8, metalness: 0.1, distort: 0, duration, ease });
               materialRef.current.wireframe = false;
           }
           if (laptopRef.current) gsap.to(laptopRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (phoneRef.current) gsap.to(phoneRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (fluidRef.current) gsap.to(fluidRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (architectureRef.current) gsap.to(architectureRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           break;

        case AppStage.HIDDEN:
           if (meshRef.current) {
               gsap.to(meshRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           }
           if (laptopRef.current) gsap.to(laptopRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (phoneRef.current) gsap.to(phoneRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (fluidRef.current) gsap.to(fluidRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           if (architectureRef.current) gsap.to(architectureRef.current.scale, { x: 0, y: 0, z: 0, duration, ease });
           break;
      }
    });
    return () => ctx.revert();
  }, [currentStage]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // SCROLL SCRUBBING LOGIC FOR IDEA STAGE
    if (currentStage === AppStage.IDEA) {
        const scrollProgress = useStore.getState().scrollProgress;
        
        // Color: White -> Grey
        if (materialRef.current) {
             const c1 = new THREE.Color('#ffffff');
             const c2 = new THREE.Color('#888888');
             const finalColor = c1.clone().lerp(c2, scrollProgress);
             materialRef.current.color.set(finalColor);
             
             materialRef.current.wireframe = scrollProgress <= 0.8;
        }

        // Scale
        const targetScale = 1.5 + (scrollProgress * 0.2);
        meshRef.current.scale.set(targetScale, targetScale, targetScale);
        
        // Rotation
        meshRef.current.rotation.y = (scrollProgress * Math.PI * 2);
    } else if (currentStage !== AppStage.HIDDEN) {
        // Floating rotation
        meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group>
      {/* Abstract Hero Object (ProcessModel) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ProcessModel ref={meshRef} materialRef={materialRef} />
      </Float>

      {/* Architecture Model (Code Stage) - Removed Float wrapper for consistency with FluidParticles */}
      <ArchitectureModel ref={architectureRef} scale={[0,0,0]} />

      {/* Fluid Particles (Motion Stage) */}
      <FluidParticles ref={fluidRef} scale={[0,0,0]} />

      {/* Legacy Devices (Keeping components available but hidden unless needed later) */}
      <group ref={laptopRef} scale={[0,0,0]} position={[0, -0.5, 0]}>
          <Laptop />
      </group>
      <group ref={phoneRef} scale={[0,0,0]}>
          <Phone />
      </group>
    </group>
  );
};