import React, { useEffect } from 'react';
import { useStore, AppStage } from '../store/useStore';
import { TeamCards } from '../components/ui/tools/TeamCards';

export const Studio: React.FC = () => {
  const setStage = useStore(state => state.setStage);

  useEffect(() => {
    // Reusing Code stage visual for Studio page for now, or could be a new stage
    setStage(AppStage.CODE); 
  }, [setStage]);

  return (
    <div className="w-full min-h-screen p-6 md:p-20 pt-32 flex flex-col items-center">
       <div className="max-w-7xl w-full text-center space-y-20">
         <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">THE SQUAD</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              A collective of creative technologists, 3D artists, and creative directors working at the bleeding edge of the web.
            </p>
         </div>

         <TeamCards />

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left pt-20">
            <div className="p-8 border border-white/10 rounded-xl bg-white/5">
              <h3 className="text-2xl font-bold mb-4 text-horizn-accent">Strategy</h3>
              <p className="text-sm text-white/70">Brand positioning, market analysis, and digital transformation roadmaps.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5">
              <h3 className="text-2xl font-bold mb-4 text-horizn-accent">Design</h3>
              <p className="text-sm text-white/70">UI/UX, 3D Asset Creation, Motion Graphics, and Visual Identity.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-xl bg-white/5">
              <h3 className="text-2xl font-bold mb-4 text-horizn-accent">Development</h3>
              <p className="text-sm text-white/70">WebGL, React/Next.js, GLSL Shaders, and High-performance Creative Coding.</p>
            </div>
         </div>
       </div>
    </div>
  );
};