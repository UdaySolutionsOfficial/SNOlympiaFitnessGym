import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';
import { SITE_CONTENT, type FAQItem } from '../../data/siteContent';

export interface FAQSectionProps {
  onAskQuestion?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onAskQuestion }) => {
  const faqItems: FAQItem[] = SITE_CONTENT.faq;
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id || null);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-28 md:py-36 bg-brand-dark overflow-hidden border-t border-brand-border/60">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-brand-volt/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-volt/10 border border-brand-volt/30 text-brand-volt text-xs font-mono tracking-widest uppercase mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              EVERY DETAIL,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-volt to-amber-400">
                CLARIFIED.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-text-secondary leading-relaxed font-light">
              Clear answers to the most common questions regarding training shifts, floor supervision, admissions, and equipment standards.
            </p>
          </div>

          <button
            onClick={onAskQuestion}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-surface border border-brand-border text-xs font-mono font-bold uppercase tracking-wider text-brand-volt hover:border-brand-volt transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Have Another Question?</span>
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqItems.map((item: FAQItem, index: number) => {
            const isOpen = openId === item.id;
            const contentId = `faq-content-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? 'bg-brand-surface border-brand-volt/60 shadow-lg'
                    : 'bg-brand-surface/40 border-brand-border/70 hover:border-brand-border hover:bg-brand-surface/70'
                }`}
              >
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-volt rounded-2xl"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="font-mono text-xs text-brand-volt font-bold shrink-0">
                      0{index + 1}.
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {item.question}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-lg bg-brand-charcoal text-brand-text-secondary transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-brand-volt bg-brand-volt/10' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-brand-text-secondary leading-relaxed font-light border-t border-brand-border/40 mt-1">
                        <p>{item.answer}</p>
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-mono text-brand-volt">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{item.verification.note || 'Verified Operational Protocol'}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
