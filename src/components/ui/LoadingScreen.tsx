import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { suspend } from 'suspend-react';
import { AnimatePresence, motion } from 'framer-motion';

// Simulate a critical system check or asset preparation using suspend-react
// This ensures the loader stays up for at least a small duration to look cool
const systemCheck = () => new Promise<void>((resolve) => setTimeout(resolve, 1200));

export const LoadingScreen: React.FC = () => {
  const { progress, active } = useProgress();
  const [finished, setFinished] = useState(false);

  // Trigger suspend to ensure boot sequence runs on every mount (page load)
  try {
     suspend(systemCheck, ['boot-sequence-' + Math.random()]);
  } catch (e) {
     // suspend throws a promise
  }

  useEffect(() => {
    // Reset finished state on mount
    setFinished(false);
    
    // Only finish when progress is 100 AND we aren't active
    // We also add a small delay to ensure the animation plays out
    if (progress === 100 && !active) {
       const timer = setTimeout(() => setFinished(true), 1500);
       return () => clearTimeout(timer);
    }
  }, [progress, active]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-horizn-black flex flex-col items-center justify-center font-mono pointer-events-none"
        >
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-xs text-horizn-accent/70 uppercase">
               <span>System Boot</span>
               <span>v2.0.24</span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-white/10 overflow-hidden relative">
               <motion.div 
                 className="absolute top-0 bottom-0 left-0 bg-horizn-accent"
                 initial={{ width: 0 }}
                 animate={{ width: `${Math.max(progress, 5)}%` }}
                 transition={{ type: "spring", stiffness: 50 }}
               />
            </div>

            <div className="flex justify-between text-xs text-white/50">
               <span>LOADING ASSETS...</span>
               <span>{Math.round(progress)}%</span>
            </div>
            
            {/* Decorative Matrix-like text */}
            <div className="pt-8 text-[10px] text-white/20 leading-tight h-20 overflow-hidden">
                {progress < 30 && <p>INITIALIZING CORE KERNEL...</p>}
                {progress > 30 && progress < 60 && <p>LOADING GEOMETRY BUFFERS...</p>}
                {progress > 60 && progress < 90 && <p>COMPILING SHADERS...</p>}
                {progress > 90 && <p>READY TO LAUNCH.</p>}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};