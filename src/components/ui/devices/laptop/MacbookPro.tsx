import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const MacbookPro: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      {/* Lid / Screen */}
      <div className="relative w-full aspect-[16/10] rounded-t-xl rounded-b-md border-[12px] border-b-0 border-gray-800 bg-gray-800 shadow-2xl box-border">
        <div className="w-full h-full rounded-t-lg bg-black relative overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 w-32 bg-gray-800 rounded-b-lg z-20" />
          
          {/* Content */}
          <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
            {children}
          </div>

          {/* Glare */}
          <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-30" />
        </div>
      </div>

      {/* Base */}
      <div className="w-[120%] -ml-[10%] h-3 bg-gray-700 rounded-b-xl shadow-xl mt-0 relative z-10 flex justify-center">
         <div className="w-16 h-1 bg-gray-600 rounded-b-md" /> {/* Thumb groove */}
      </div>
    </div>
  );
};