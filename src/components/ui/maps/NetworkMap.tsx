// @ts-nocheck
import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { LOCATIONS } from '../../../utils/geo';

// Project for Isometric view
const project = (lat: number, lon: number) => {
  // Global projection centered at 0,0
  const scale = 0.12; 
  const x = lon * scale;
  const z = -lat * scale; // Invert lat for Z
  return new THREE.Vector3(x, 0, z);
};

const ServerBlock = ({ position, type, name }: any) => {
  const isHub = type === 'Hub' || type === 'HQ';
  const height = isHub ? 1.5 : 0.8;
  const color = isHub ? '#00ff88' : type === 'Storage' ? '#ffaa00' : '#00aaff';
  
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 6]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Server Tower */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[0, 0.1]}>
        <group position={[0, height/2 + 0.15, 0]}>
           <mesh>
             <boxGeometry args={[0.4, height, 0.4]} />
             <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.8} />
           </mesh>
           <mesh scale={[1.02, 1.02, 1.02]}>
             <boxGeometry args={[0.4, height, 0.4]} />
             <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
           </mesh>
           
           {/* Blinking Status Light */}
           <mesh position={[0, height/2 - 0.2, 0.21]}>
              <planeGeometry args={[0.2, 0.05]} />
              <meshBasicMaterial color={color} />
           </mesh>
        </group>
      </Float>

      {/* Label */}
      <Html position={[0, height + 0.5, 0]} center distanceFactor={20} zIndexRange={[50, 0]}>
        <div className="flex flex-col items-center pointer-events-none whitespace-nowrap">
           <div className="bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded border border-white/20 backdrop-blur-md mb-1 shadow-lg">
             {name}
           </div>
           <div className="w-px h-4 bg-white/20 mt-1" />
        </div>
      </Html>
    </group>
  );
};

const ConnectionLine = ({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) => {
   const s = start.clone().setY(0.2);
   const e = end.clone().setY(0.2);
   
   return (
     <group>
        <Line points={[s, e]} color="#444" lineWidth={1} transparent opacity={0.3} />
        <Packet start={s} end={e} />
     </group>
   );
};

const Packet = ({ start, end }: { start: THREE.Vector3, end: THREE.Vector3 }) => {
  const ref = useRef<THREE.Mesh>(null);
  const speed = Math.random() * 0.5 + 0.5;
  const offset = Math.random();
  
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime * speed + offset) % 1;
      ref.current.position.lerpVectors(start, end, t);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#00ff88" />
    </mesh>
  );
};

export const NetworkMap: React.FC = () => {
  const nodes = useMemo(() => {
    return LOCATIONS.map(loc => ({
      ...loc,
      pos: project(loc.lat, loc.lon)
    }));
  }, []);

  const connections = useMemo(() => {
     const lines: {start: THREE.Vector3, end: THREE.Vector3}[] = [];
     const hubs = nodes.filter(n => n.region === 'Hub' || n.region === 'HQ');
     
     nodes.forEach(node => {
        if (node.region !== 'Hub' && node.region !== 'HQ') {
            // Connect to nearest hub for realistic topology
            const nearestHub = hubs.sort((a,b) => a.pos.distanceTo(node.pos) - b.pos.distanceTo(node.pos))[0];
            if (nearestHub) {
                lines.push({ start: nearestHub.pos, end: node.pos });
            }
        } else if (node.region === 'Hub') {
            // Connect hubs to HQ (Los Angeles)
            const hq = nodes.find(n => n.region === 'HQ');
            if (hq && hq !== node) {
                 lines.push({ start: hq.pos, end: node.pos });
            }
        }
     });
     return lines;
  }, [nodes]);

  return (
    <group>
      {/* Infinite Grid floor */}
      <gridHelper args={[60, 60, 0x222222, 0x111111]} position={[0, -0.01, 0]} />
      
      {/* Digital Floor Glow */}
      <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -0.02, 0]}>
         <planeGeometry args={[60, 60]} />
         <meshBasicMaterial color="#050505" opacity={0.9} transparent />
      </mesh>

      {nodes.map((node, i) => (
        <ServerBlock key={i} position={node.pos} type={node.region} name={node.name} />
      ))}
      {connections.map((line, i) => (
         <ConnectionLine key={i} start={line.start} end={line.end} />
      ))}
    </group>
  );
};
