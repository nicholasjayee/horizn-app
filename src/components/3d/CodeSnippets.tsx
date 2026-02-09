/// <reference types="@react-three/fiber" />
import React from 'react';
import { Float, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useStore, AppStage } from '../../store/useStore';

export const CodeSnippets: React.FC = () => {
  const currentStage = useStore(state => state.currentStage);
  useThree(); // Ensure R3F types are loaded
  
  if (currentStage !== AppStage.CODE) return null;

  return (
    <group>
      <Float speed={4} rotationIntensity={1} floatIntensity={2} position={[-2, 1, 0]}>
        <Text
          fontSize={0.2}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5.woff"
          color="#00ff88"
        >
          {`const future = createRef();`}
        </Text>
      </Float>
      
      <Float speed={3} rotationIntensity={1} floatIntensity={1} position={[2, -1, 1]}>
        <Text
          fontSize={0.2}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5.woff"
          color="#ffffff"
          fillOpacity={0.5}
        >
          {`<Experience immersion={true} />`}
        </Text>
      </Float>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[0, 2, -2]}>
        <Text
          fontSize={0.15}
          font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0Pn5.woff"
          color="#888888"
        >
          {`import { Reality } from '@horizn/core';`}
        </Text>
      </Float>
    </group>
  );
};