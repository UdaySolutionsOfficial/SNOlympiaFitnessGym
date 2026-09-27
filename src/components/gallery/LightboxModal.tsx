import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { AssetMeta } from '../../data/assets';

export interface LightboxModalProps {
  isOpen: boolean;
  images: AssetMeta[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  const currentImage = images[currentIndex];

  // Handle keyboard events (Escape, ArrowLeft, ArrowRight) and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery viewer"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
        />

        {/* Modal Content Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-brand-surface/90 border border-brand-border/80 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border/60 bg-brand-surface">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-brand-volt">
                IMAGE {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
              <span className="text-brand-border">•</span>
              <span className="text-xs text-brand-text-muted truncate max-w-[200px] sm:max-w-md">
                {currentImage.alt}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close image viewer"
              className="p-2 rounded-lg bg-brand-charcoal text-brand-text-secondary hover:text-white hover:bg-brand-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Display */}
          <div className="relative flex-1 min-h-[300px] max-h-[65vh] flex items-center justify-center bg-black/60 p-4 select-none">
            <img
              key={currentImage.id}
              src={currentImage.path}
              alt={currentImage.alt}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
            />

            {/* Left Nav Button */}
            <button
              onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-dark/70 hover:bg-brand-volt hover:text-brand-dark text-white border border-brand-border/60 transition-all backdrop-blur-md shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={() => onNavigate((currentIndex + 1) % images.length)}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-dark/70 hover:bg-brand-volt hover:text-brand-dark text-white border border-brand-border/60 transition-all backdrop-blur-md shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="px-6 py-4 bg-brand-surface/90 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
            <p className="text-brand-text-secondary font-light">
              {currentImage.description}
            </p>
            <div className="text-[11px] font-mono text-brand-text-muted">
              Use <kbd className="px-1.5 py-0.5 rounded bg-brand-charcoal border border-brand-border text-brand-volt">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-brand-charcoal border border-brand-border text-brand-volt">→</kbd> to navigate, <kbd className="px-1.5 py-0.5 rounded bg-brand-charcoal border border-brand-border text-brand-volt">Esc</kbd> to exit
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
