import React from 'react';
import { IPhone15 } from './iphone/IPhone15';
import { IPhone14 } from './iphone/IPhone14';
import { IPhone13 } from './iphone/IPhone13';

export const IPhone: React.FC<{ type?: '13' | '13-pro' | '14' | '14-pro' | '15' | '17', children: React.ReactNode, className?: string, scale?: number }> = ({ 
  type = '17', children, className, scale 
}) => {
  const containerClass = `w-[300px] ${className || ''}`;
  
  if (type === '13' || type === '13-pro') {
    return <IPhone13 className={containerClass} scale={scale}>{children}</IPhone13>;
  }

  // Models with standard Notch
  if (type === '14') {
    return <IPhone14 className={containerClass} scale={scale}>{children}</IPhone14>;
  }
  
  // Models with Dynamic Island (14 Pro, 15, 17)
  return <IPhone15 className={containerClass} scale={scale}>{children}</IPhone15>;
};