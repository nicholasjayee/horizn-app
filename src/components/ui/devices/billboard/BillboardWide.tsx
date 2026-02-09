import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const BillboardWide: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      {/* Top Bar / Lights */}
      <div className="w-[95%] h-2 flex justify-between px-10 md:px-20 mb-1 z-10">
         {[1,2,3,4,5,6].map(i => (
             <div key={i} className="w-2 h-4 bg-gray-700 relative flex justify-center">
                 <div className="w-6 h-2 bg-gray-600 absolute bottom-full rounded-t-sm" />
                 {/* Light cone */}
                 <div className="absolute top-full left-1/2 -translate-x-1/2 w-12 h-32 bg-gradient-to-b from-white/10 to-transparent blur-md pointer-events-none" />
             </div>
         ))}
      </div>

      {/* Frame */}
      <div className="relative w-full aspect-[4/1] rounded-sm border-y-[15px] border-x-[5px] border-gray-900 bg-gray-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/5 box-border">
        <div className="w-full h-full bg-black relative overflow-hidden">
          {/* Content */}
          <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
            {children}
          </div>
          
          {/* Scanlines for that 'digital highway sign' look */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] opacity-20" />
          
          {/* Glare */}
          <div className="pointer-events-none absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/5 to-transparent skew-x-12 opacity-20" />
        </div>
      </div>
      
      {/* Support Structure */}
      <div className="w-full flex justify-center gap-24 md:gap-48 -mt-1 relative -z-10">
          <div className="w-10 h-32 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-x border-gray-900" />
          <div className="w-10 h-32 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-x border-gray-900" />
      </div>
    </div>
  );
};