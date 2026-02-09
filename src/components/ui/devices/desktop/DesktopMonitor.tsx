import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const DesktopMonitor: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      {/* Screen Frame */}
      <div className="relative w-full aspect-[16/9] rounded-lg border-[10px] border-gray-900 bg-gray-900 shadow-2xl box-border">
        <div className="w-full h-full bg-black relative overflow-hidden">
          {/* Content */}
          <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
            {children}
          </div>
          {/* Glare */}
          <div className="pointer-events-none absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-30" />
        </div>
      </div>

      {/* Stand */}
      <div className="flex flex-col items-center w-full">
        <div className="w-24 h-16 bg-gradient-to-b from-gray-800 to-gray-900" />
        <div className="w-48 h-2 bg-gray-800 rounded-full shadow-lg" />
      </div>
    </div>
  );
};