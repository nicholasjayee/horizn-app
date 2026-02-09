import React from 'react';
import { IPhone15 } from './iphone/IPhone15';
import { IPhone14 } from './iphone/IPhone14';

export const IPhone: React.FC<{ type?: '14' | '15' | '17', children: React.ReactNode, className?: string, scale?: number }> = ({ 
  type = '17', children, className, scale 
}) => {
  const containerClass = `w-[300px] ${className || ''}`;
  
  if (type === '14') {
    return <IPhone14 className={containerClass} scale={scale}>{children}</IPhone14>;
  }
  // Default to 15 for 15/17
  return <IPhone15 className={containerClass} scale={scale}>{children}</IPhone15>;
};