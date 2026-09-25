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
      // Focus first input
      setTimeout(() => firstInputRef.current?.focus(), 100);
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
      errs.name = 'Please enter your name.';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
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
        // If an intentional external endpoint is configured
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, interest, message }),
        });
        if (!res.ok) throw new Error('Network submission failed');
      } else {
        // Honest client transmission: prepare WhatsApp payload and dispatch smoothly
        await new Promise((resolve) => setTimeout(resolve, 400));
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
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-enquiry-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-lg rounded-2xl bg-brand-surface border border-brand-border/90 shadow-2xl overflow-hidden p-6 sm:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close inquiry modal"
            className="absolute top-5 right-5 p-2 rounded-lg bg-brand-charcoal text-brand-text-secondary hover:text-white hover:bg-brand-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 pr-8">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-brand-volt/10 border border-brand-volt/30 text-brand-volt font-mono text-[10px] font-bold tracking-widest uppercase mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              Direct Training Desk
            </div>
            <h3
              id="modal-enquiry-title"
              className="text-2xl font-black uppercase tracking-tight text-white"
            >
              MEMBERSHIP & BATCH INQUIRY
            </h3>
            <p className="text-xs text-brand-text-secondary mt-1 font-light leading-relaxed">
              Connect directly with our floor coaching desk. We confirm batch availability, equipment orientation, and admission rates.
            </p>
          </div>

          {/* Success State */}
          {status === 'success' ? (
            <div className="py-6 space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold uppercase text-white">
                  INQUIRY MESSAGE PREPARED
                </h4>
                <p className="text-xs text-brand-text-secondary max-w-sm mx-auto leading-relaxed">
                  Your inquiry for <strong className="text-white">{interest}</strong> is ready. Open WhatsApp to send it straight to our training desk, or call us immediately.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={handleLaunchWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-volt text-brand-dark font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-glow-volt transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send On WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${SITE_CONTENT.brand.contact.phone.value}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-charcoal border border-brand-border text-white font-bold text-xs uppercase tracking-widest hover:border-brand-volt transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-brand-volt" />
                  <span>Call Desk ({SITE_CONTENT.brand.contact.phoneDisplay.value})</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs font-mono text-brand-text-muted hover:text-white transition-colors uppercase pt-2"
              >
                Close Window
              </button>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-secondary mb-1.5">
                  Full Name <span className="text-brand-volt">*</span>
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
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-dark/80 border text-sm text-white placeholder-brand-text-muted focus:outline-none transition-colors ${
                    errors.name
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-brand-border/80 focus:border-brand-volt'
                  }`}
                  autoComplete="name"
                  required
                />
                {errors.name && (
                  <p id="enquiry-name-error" role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="enquiry-phone" className="block text-xs font-mono uppercase tracking-wider text-brand-text-secondary mb-1.5">
                  Contact Phone (WhatsApp) <span className="text-brand-volt">*</span>
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
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-dark/80 border text-sm text-white placeholder-brand-text-muted focus:outline-none transition-colors ${
                    errors.phone
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-brand-border/80 focus:border-brand-volt'
                  }`}
                  autoComplete="tel"
                  required
                />
                {errors.phone && (
                  <p id="enquiry-phone-error" role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Email (Optional) */}
              <div>
                <label htmlFor="enquiry-email" className="block text-xs font-mono uppercase tracking-wider text-brand-text-secondary mb-1.5">
                  Email Address <span className="text-brand-text-muted">(Optional)</span>
                </label>
                <input
                  id="enquiry-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-brand-dark/80 border text-sm text-white placeholder-brand-text-muted focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-brand-border/80 focus:border-brand-volt'
                  }`}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="enquiry-email-error" role="alert" className="text-[11px] text-red-400 mt-1 flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Program / Plan Interest */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-secondary mb-1.5">
                  Program or Plan Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark/80 border border-brand-border/80 text-sm text-white focus:outline-none focus:border-brand-volt transition-colors"
                >
                  <option value="General Membership Inquiry">General Membership Inquiry</option>
                  <option value="Monthly Commitment">Monthly Commitment</option>
                  <option value="Quarterly Transformation">Quarterly Transformation (Recommended)</option>
                  <option value="Annual Athlete">Annual Athlete Plan</option>
                  <option value="Hypertrophy & Heavy Iron">Hypertrophy & Heavy Iron</option>
                  <option value="Cardio & Conditioning">Cardio & Conditioning</option>
                  <option value="1-on-1 Personal Mentorship">1-on-1 Personal Mentorship</option>
                  <option value="Women's Strength & Toning">Women's Strength & Toning</option>
                  <option value="Facility Tour / Walk-in Visit">Facility Tour / Walk-in Visit</option>
                </select>
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-text-secondary mb-1.5">
                  Questions or Preferred Shift <span className="text-brand-text-muted">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Looking to join the 6:00 AM morning batch..."
                  className="w-full px-3.5 py-2 rounded-xl bg-brand-dark/80 border border-brand-border/80 text-sm text-white placeholder-brand-text-muted focus:outline-none focus:border-brand-volt transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>We couldn’t send your enquiry. Please try WhatsApp directly or call us.</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-4 rounded-xl bg-brand-volt text-brand-dark font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-glow-volt transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <span>Preparing Inquiry...</span>
                  ) : (
                    <>
                      <span>PROCEED WITH INQUIRY</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] font-mono text-brand-text-muted text-center pt-1">
                Direct floor desk: +91 95337 79533 • Shiva Priya Theater Area, Timmappa Colony
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
