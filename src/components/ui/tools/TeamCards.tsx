import React from 'react';
import { TEAM_MEMBERS } from '../../../data/mockData';

export const TeamCards: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8 perspective-1000">
      {TEAM_MEMBERS.map((member) => (
        <div key={member.id} className="group w-64 h-80 [perspective:1000px] cursor-pointer">
          <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            
            {/* Front */}
            <div className="absolute inset-0 w-full h-full bg-horizn-dark border border-white/10 rounded-xl overflow-hidden [backface-visibility:hidden]">
              <div className="h-4/5 w-full relative">
                 <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-horizn-dark to-transparent opacity-80" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-xl font-bold">{member.name}</h4>
                <p className="text-xs text-horizn-accent font-mono">{member.role}</p>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 w-full h-full bg-horizn-accent [transform:rotateY(180deg)] [backface-visibility:hidden] rounded-xl overflow-hidden">
               <video src={member.video} autoPlay muted loop className="w-full h-full object-cover mix-blend-multiply grayscale" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="bg-black text-white font-mono px-3 py-1 text-sm rounded-full">
                    VIEW PORTFOLIO
                 </span>
               </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};