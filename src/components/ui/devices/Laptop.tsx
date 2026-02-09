import React from 'react';
import { MacbookPro } from './laptop/MacbookPro';

export const Laptop: React.FC<{ children: React.ReactNode, className?: string, scale?: number }> = ({ 
  children, className, scale 
}) => {
  const containerClass = `w-[600px] ${className || ''}`;
  return <MacbookPro className={containerClass} scale={scale}>{children}</MacbookPro>;
};