import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Section: React.FC<{ 
  id: string; 
  className?: string; 
  children: React.ReactNode; 
  onEnter: () => void 
}> = ({ id, className, children, onEnter }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onEnterRef = useRef(onEnter);
  onEnterRef.current = onEnter;

  useEffect(() => {
    const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 60%", 
          end: "bottom 60%",
          onEnter: () => onEnterRef.current(),
          onEnterBack: () => onEnterRef.current(),
        });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={ref} 
      id={id} 
      className={`min-h-screen w-full flex flex-col justify-center items-center p-6 md:p-20 relative ${className}`}
    >
      {children}
    </section>
  );
};