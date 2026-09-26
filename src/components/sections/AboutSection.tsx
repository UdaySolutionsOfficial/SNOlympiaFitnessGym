import React, { useState, useRef } from 'react';
import { ASSET_MANIFEST } from '../../data/assets';
import { SITE_CONTENT } from '../../data/siteContent';
import { StatusBadge } from '../common/StatusBadge';
import { Shield, Target, Flame, Users2, MapPin, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export interface AboutSectionProps {
  className?: string;
}

/**
 * Editorial About Olympia Section
 * Communicates the true athletic ethos, unisex mandate, and local Yemmiganur roots.
 * Features auto-playing muted high-definition equipment video with customized timeline & audio controls.
 */
export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isScrubbingRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Time format helper (m:ss)
  const formatTime = (secs: number) => {
    if (isNaN(secs) || !isFinite(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Toggle Mute / Unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const nextMuted = !prev;
      if (videoRef.current) {
        videoRef.current.muted = nextMuted;
        videoRef.current.volume = nextMuted ? 0 : 1.0;
        if (!nextMuted) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      }
      return nextMuted;
    });
  };

  // Toggle Play / Pause
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying((prev) => {
      const nextState = !prev;
      if (videoRef.current) {
        if (nextState) videoRef.current.play().catch(() => {});
        else videoRef.current.pause();
      }
      return nextState;
    });
  };

  // Timeline Scrubber Handlers
  const handleTimelinePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !videoRef.current.duration) return;

    isScrubbingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = clickX / rect.width;
    const newTime = ratio * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimelinePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbingRef.current || !videoRef.current || !videoRef.current.duration) return;
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const ratio = clickX / rect.width;
    const newTime = ratio * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimelinePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isScrubbingRef.current) {
      e.stopPropagation();
      isScrubbingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const pillars = [
    {
      icon: <Target className="w-4 h-4 text-brand-volt" />,
      title: 'Biomechanical Form First',
      description: 'Strict attention to spine neutrality, joint tracking, and proper bar path before increasing loads.',
    },
    {
      icon: <Flame className="w-4 h-4 text-brand-volt" />,
      title: 'Progressive Overload',
      description: 'Systematic incremental resistance using commercial barbells, calibrated plates, and dumbbells.',
    },
    {
      icon: <Users2 className="w-4 h-4 text-brand-volt" />,
      title: 'Unisex Athletic Community',
      description: 'A dignified, encouraging environment engineered for both male and female fitness aspirants.',
    },
    {
      icon: <Shield className="w-4 h-4 text-brand-volt" />,
      title: 'Daily Batch Consistency',
      description: 'Structured morning and evening training windows to build lifelong physical momentum.',
    },
  ];

  return (
    <section
      id="about"
      className={`relative py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto ${className}`}
    >
      <div className="space-y-16">
        {/* Section Header with Eyebrow */}
        <div className="space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-brand-volt uppercase">
              // 01. ABOUT OLYMPIA FITNESS
            </span>
            <StatusBadge status="VERIFIED" label="Timmappa Colony Ground" />
          </div>

          <h2 className="text-fluid-section font-black uppercase text-white tracking-tighter leading-[1.02]">
            TRAINING IS NOT ONLY ABOUT HOW YOU LOOK.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-white">
              IT IS ABOUT HOW STRONG YOU FEEL.
            </span>
          </h2>
        </div>

        {/* Editorial 2-Column Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Narrative & Pillars */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 text-sm md:text-base text-brand-text-secondary leading-relaxed font-normal">
              <p>
                Established in the heart of Yemmiganur at <strong className="text-white">Timmappa Colony</strong> (Shiva Priya Theater Area), <strong className="text-white">SN Olympia Fitness</strong> was created to reject the vanity and distractions of modern commercial fitness lounges.
              </p>
              <p>
                We operate as a true athletic forge: heavy cast iron, solid steel racks, high-energy conditioning turf, and floor coaches who prioritize your biomechanical longevity. Whether you are lifting a barbell for the first time or chasing a personal record, every session is designed to make you physically resilient and mentally disciplined.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-brand-surface/70 border border-white/5 space-y-2 hover:border-brand-volt/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-volt/10 border border-brand-volt/20 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Location Hook */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-brand-surface/40 border border-white/5 text-xs text-brand-text-secondary">
              <MapPin className="w-4 h-4 text-brand-volt shrink-0" />
              <span>{SITE_CONTENT.brand.address.fullFormatted.value}</span>
            </div>
          </div>

          {/* Right Column: Wide Cinematic Interactive Equipment Video Player */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden bg-brand-surface/50 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group select-none">
              {/* High-Definition Auto-Looping Equipment Video */}
              <video
                ref={videoRef}
                src="/assets/videos/about-equipment.mp4"
                poster={ASSET_MANIFEST.about.gymAtmosphere.path}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={(e) => {
                  if (!isScrubbingRef.current) {
                    setCurrentTime(e.currentTarget.currentTime);
                  }
                }}
                onLoadedMetadata={(e) => {
                  setDuration(e.currentTarget.duration);
                }}
                className="w-full aspect-[16/10] object-cover object-center filter contrast-[1.05] brightness-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Cinematic Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40 pointer-events-none" />

              {/* Top Controls Bar: Equipment Tag & Speaker Sound Button */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                {/* Equipment Tag Badge */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider font-bold text-white uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-pulse" />
                  <span>EQUIPMENT ARSENAL</span>
                </div>

                {/* Speaker Sound Toggle (Always visible on touch, reveals on hover) */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-90 group-hover:opacity-100 ${
                    !isMuted
                      ? 'bg-[#FF5E1E] text-white shadow-[0_0_16px_rgba(255,94,30,0.9)] scale-105'
                      : 'bg-black/75 border border-white/25 text-white/80 hover:bg-[#FF5E1E] hover:text-white hover:border-[#FF5E1E]'
                  }`}
                >
                  {!isMuted ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Center Play/Pause Control (Smooth Fade on Hover) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className={`pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center text-white bg-black/60 border border-[#FF5E1E] backdrop-blur-md shadow-[0_0_30px_rgba(255,94,30,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 bg-[#FF5E1E]'
                  }`}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white text-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* Bottom Info Bar & Customized Interactive Timeline Scrubber */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-2 p-3 sm:p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-xl transition-all">
                {/* Title & Location Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] text-[#FF5E1E] font-bold block uppercase tracking-wider">
                      AUTHENTIC TRAINING FLOOR
                    </span>
                    <span className="font-bold text-white uppercase text-xs sm:text-sm">
                      Commercial Free Weights & Platforms
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-brand-text-muted font-bold">
                    YEMMIGANUR
                  </span>
                </div>

                {/* Customized Interactive Timeline Scrubber */}
                <div
                  className="flex flex-col gap-1 w-full select-none"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  {/* Scrubbing Track */}
                  <div
                    role="slider"
                    aria-label="Video timeline scrubber"
                    aria-valuemin={0}
                    aria-valuemax={duration || 100}
                    aria-valuenow={currentTime}
                    onPointerDown={handleTimelinePointerDown}
                    onPointerMove={handleTimelinePointerMove}
                    onPointerUp={handleTimelinePointerUp}
                    onPointerCancel={handleTimelinePointerUp}
                    className="group/timeline relative w-full h-3.5 flex items-center cursor-pointer touch-none"
                  >
                    {/* Background Track */}
                    <div className="w-full h-1 group-hover/timeline:h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-md transition-all">
                      {/* Filled Progress Bar */}
                      <div
                        className="h-full bg-gradient-to-r from-[#FF5E1E] via-[#FF7538] to-[#FFA034] rounded-full shadow-[0_0_8px_#FF5E1E]"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    {/* Scrubber Knob / Thumb */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#FF5E1E] shadow-[0_0_10px_rgba(255,94,30,1)] opacity-90 group-hover/timeline:opacity-100 group-hover/timeline:scale-125 transition-transform pointer-events-none"
                      style={{ left: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Time Stamps */}
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-white/70 px-0.5 leading-none">
                    <span className="text-[#FFA034]">{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
