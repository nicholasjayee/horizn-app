import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { suspend } from 'suspend-react';
import { AnimatePresence, motion } from 'framer-motion';

// Simulate a critical system check or asset preparation using suspend-react
// This ensures the loader stays up for at least a small duration to look cool
const systemCheck = () => new Promise<void>((resolve) => setTimeout(resolve, 2000));

export const LoadingScreen: React.FC = () => {
  const { progress, active } = useProgress();
  const [finished, setFinished] = useState(false);

  // Trigger suspend to ensure boot sequence runs once
  try {
     suspend(systemCheck, ['boot-sequence']);
  } catch (e) {
     // suspend throws a promise
  }

  useEffect(() => {
    // Only finish when progress is 100 AND we aren't active
    if (progress === 100 && !active) {
       const timer = setTimeout(() => setFinished(true), 1500); // 1.5s delay after load for effect
       return () => clearTimeout(timer);
    }
    if (active) {
        setFinished(false);
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