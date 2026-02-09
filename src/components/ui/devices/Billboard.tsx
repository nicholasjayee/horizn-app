import React from 'react';
import { BillboardStandard } from './billboard/BillboardStandard';
import { BillboardVertical } from './billboard/BillboardVertical';
import { BillboardWide } from './billboard/BillboardWide';

export const Billboard: React.FC<{ type?: 'standard' | 'vertical' | 'wide', children: React.ReactNode, className?: string, scale?: number }> = ({ 
  type = 'standard', children, className, scale 
}) => {
  const containerClass = `w-full max-w-[900px] ${className || ''}`;
  
  if (type === 'vertical') {
    // Vertical usually needs a narrower container naturally, but we keep max-width constraints
    return <BillboardVertical className={`w-full max-w-[400px] ${className || ''}`} scale={scale}>{children}</BillboardVertical>;
  }

  if (type === 'wide') {
    return <BillboardWide className={containerClass} scale={scale}>{children}</BillboardWide>;
  }

  return <BillboardStandard className={containerClass} scale={scale}>{children}</BillboardStandard>;
};