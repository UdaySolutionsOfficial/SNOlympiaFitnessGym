import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Phone, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../../data/siteContent';

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialInterest = 'General Membership Inquiry',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(initialInterest);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Sync initial interest when modal opens
  useEffect(() => {
    if (isOpen) {
      setInterest(initialInterest);
      setStatus('idle');
      setErrors({});
      // Focus first input with a slight delay
      setTimeout(() => firstInputRef.current?.focus(), 150);
    }
  }, [isOpen, initialInterest]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) {
      errs.name = 'Please enter your full name.';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit WhatsApp number.';
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const constructWhatsAppUrl = (n: string, p: string, e: string, i: string, m: string) => {
    const targetNumber = '919533779533';
    let text = `Hi Olympia Fitness Team, I would like to inquire about training at SN Olympia.\n\n`;
    text += `*Name:* ${n}\n`;
    text += `*Phone:* ${p}\n`;
    if (e) text += `*Email:* ${e}\n`;
    text += `*Program / Plan Interest:* ${i}\n`;
    if (m) text += `*Message:* ${m}\n`;

    return `https://wa.me/${targetNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      const endpoint = (import.meta as any).env?.VITE_ENQUIRY_API_ENDPOINT;

      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, interest, message }),
        });
        if (!res.ok) throw new Error('Network submission failed');
      } else {
        await new Promise((resolve) => setTimeout(resolve, 350));
      }

      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  const handleLaunchWhatsApp = () => {
    const url = constructWhatsAppUrl(name, phone, email, interest, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Highest Z-Index Layer (z-[150]): Sits strictly above the fixed navigation dock (z-[60]) */}
      <div
        className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-enquiry-title"
      >
        {/* Full-Screen Dark Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-2xl"
        />

        {/* Modal Window Card (Never overlaps offscreen; responsive max-height) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          className="relative z-10 w-full max-w-lg min-w-0 mx-auto my-auto rounded-2xl sm:rounded-3xl bg-[#0D0F14]/95 backdrop-blur-2xl border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(255,94,30,0.18)] flex flex-col max-h-[min(90vh,760px)] overflow-hidden box-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Pinned Modal Header (Always visible, never occluded by dock) */}
          <div className="relative px-4 py-3.5 sm:px-7 sm:pt-6 sm:pb-4 border-b border-white/10 shrink-0 bg-[#0D0F14]/95 backdrop-blur-md">
            <div className="flex items-start justify-between gap-2.5 sm:gap-3">
              <div className="min-w-0 flex-1 pr-1 sm:pr-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF5E1E]/15 border border-[#FF5E1E]/35 text-[#FFA034] font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E1E] animate-ping" />
                  <MessageSquare className="w-3 h-3 text-[#FF5E1E]" />
                  <span>Direct Training Desk</span>
                </div>
                <h3
                  id="modal-enquiry-title"
                  className="text-base sm:text-2xl font-black uppercase tracking-tight text-white mt-1.5 sm:mt-2 leading-tight break-words"
                >
                  MEMBERSHIP & BATCH INQUIRY
                </h3>
                <p className="text-[11px] sm:text-xs text-brand-text-secondary mt-1 font-light leading-relaxed">
                  Connect directly with our floor coaches to confirm batch timings, trainer guidance, and admission rates.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close inquiry modal"
                className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 text-brand-text-secondary hover:text-white hover:border-[#FF5E1E] hover:bg-[#FF5E1E]/15 hover:shadow-[0_0_12px_rgba(255,94,30,0.4)] transition-all shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Modal Body */}
          <div className="px-4 py-4 sm:px-7 sm:py-5 overflow-y-auto space-y-4">
            {/* Success State */}
            {status === 'success' ? (
              <div className="py-6 space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold uppercase text-white tracking-tight">
                    INQUIRY MESSAGE PREPARED
                  </h4>
                  <p className="text-xs text-brand-text-secondary max-w-sm mx-auto leading-relaxed">
                    Your inquiry for <strong className="text-[#FFA034]">{interest}</strong> is ready. Open WhatsApp to send it straight to our training desk, or call us immediately.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleLaunchWhatsApp}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5E1E] via-[#FF7A18] to-[#FFA034] text-black font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-[0_0_25px_rgba(255,94,30,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send On WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <a
                    href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:border-[#FF5E1E] hover:text-[#FFA034] transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#FF5E1E]" />
                    <span>Call Desk ({SITE_CONTENT.brand.contact.phoneDisplay.value})</span>
                  </a>
                </div>

                <button
                  onClick={onClose}
                  className="text-xs font-mono text-brand-text-muted hover:text-white transition-colors uppercase pt-2 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              /* Form View */
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
                {/* Full Name */}
                <div>
                  <label htmlFor="enquiry-name" className="block text-[11px] font-mono uppercase tracking-wider text-brand-text-secondary mb-1">
                    Full Name <span className="text-[#FF5E1E] font-bold">*</span>
                  </label>
                  <input
                    ref={firstInputRef}
                    id="enquiry-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black/60 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-all ${
                      errors.name
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-white/15 focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E]/40'
                    }`}
                    autoComplete="name"
                    required
                  />
                  {errors.name && (
                    <p id="enquiry-name-error" role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Contact Phone */}
                <div>
                  <label htmlFor="enquiry-phone" className="block text-[11px] font-mono uppercase tracking-wider text-brand-text-secondary mb-1">
                    Contact Phone (WhatsApp) <span className="text-[#FF5E1E] font-bold">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 95337 79533"
                    aria-required="true"
                    aria-invalid={errors.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black/60 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-all ${
                      errors.phone
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-white/15 focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E]/40'
                    }`}
                    autoComplete="tel"
                    required
                  />
                  {errors.phone && (
                    <p id="enquiry-phone-error" role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="enquiry-email" className="block text-[11px] font-mono uppercase tracking-wider text-brand-text-secondary mb-1">
                    Email Address <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-black/60 border text-sm text-white placeholder-neutral-500 focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-white/15 focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E]/40'
                    }`}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p id="enquiry-email-error" role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Program / Plan Interest */}
                <div>
                  <label htmlFor="enquiry-interest" className="block text-[11px] font-mono uppercase tracking-wider text-brand-text-secondary mb-1">
                    Program or Plan Interest
                  </label>
                  <div className="relative">
                    <select
                      id="enquiry-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full max-w-full min-w-0 box-border px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E]/40 transition-all appearance-none cursor-pointer pr-10 truncate"
                    >
                      <option value="General Membership Inquiry">General Membership Inquiry</option>
                      <option value="1 Month Membership (₹1,000)">1 Month Membership (₹1,000)</option>
                      <option value="12 Months Annual Plan (₹10,000) • Recommended">12 Months Annual Plan (₹10,000) • Recommended</option>
                      <option value="6 Months Half-Year Plan (₹5,500)">6 Months Half-Year Plan (₹5,500)</option>
                      <option value="Hypertrophy & Heavy Iron">Hypertrophy & Heavy Iron</option>
                      <option value="Cardio & High-Intensity Conditioning">Cardio & High-Intensity Conditioning</option>
                      <option value="1-on-1 Personal Mentorship">1-on-1 Personal Mentorship</option>
                      <option value="Women's Strength & Toning">Women's Strength & Toning</option>
                      <option value="Facility Tour / Walk-in Visit">Facility Tour / Walk-in Visit</option>
                    </select>
                    {/* Custom Select Arrow */}
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Questions or Preferred Shift */}
                <div>
                  <label htmlFor="enquiry-message" className="block text-[11px] font-mono uppercase tracking-wider text-brand-text-secondary mb-1">
                    Questions or Preferred Shift <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Looking to join the 6:00 AM morning batch..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF5E1E] focus:ring-1 focus:ring-[#FF5E1E]/40 transition-all resize-none"
                  />
                </div>

                {status === 'error' && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>We couldn’t send your enquiry. Please try WhatsApp directly or call us.</span>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#FF5E1E] via-[#FF7A18] to-[#FFA034] text-black font-black text-xs uppercase tracking-widest hover:brightness-110 shadow-[0_0_25px_rgba(255,94,30,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <span>PREPARING INQUIRY...</span>
                    ) : (
                      <>
                        <span>PROCEED WITH INQUIRY</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Info Footer */}
                <div className="pt-1.5 text-[11px] font-mono text-brand-text-muted text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                  <span>Direct Desk: <strong className="text-[#FFA034]">+91 95337 79533</strong></span>
                  <span className="hidden sm:inline opacity-40">•</span>
                  <span>Timmappa Colony, Yemmiganur</span>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnquiryModal;
