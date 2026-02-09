import React, { useRef } from 'react';

interface VideoScrubberProps {
  image: string;
  video: string;
  title: string;
  category: string;
}

export const VideoScrubber: React.FC<VideoScrubberProps> = ({ image, video, title, category }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    const duration = videoRef.current.duration || 10;
    if (isFinite(duration)) {
        videoRef.current.currentTime = percent * duration;
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <div 
      className="group relative w-full aspect-video rounded-lg overflow-hidden border border-white/5 bg-horizn-dark cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fallback Image */}
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
      
      {/* Video Element */}
      <video 
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
        <p className="text-xs text-horizn-accent font-mono mb-1">{category}</p>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white/50 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
        SCRUB TO PREVIEW
      </div>
    </div>
  );
};