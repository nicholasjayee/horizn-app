import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useStore, AppStage } from '../store/useStore';
import { PROJECTS } from '../data/mockData';
import { VideoScrubber } from '../components/ui/tools/VideoScrubber';
import { SceneContainer } from '../components/3d/SceneContainer';
import { Experience } from '../components/3d/Experience';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Work: React.FC = () => {
  const setStage = useStore(state => state.setStage);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStage(AppStage.PRODUCT);
  }, [setStage]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main title on load
      gsap.fromTo('.work-title',
        { y: 100, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.5, ease: "power4.out" }
      );

      // Animate project cards with scroll scrubbing
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card: any, i) => {
        gsap.fromTo(card,
          { 
            y: 150, 
            opacity: 0, 
            scale: 0.9,
            transformPerspective: 1000,
            rotateX: 15
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
              start: "top 95%", // Start animation when top of card hits bottom 5% of viewport
              end: "top 60%",   // End animation when top of card hits 60% of viewport
              scrub: 1,         // Smooth scrubbing effect
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // Animate footer text
      gsap.fromTo('.work-footer',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: '.work-footer',
            start: "top 90%",
            end: "bottom bottom",
            scrub: 1
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SceneContainer>
        <Experience />
      </SceneContainer>

      <div ref={containerRef} className="w-full min-h-screen p-6 md:p-20 pt-32 perspective-1000">
          <div className="w-full max-w-7xl mx-auto space-y-12">
              <div className="overflow-hidden">
                <h1 className="work-title text-6xl md:text-8xl font-bold tracking-tighter mb-12 origin-top-left transform-style-3d">
                  SELECTED<br/> <span className="text-horizn-accent">WORK</span>
                </h1>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {PROJECTS.map((project, index) => (
                  <div key={project.id} className="project-card will-change-transform">
                    <VideoScrubber {...project} />
                  </div>
                ))}
              </div>
              
              <div className="work-footer pt-20 border-t border-white/10 mt-20">
                <p className="text-xl text-white/60 max-w-2xl">
                  Our portfolio spans across fintech, fashion, and futuristic interfaces. We don't just build websites; we build worlds.
                </p>
              </div>
          </div>
      </div>
    </>
  );
};