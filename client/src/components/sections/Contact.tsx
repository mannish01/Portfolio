import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData.js';
import { submitContactMessage } from '../../services/api.js';
import { ContactFormData } from '../../types/portfolio.js';
import { SectionHeading } from '../ui/SectionHeading.js';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'config';
    text: string;
  } | null>(null);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await submitContactMessage(formData);

      if (response.success) {
        setStatusMessage({
          type: 'success',
          text: response.message || 'Your message was sent successfully!',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else if (response.isConfigError) {
        setStatusMessage({
          type: 'config',
          text:
            response.message ||
            'MongoDB is not currently configured or connected on the backend server. Your submission was validated, but requires an active MongoDB database to persist.',
        });
      } else {
        if (response.errors && Array.isArray(response.errors)) {
          const apiFieldErrors: Record<string, string> = {};
          response.errors.forEach((err) => {
            apiFieldErrors[err.field] = err.message;
          });
          setFieldErrors(apiFieldErrors);
        }
        setStatusMessage({
          type: 'error',
          text: response.message || 'Submission failed. Please check the fields.',
        });
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'An unexpected connection error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-navy-deep text-offwhite overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-violet/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-coral/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="07"
          tag="GET IN TOUCH"
          title="Have a project in mind? Let's create something amazing."
          subtitle="Whether you have an internship opportunity, a project to collaborate on, or just want to discuss software engineering — I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-navy-surface/70 border border-white/10 backdrop-blur-md shadow-xl">
              <h3 className="font-display text-2xl font-bold text-offwhite mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lime" />
                <span>Contact Channels</span>
              </h3>

              <div className="space-y-6">
                {/* Email Channel */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-violet/15 border border-white/10 hover:border-violet/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-violet/20 border border-violet/30 text-violet-light flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-wider text-offwhite/50">
                      Email Address
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-offwhite group-hover:text-lime transition-colors break-all">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                {/* Phone Channel */}
                <a
                  href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-coral/15 border border-white/10 hover:border-coral/40 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-coral/20 border border-coral/30 text-coral flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-wider text-offwhite/50">
                      Direct Phone
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-offwhite group-hover:text-coral transition-colors">
                      {personalInfo.phone}
                    </span>
                  </div>
                </a>

                {/* Location Channel */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-lime/15 border border-lime/30 text-lime flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-wider text-offwhite/50">
                      Location
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-offwhite">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="block font-mono text-xs uppercase tracking-wider text-offwhite/50 mb-3">
                  Verified Social Networks
                </span>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-white/5 hover:bg-white/10 border border-white/15 text-offwhite hover:text-white transition-all shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-offwhite/40" />
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[#0077B5]/20 hover:bg-[#0077B5]/30 border border-[#0077B5]/40 text-offwhite hover:text-white transition-all shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-[#0077B5]" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 text-offwhite/40" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High Performance Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="p-8 sm:p-10 rounded-3xl bg-navy-surface border border-white/15 shadow-2xl backdrop-blur-xl relative"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-lime" />
                  <h3 className="font-display text-xl font-bold text-offwhite">
                    Send a Message
                  </h3>
                </div>
                <span className="font-mono text-xs text-offwhite/50">
                  POST /api/contact
                </span>
              </div>

              {/* Status Alert Messages */}
              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-6 p-4 rounded-2xl border text-xs sm:text-sm font-mono flex items-start gap-3 ${
                      statusMessage.type === 'success'
                        ? 'bg-lime/10 border-lime/40 text-lime'
                        : statusMessage.type === 'config'
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                        : 'bg-coral/10 border-coral/40 text-coral'
                    }`}
                  >
                    {statusMessage.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 shrink-0 text-lime" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 text-amber-400" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold mb-1">
                        {statusMessage.type === 'success'
                          ? 'Message Delivered Successfully!'
                          : statusMessage.type === 'config'
                          ? 'Notice: MongoDB Database Not Connected'
                          : 'Submission Error'}
                      </p>
                      <p className="opacity-90 leading-relaxed">{statusMessage.text}</p>

                      {statusMessage.type === 'config' && (
                        <div className="mt-3 pt-2 border-t border-amber-500/20 flex flex-wrap gap-2">
                          <a
                            href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(
                              formData.subject || 'Portfolio Inquiry'
                            )}&body=${encodeURIComponent(
                              `From: ${formData.name} (${formData.email})\n\n${formData.message}`
                            )}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 text-xs font-mono font-bold transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Send via Email Client Instead</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-xs uppercase tracking-wider text-offwhite/70 mb-2"
                    >
                      Your Name <span className="text-coral">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 rounded-xl bg-navy-dark/80 border text-offwhite placeholder:text-offwhite/30 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-violet transition-all ${
                        fieldErrors.name
                          ? 'border-coral ring-1 ring-coral'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p className="mt-1.5 font-mono text-xs text-coral">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs uppercase tracking-wider text-offwhite/70 mb-2"
                    >
                      Your Email <span className="text-coral">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      className={`w-full px-4 py-3 rounded-xl bg-navy-dark/80 border text-offwhite placeholder:text-offwhite/30 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-violet transition-all ${
                        fieldErrors.email
                          ? 'border-coral ring-1 ring-coral'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1.5 font-mono text-xs text-coral">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-xs uppercase tracking-wider text-offwhite/70 mb-2"
                  >
                    Subject <span className="text-coral">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="e.g. Full-Stack Developer Opportunity / Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl bg-navy-dark/80 border text-offwhite placeholder:text-offwhite/30 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-violet transition-all ${
                      fieldErrors.subject
                        ? 'border-coral ring-1 ring-coral'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {fieldErrors.subject && (
                    <p className="mt-1.5 font-mono text-xs text-coral">
                      {fieldErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs uppercase tracking-wider text-offwhite/70 mb-2"
                  >
                    Message <span className="text-coral">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project, timeline, or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    className={`w-full px-4 py-3 rounded-xl bg-navy-dark/80 border text-offwhite placeholder:text-offwhite/30 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-violet transition-all resize-none ${
                      fieldErrors.message
                        ? 'border-coral ring-1 ring-coral'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p className="mt-1.5 font-mono text-xs text-coral">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-violet via-coral to-lime text-offwhite hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(121,87,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating & Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

