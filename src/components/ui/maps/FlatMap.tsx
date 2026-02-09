import React, { useMemo } from 'react';
import { Plane, Html, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { LOCATIONS, latLonToVector2 } from '../../../utils/geo';

export const FlatMap: React.FC = () => {
  const width = 8;
  const height = 4;

  const markers = useMemo(() => {
    return LOCATIONS.map((loc, i) => {
      const pos = latLonToVector2(loc.lat, loc.lon, width, height);
      return (
        <group key={i} position={pos}>
           {/* Vertical Line Stick */}
           <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 1]} />
              <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
           </mesh>
           
           {/* Base Point */}
           <mesh position={[0, 0, 0.01]}>
              <circleGeometry args={[0.05, 16]} />
              <meshBasicMaterial color="#00ff88" />
           </mesh>

           {/* Label */}
           <Html position={[0, 1.2, 0]} center>
                <div className="bg-horizn-accent/10 border border-horizn-accent/50 px-2 py-1 rounded backdrop-blur-md">
                    <div className="text-[10px] font-bold font-mono text-horizn-accent whitespace-nowrap">
                        {loc.name}
                    </div>
                    <div className="text-[8px] font-mono text-white/50 text-center">
                        {loc.lat.toFixed(1)}°N / {loc.lon.toFixed(1)}°W
                    </div>
                </div>
           </Html>
        </group>
      );
    });
  }, []);

  return (
    <group>
        {/* Map Plane Background */}
        <Plane args={[width, height]} position={[0, 0, -0.01]}>
            <meshBasicMaterial color="#0a0a0a" transparent opacity={0.8} />
        </Plane>

        {/* Grid Lines */}
        <Grid 
            args={[width, height]} 
            cellSize={0.5} 
            cellThickness={1} 
            cellColor="#1a1a1a" 
            sectionSize={1} 
            sectionThickness={1.5} 
            sectionColor="#333" 
            fadeDistance={20} 
            rotation={[Math.PI/2, 0, 0]} // Rotate grid to match plane orientation if needed, but Plane is usually upright in this context? 
            // Wait, Grid helper is usually flat on XZ. Our map is XY.
            // Let's manually draw lines or rotate the group.
        />
        
        {/* Abstract World Outline (Simplified using points or lines for style) */}
        {/* Since we can't load external geojson easily without fetching, we stick to the grid aesthetic */}
        <mesh>
            <planeGeometry args={[width + 0.5, height + 0.5]} />
            <meshBasicMaterial color="#000" wireframe opacity={0.2} transparent />
        </mesh>

        {markers}
    </group>
  );
};