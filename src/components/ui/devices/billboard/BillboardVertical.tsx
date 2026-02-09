import React from 'react';

interface DeviceProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const BillboardVertical: React.FC<DeviceProps> = ({ children, className = "", scale = 1 }) => {
  return (
    <div className={`relative flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      {/* Frame */}
      <div className="relative w-full aspect-[9/16] rounded-xl border-[12px] border-gray-800 bg-gray-900 shadow-2xl ring-1 ring-white/10 box-border z-10">
        <div className="w-full h-full bg-black relative overflow-hidden rounded-lg">
          {/* Content */}
          <div className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
            {children}
          </div>
          {/* Glare */}
          <div className="pointer-events-none absolute top-0 right-0 w-full h-2/3 bg-gradient-to-b from-white/10 to-transparent opacity-30" />
          {/* Glass reflection hint */}
          <div className="pointer-events-none absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12" />
        </div>
      </div>

      {/* Stand (Totem Style) */}
      <div className="w-[60%] h-24 bg-gradient-to-b from-gray-800 to-gray-900 -mt-2 rounded-b-xl shadow-xl border-x border-b border-gray-700 flex flex-col items-center justify-end pb-4">
         <div className="w-12 h-1 bg-gray-700 rounded-full" />
      </div>
      <div className="w-[80%] h-4 bg-black/50 blur-xl -mt-2 rounded-[100%]" /> {/* Shadow */}
    </div>
  );
};