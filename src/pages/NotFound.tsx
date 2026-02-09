import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore, AppStage } from '../store/useStore';

export const NotFound: React.FC = () => {
  const setStage = useStore(state => state.setStage);

  // Set to IDEA stage to show the wireframe knot in the background
  useEffect(() => {
    setStage(AppStage.IDEA);
  }, [setStage]);

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-6 pt-40">
       <h1 className="text-[10rem] leading-none font-bold text-white/5 select-none font-mono">404</h1>
       <div className="relative -mt-16 mb-8">
         <h2 className="text-3xl md:text-5xl font-bold mb-4">Lost in the Void?</h2>
         <p className="text-white/60 max-w-md mx-auto">
           The coordinates you are looking for do not exist in this reality.
         </p>
       </div>
       
       <Link 
         to="/" 
         className="group relative inline-flex items-center gap-2 px-8 py-3 border border-horizn-accent text-horizn-accent hover:bg-horizn-accent hover:text-black transition-all rounded uppercase font-bold tracking-widest text-sm"
       >
         <span>Initialize Reset</span>
         <span className="group-hover:translate-x-1 transition-transform">→</span>
       </Link>
    </div>
  );
};