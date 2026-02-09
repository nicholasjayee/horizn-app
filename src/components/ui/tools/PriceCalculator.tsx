import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const PriceCalculator: React.FC = () => {
  const [services, setServices] = useState({
    webDev: false,
    motion: false,
    modelling: false,
    strategy: false
  });
  const [timeline, setTimeline] = useState(1);
  const [total, setTotal] = useState(0);

  const baseRate = 5000;
  
  useEffect(() => {
    let cost = 0;
    if (services.webDev) cost += 8000;
    if (services.motion) cost += 5000;
    if (services.modelling) cost += 4000;
    if (services.strategy) cost += 3000;
    
    // Rush fee multiplier
    const multiplier = timeline < 4 ? 1.5 : 1;
    
    setTotal(cost * multiplier);
  }, [services, timeline]);

  const toggleService = (key: keyof typeof services) => {
    setServices(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-horizn-dark/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl w-full max-w-md mx-auto shadow-2xl">
      <h3 className="text-xl font-bold mb-6 font-mono border-b border-white/10 pb-4">
        Project Estimator
      </h3>

      <div className="space-y-4 mb-8">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-white/80 group-hover:text-white transition-colors">Web Development</span>
          <input type="checkbox" checked={services.webDev} onChange={() => toggleService('webDev')} className="w-5 h-5 accent-horizn-accent bg-transparent border-white/20 rounded" />
        </label>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-white/80 group-hover:text-white transition-colors">Motion Graphics</span>
          <input type="checkbox" checked={services.motion} onChange={() => toggleService('motion')} className="w-5 h-5 accent-horizn-accent" />
        </label>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-white/80 group-hover:text-white transition-colors">3D Modeling</span>
          <input type="checkbox" checked={services.modelling} onChange={() => toggleService('modelling')} className="w-5 h-5 accent-horizn-accent" />
        </label>
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-white/80 group-hover:text-white transition-colors">Brand Strategy</span>
          <input type="checkbox" checked={services.strategy} onChange={() => toggleService('strategy')} className="w-5 h-5 accent-horizn-accent" />
        </label>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-xs font-mono text-white/50 mb-2">
          <span>RUSH (2 Wks)</span>
          <span>STANDARD (8 Wks)</span>
        </div>
        <input 
          type="range" 
          min="2" 
          max="8" 
          step="1" 
          value={timeline} 
          onChange={(e) => setTimeline(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-horizn-accent"
        />
        <div className="text-center mt-2 text-sm text-horizn-accent">
          {timeline} Weeks
        </div>
      </div>

      <div className="flex justify-between items-end border-t border-white/10 pt-4">
        <span className="text-sm text-white/50 font-mono">ESTIMATED COST</span>
        <motion.span 
          key={total}
          {...({
            initial: { scale: 1.2, color: '#ffffff' },
            animate: { scale: 1, color: '#00ff88' }
          } as any)}
          className="text-3xl font-bold font-mono text-horizn-accent"
        >
          ${total > 0 ? total.toLocaleString() : '0'}
        </motion.span>
      </div>
    </div>
  );
};