import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const BillboardStandard: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      
      {/* Lights Rigging */}
      <div className="absolute -top-16 w-full max-w-[90%] flex justify-between px-8 z-20 pointer-events-none">
         {[1,2,3,4].map(i => (
             <div key={i} className="relative flex flex-col items-center">
                 {/* Arm */}
                 <div className="w-2 h-8 bg-gray-800 -mb-2" />
                 {/* Fixture Head */}
                 <div className="w-12 h-8 bg-black rounded-sm border border-gray-700 shadow-xl relative z-10 flex items-end justify-center pb-1">
                    <div className="w-8 h-1 bg-white blur-[2px]" />
                 </div>
                 {/* Light Cone (Volumetric) */}
                 <div className="absolute top-[90%] left-1/2 -translate-x-1/2 w-40 h-80 bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-2xl opacity-40 mix-blend-screen" 
                      style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }} />
             </div>
         ))}
      </div>

      {/* Main Frame */}
      <div className="relative w-full aspect-[2.5/1] bg-gray-900 rounded-sm border-[12px] border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-10">
        {/* Outer Bezel details */}
        <div className="absolute inset-0 border border-white/10 opacity-50 rounded-sm pointer-events-none" />
        
        {/* Screen Area */}
        <div className="w-full h-full bg-black border-4 border-black relative overflow-hidden">
            
            {/* LED Pixel Grid Effect */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-[size:3px_3px] bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] opacity-30" />
            <div className="absolute inset-0 z-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            
            {/* Content Container */}
            <div className="w-full h-full relative z-10">
                {children}
            </div>

            {/* Glass Reflections */}
            <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 skew-x-12" />
        </div>

        {/* Bottom Logo Plate */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 px-6 py-1 rounded-b-lg border-x border-b border-gray-700 shadow-lg">
             <div className="text-[10px] font-black tracking-[0.3em] text-gray-500/50 uppercase">Horizn Outdoor</div>
        </div>
      </div>

      {/* Support Pillar */}
      <div className="w-32 h-48 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 -mt-2 relative -z-10 border-x-2 border-gray-950 flex flex-col items-center">
          {/* Rivets/Details */}
          <div className="w-full h-full flex flex-col justify-evenly opacity-20">
              <div className="w-full h-px bg-black" />
              <div className="w-full h-px bg-black" />
              <div className="w-full h-px bg-black" />
          </div>
      </div>

    </div>
  );
};