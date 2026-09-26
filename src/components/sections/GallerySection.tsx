import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Layers } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { DriftWall } from '../gallery/DriftWall';
import { LightboxModal } from '../gallery/LightboxModal';
import { OUR_WORLD_IMAGES, type OurWorldImageItem } from '../../data/ourWorldGallery';

export const GallerySection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive column and tile sizing for 3D DriftWall
  const [wallConfig, setWallConfig] = useState({
    columns: 5,
    tileWidth: 230,
    tileHeight: 152,
    gap: 16,
  });

  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setWallConfig({
          columns: 3,
          tileWidth: 170,
          tileHeight: 115,
          gap: 12,
        });
      } else if (width < 1024) {
        setWallConfig({
          columns: 4,
          tileWidth: 200,
          tileHeight: 135,
          gap: 14,
        });
      } else {
        setWallConfig({
          columns: 5,
          tileWidth: 230,
          tileHeight: 152,
          gap: 16,
        });
      }
    };

    updateConfig();
    window.addEventListener('resize', updateConfig, { passive: true });
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  const handleOpenLightbox = (_item: OurWorldImageItem, index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 md:py-40 bg-[#08090A] overflow-hidden border-t border-brand-border/60 select-none"
    >
      {/* 1. Ambient Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-[550px] h-[550px] rounded-full bg-[#FF5E1E]/8 filter blur-[150px]" />
        <div className="absolute bottom-1/4 -right-48 w-[550px] h-[550px] rounded-full bg-brand-volt/8 filter blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                // 07. OUR WORLD
              </span>
              <StatusBadge status="VERIFIED" label="Real Gym Archive" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
              OUR WORLD.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt via-[#FFA034] to-[#FF5E1E]">
                RAW &amp; AUTHENTIC.
              </span>
            </h2>

            {/* Subtext */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-brand-text-secondary leading-relaxed font-light max-w-2xl">
              An unvarnished look inside SN Olympia. Explore our dedicated athletes, commercial heavy iron arsenal, community milestones, and everyday training grind in Yemmiganur.
            </p>
          </div>

          {/* Interactive Hint Indicator */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-brand-text-muted self-start md:self-end backdrop-blur-md">
            <Maximize2 className="w-3.5 h-3.5 text-[#FF5E1E]" />
            <span>Click any tile to inspect in full resolution</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive 3D DriftWall Canvas Container */}
      <div className="relative w-full h-[580px] sm:h-[660px] md:h-[740px] lg:h-[800px] border-y border-white/5 bg-gradient-to-b from-[#08090A] via-[#0B0C10] to-[#08090A] shadow-2xl">
        <DriftWall
          items={OUR_WORLD_IMAGES}
          columns={wallConfig.columns}
          tileWidth={wallConfig.tileWidth}
          tileHeight={wallConfig.tileHeight}
          gap={wallConfig.gap}
          radius={14}
          tilt={14}
          turn={-12}
          roll={0}
          perspective={1200}
          depth={110}
          speed={38}
          direction="up"
          variance={0.45}
          parallax={0.55}
          pauseOnHover={false}
          lift={64}
          fade={0.5}
          dim={0.55}
          grayscale={false}
          overlayColor="#08090A"
          onItemClick={handleOpenLightbox}
        />
      </div>

      {/* 3. Fullscreen High-Resolution Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={OUR_WORLD_IMAGES}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setCurrentIndex(newIndex)}
      />
    </section>
  );
};
