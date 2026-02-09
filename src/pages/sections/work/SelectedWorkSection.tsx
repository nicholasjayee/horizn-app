import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SELECTED_WORKS } from '../../../data/works';
import { VideoScrubber } from '../../../components/ui/tools/VideoScrubber';

gsap.registerPlugin(ScrollTrigger);

export const SelectedWorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards with scroll scrubbing
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card: any, i) => {
        gsap.fromTo(card,
          { 
            y: 100, 
            opacity: 0, 
            scale: 0.95,
            rotateX: 5
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 70%",
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full pb-20 md:pb-32">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SELECTED_WORKS.map((project) => (
          <div key={project.id} className="project-card will-change-transform perspective-1000">
            <VideoScrubber 
                image={project.image} 
                video={project.video || ''} 
                title={project.title} 
                category={project.category} 
            />
            {project.services && (
                <div className="mt-3 flex flex-wrap gap-2 opacity-60">
                    {project.services.map(s => (
                        <span key={s} className="text-[10px] border border-white/20 rounded-full px-2 py-0.5 font-mono">{s}</span>
                    ))}
                </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};