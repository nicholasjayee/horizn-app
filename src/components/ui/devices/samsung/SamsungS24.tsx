import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const SamsungS24: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      <div className="relative w-full aspect-[9/20] rounded-[2rem] border-[4px] border-gray-800 bg-gray-900 shadow-2xl box-border">
        {/* Screen */}
        <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-black relative">
          
          {/* Punch Hole */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-20 border border-gray-800/50 shadow-inner" />

          {/* Content */}
          <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
            {children}
          </div>
          
          {/* Reflection */}
          <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-30" />
        </div>

        {/* Buttons */}
        <div className="absolute top-32 -right-[6px] w-[2px] h-10 bg-gray-700 rounded-r-md" />
        <div className="absolute top-48 -right-[6px] w-[2px] h-8 bg-gray-700 rounded-r-md" />
      </div>
    </div>
  );
};