import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Maximize2, Sparkles } from 'lucide-react';
import { ASSET_MANIFEST } from '../../data/assets';
import type { AssetMeta } from '../../data/assets';
import { LightboxModal } from '../gallery/LightboxModal';

export const GallerySection: React.FC = () => {
  const galleryImages: AssetMeta[] = ASSET_MANIFEST.gallery;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-brand-surface/20 overflow-hidden border-t border-brand-border/60">
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-brand-volt/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
              <Camera className="w-3.5 h-3.5" />
              Visual Archive
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              RAW STEEL.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-emerald-400">
                CHALK DUST.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
              An unvarnished look into the texture, intensity, and equipment that shape everyday training at SN Olympia.
            </p>
          </div>

          <div className="text-xs font-mono text-brand-text-muted">
            Click any frame to inspect high-resolution details
          </div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
          {galleryImages.map((image, index) => {
            // Asymmetrical grid column spans for editorial feel
            // Image 0: span 5 (1:1 macro knurling)
            // Image 1: span 7 (4:3 chalk clap)
            // Image 2: span 7 (16:9 free weights)
            // Image 3: span 5 (3:2 deadlift lift)
            const colSpan =
              index === 0
                ? 'lg:col-span-5'
                : index === 1
                ? 'lg:col-span-7'
                : index === 2
                ? 'lg:col-span-7'
                : 'lg:col-span-5';

            const heightClass =
              index === 0
                ? 'h-80 sm:h-96'
                : index === 1
                ? 'h-80 sm:h-96'
                : index === 2
                ? 'h-72 sm:h-88'
                : 'h-72 sm:h-88';

            return (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${colSpan} group relative rounded-2xl overflow-hidden border border-brand-border/70 bg-brand-surface cursor-pointer shadow-lg hover:border-brand-volt/60 transition-all duration-300`}
                onClick={() => handleOpenLightbox(index)}
              >
                <div className={`w-full ${heightClass} overflow-hidden relative`}>
                  <img
                    src={image.path}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Expand Icon Badge */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-brand-dark/80 backdrop-blur-md border border-brand-border text-white group-hover:bg-brand-volt group-hover:text-brand-dark transition-colors duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="font-mono text-[10px] text-brand-volt uppercase tracking-wider block mb-1">
                      PHOTO 0{index + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight group-hover:text-brand-volt transition-colors">
                      {image.alt}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={galleryImages}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIndex) => setCurrentIndex(newIndex)}
      />
    </section>
  );
};
