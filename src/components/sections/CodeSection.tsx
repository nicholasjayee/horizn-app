import React from 'react';
import { Section } from '../ui/Section';

interface CodeSectionProps {
  onEnter: () => void;
}

export const CodeSection: React.FC<CodeSectionProps> = ({ onEnter }) => {
  return (
    <Section id="code" onEnter={onEnter} className="items-start">
      <div className="max-w-xl text-left">
         <h2 className="text-5xl font-bold mb-4">Architecture &<br/>Engineering</h2>
         <p className="text-lg text-white/70 mb-8 leading-relaxed">
           We build robust, scalable digital infrastructures. Not just pretty faces, but powerful machines driven by clean, performant code.
         </p>
         <div className="flex gap-4">
           <div className="bg-white/10 px-4 py-2 rounded-full font-mono text-xs border border-white/5">React</div>
           <div className="bg-white/10 px-4 py-2 rounded-full font-mono text-xs border border-white/5">TypeScript</div>
           <div className="bg-white/10 px-4 py-2 rounded-full font-mono text-xs border border-white/5">WebGL</div>
         </div>
      </div>
    </Section>
  );
};