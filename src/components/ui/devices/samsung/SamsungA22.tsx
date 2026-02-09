import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const SamsungA22: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      <div className="relative w-full aspect-[9/20] rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-800 shadow-2xl box-border">
        {/* Screen */}
        <div className="w-full h-full rounded-[2.1rem] overflow-hidden bg-black relative">
          
          {/* Teardrop Notch (Infinity-U) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-5 bg-black rounded-b-xl z-20 flex justify-center">
             <div className="w-2 h-2 mt-1 bg-[#101010] rounded-full opacity-50" />
          </div>

          {/* Content */}
          <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
            {children}
          </div>
          
          {/* Reflection */}
          <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-30" />
        </div>

        {/* Buttons - A series often has volume on right too */}
        <div className="absolute top-28 -right-[8px] w-[2px] h-12 bg-gray-700 rounded-r-md" /> {/* Power/Fingerprint */}
        <div className="absolute top-14 -right-[8px] w-[2px] h-10 bg-gray-700 rounded-r-md" /> {/* Volume */}
      </div>
    </div>
  );
};