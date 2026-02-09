import React from 'react';
import { Section } from '../ui/Section';

interface MotionSectionProps {
  onEnter: () => void;
}

export const MotionSection: React.FC<MotionSectionProps> = ({ onEnter }) => {
  return (
    <Section id="motion" onEnter={onEnter} className="items-end">
      <div className="max-w-xl text-right">
         <h2 className="text-5xl font-bold mb-4 text-horizn-accent">Fluid Motion</h2>
         <p className="text-lg text-white/70 mb-8 leading-relaxed">
           Static is boring. We breathe life into pixels with advanced rigging, physics simulations, and seamless transitions.
         </p>
         <button className="border border-horizn-accent text-horizn-accent px-8 py-3 rounded hover:bg-horizn-accent hover:text-black transition-all uppercase font-bold tracking-widest">
           See Animation Reel
         </button>
      </div>
    </Section>
  );
};