import React from 'react';
import { SamsungS24 } from './samsung/SamsungS24';
import { SamsungA22 } from './samsung/SamsungA22';
import { SamsungS22Ultra } from './samsung/SamsungS22Ultra';

export const Samsung: React.FC<{ type?: 's24' | 'a22' | 's22-ultra', children: React.ReactNode, className?: string, scale?: number }> = ({ 
  type = 's24', children, className, scale 
}) => {
  const containerClass = `w-[300px] ${className || ''}`;

  if (type === 'a22') {
    return <SamsungA22 className={containerClass} scale={scale}>{children}</SamsungA22>;
  }
  if (type === 's22-ultra') {
    return <SamsungS22Ultra className={containerClass} scale={scale}>{children}</SamsungS22Ultra>;
  }
  // Default to S24
  return <SamsungS24 className={containerClass} scale={scale}>{children}</SamsungS24>;
};