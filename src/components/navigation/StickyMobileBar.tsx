import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';

export interface StickyMobileBarProps {
  onJoinClick?: () => void;
  isModalOpen?: boolean;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onJoinClick,
  isModalOpen = false,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past the hero (e.g. > 350px)
      // and hide when near the very bottom footer
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const nearBottom = scrollY + windowHeight >= docHeight - 200;

      if (scrollY > 350 && !nearBottom && !isModalOpen) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isModalOpen]);

  const handleWhatsApp = () => {
    const text = encodeURIComponent('Hi Olympia Fitness Team, I want to inquire about gym membership and batch timings.');
    window.open(`https://wa.me/919533779533?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-dark/95 backdrop-blur-xl border-t border-brand-border/80 px-4 py-3 shadow-2xl pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
        >
          <div className="flex items-center gap-2 max-w-md mx-auto">
            {/* Call Action */}
            <a
              href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
              aria-label="Call Olympia Fitness"
              className="flex-1 py-2.5 px-3 rounded-xl bg-brand-charcoal border border-brand-border text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 active:bg-brand-surface"
            >
              <Phone className="w-3.5 h-3.5 text-brand-volt" />
              <span>CALL</span>
            </a>

            {/* WhatsApp Action */}
            <button
              onClick={handleWhatsApp}
              aria-label="WhatsApp Olympia Fitness"
              className="flex-1 py-2.5 px-3 rounded-xl bg-brand-charcoal border border-brand-border text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 active:bg-brand-surface"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WHATSAPP</span>
            </button>

            {/* Join CTA */}
            <button
              onClick={onJoinClick}
              aria-label="Join Olympia Fitness"
              className="flex-[1.4] py-2.5 px-3 rounded-xl bg-brand-volt text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 shadow-glow-volt active:scale-95 transition-transform"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
