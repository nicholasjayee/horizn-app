// @ts-nocheck
import React from 'react';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { HeroObject } from './HeroObject';
import { CodeSnippets } from './CodeSnippets';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useStore, AppStage } from '../../store/useStore';

export const Experience: React.FC = () => {
  const currentStage = useStore(state => state.currentStage);
  useThree(); // Ensure R3F types are loaded

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      
      {/* Lighting Changes based on Stage */}
      <ambientLight intensity={currentStage === AppStage.POLISH ? 0.2 : 0.8} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[-10, 10, 10]} angle={0.3} penumbra={1} intensity={currentStage === AppStage.POLISH ? 10 : 0} color="#00ff88" />

      <HeroObject />
      <CodeSnippets />
      
      <Environment preset={currentStage === AppStage.POLISH ? "city" : "studio"} />

      {/* Post Processing */}
      <EffectComposer enableNormalPass={false}>
        {currentStage === AppStage.POLISH && (
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} radius={0.4} />
        )}
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
};