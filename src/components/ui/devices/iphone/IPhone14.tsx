import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const IPhone14: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      <div className="relative w-full aspect-[9/19.5] rounded-[3rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl box-border">
        {/* Screen */}
        <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-black relative">
          
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-20 flex justify-center items-start pt-1">
             <div className="w-12 h-1 bg-[#1a1a1a] rounded-full opacity-30" />
          </div>

          {/* Content */}
          <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
            {children}
          </div>
          
          {/* Reflection */}
          <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-30" />
        </div>

        {/* Buttons */}
        <div className="absolute top-24 -right-[10px] w-[2px] h-12 bg-gray-700 rounded-r-md" />
        <div className="absolute top-24 -left-[10px] w-[2px] h-8 bg-gray-700 rounded-l-md" />
        <div className="absolute top-36 -left-[10px] w-[2px] h-8 bg-gray-700 rounded-l-md" />
      </div>
    </div>
  );
};