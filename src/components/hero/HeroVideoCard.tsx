import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';

export interface HeroVideoCardProps {
  className?: string;
}

/**
 * Translucent Glassmorphic Video Card
 * Displays the Olympia Fitness intro video with a glowing orange play trigger,
 * inline playback controls, and glassmorphic styling matching the reference mockup.
 */
export const HeroVideoCard: React.FC<HeroVideoCardProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <>
      <div
        onClick={togglePlay}
        className={`group/vid relative w-64 sm:w-72 md:w-84 aspect-[16/10] rounded-2xl sm:rounded-3xl bg-black/60 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer transition-all duration-300 hover:border-brand-volt/60 hover:shadow-glow-volt/30 ${className}`}
      >
        {/* Background Video Player */}
        <video
          ref={videoRef}
          src={ASSET_MANIFEST.hero.introVideo.path}
          playsInline
          loop
          muted={isMuted}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-center filter brightness-90 group-hover/vid:brightness-100 transition-all duration-500"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Center Glowing Orange Play/Pause Trigger */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-volt text-white flex items-center justify-center shadow-glow-volt group-hover/vid:scale-110 transition-all duration-300 ${
              isPlaying ? 'opacity-0 group-hover/vid:opacity-90' : 'opacity-100'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white" />
            ) : (
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white translate-x-0.5" />
            )}
          </div>
        </div>

        {/* Bottom Micro Bar with Mute & Expand Actions */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white/80 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-volt">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-volt animate-pulse" />
            <span>INTRO VIDEO</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:text-brand-volt hover:border-brand-volt transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              aria-label="Expand video modal"
              className="p-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:text-brand-volt hover:border-brand-volt transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Video Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-brand-volt/40 shadow-glow-volt bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={ASSET_MANIFEST.hero.introVideo.path}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};
