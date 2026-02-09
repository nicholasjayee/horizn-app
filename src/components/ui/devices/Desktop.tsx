import React from 'react';
import { DesktopMonitor } from './desktop/DesktopMonitor';

export const Desktop: React.FC<{ children: React.ReactNode, className?: string, scale?: number }> = ({ 
  children, className, scale 
}) => {
  const containerClass = `w-[800px] ${className || ''}`;
  return <DesktopMonitor className={containerClass} scale={scale}>{children}</DesktopMonitor>;
};