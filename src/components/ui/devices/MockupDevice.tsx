import React from 'react';
import { IPhone15 } from './iphone/IPhone15';
import { IPhone14 } from './iphone/IPhone14';
import { SamsungS24 } from './samsung/SamsungS24';
import { SamsungA22 } from './samsung/SamsungA22';
import { SamsungS22Ultra } from './samsung/SamsungS22Ultra';
import { MacbookPro } from './laptop/MacbookPro';
import { DesktopMonitor } from './desktop/DesktopMonitor';
import { BillboardStandard } from './billboard/BillboardStandard';
import { BillboardVertical } from './billboard/BillboardVertical';
import { BillboardWide } from './billboard/BillboardWide';

export type DeviceType = 
  | 'iphone-14' | 'iphone-15' | 'iphone-17' 
  | 'samsung-s24' | 'samsung-a22' | 'samsung-s22-ultra'
  | 'laptop-macbook' 
  | 'desktop-monitor'
  | 'billboard-standard' | 'billboard-vertical' | 'billboard-wide';

interface MockupProps {
  type: DeviceType;
  children: React.ReactNode;
  className?: string;
  scale?: number;
}

export const MockupDevice: React.FC<MockupProps> = ({ type, children, className, scale }) => {
  switch (type) {
    case 'iphone-17':
    case 'iphone-15':
      return <IPhone15 className={className} scale={scale}>{children}</IPhone15>;
    case 'iphone-14':
      return <IPhone14 className={className} scale={scale}>{children}</IPhone14>;
    case 'samsung-s24':
      return <SamsungS24 className={className} scale={scale}>{children}</SamsungS24>;
    case 'samsung-a22':
      return <SamsungA22 className={className} scale={scale}>{children}</SamsungA22>;
    case 'samsung-s22-ultra':
      return <SamsungS22Ultra className={className} scale={scale}>{children}</SamsungS22Ultra>;
    case 'laptop-macbook':
      return <MacbookPro className={className} scale={scale}>{children}</MacbookPro>;
    case 'desktop-monitor':
      return <DesktopMonitor className={className} scale={scale}>{children}</DesktopMonitor>;
    case 'billboard-standard':
      return <BillboardStandard className={className} scale={scale}>{children}</BillboardStandard>;
    case 'billboard-vertical':
      return <BillboardVertical className={className} scale={scale}>{children}</BillboardVertical>;
    case 'billboard-wide':
      return <BillboardWide className={className} scale={scale}>{children}</BillboardWide>;
    default:
      return <div className={className}>{children}</div>;
  }
};