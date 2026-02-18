"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  User,
} from "lucide-react";

const subjectOptions = [
  "General Inquiry",
  "Project Quote",
  "Catalyst Services",
  "Welding Services",
  "Mechanical Services",
  "Careers",
];

const leadershipContacts = [
  {
    name: "Operations",
    phone: "1-855-TARGETS",
    email: "operations@sniper-elite.com",
  },
  {
    name: "Business Development",
    phone: "1-855-TARGETS",
    email: "sales@sniper-elite.com",
  },
  {
    name: "Careers",
    phone: "1-855-TARGETS",
    email: "careers@sniper-elite.com",
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, display a success state. No backend submission.
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-tactical-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-tactical-950/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-tactical-400 mb-8">
            <Link href="/" className="hover:text-sniper-brand transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sniper-brand">Contact</span>
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Contact <span className="text-gradient">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-tactical-300 text-lg max-w-2xl mx-auto"
          >
            Ready to discuss your next project? Our team is standing by to
            deliver precision solutions for your facility.
          </motion.p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form - Left (3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Send Us a Message
                </h2>
                <p className="text-tactical-400 mb-8">
                  Fill out the form below and our team will get back to you
                  within 24 hours.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="inline-flex p-4 bg-sniper-brand/10 rounded-full mb-6">
                      <CheckCircle className="h-12 w-12 text-sniper-brand" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Message Received
                    </h3>
                    <p className="text-tactical-400 mb-6 max-w-md mx-auto">
                      Thank you, {formData.name}. Our team will review your{" "}
                      {formData.subject.toLowerCase()} and respond within one
                      business day.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "General Inquiry",
                          message: "",
                        });
                      }}
                      className="text-sniper-brand hover:text-sniper-brand font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-tactical-300 mb-2"
                      >
                        Name <span className="text-crimson-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-white placeholder-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-tactical-300 mb-2"
                      >
                        Email <span className="text-crimson-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-white placeholder-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
                      />
                    </div>

                    {/* Phone (optional) */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-tactical-300 mb-2"
                      >
                        Phone{" "}
                        <span className="text-tactical-500">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-white placeholder-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-tactical-300 mb-2"
                      >
                        Subject <span className="text-crimson-400">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-white focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors appearance-none"
                      >
                        {subjectOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-tactical-300 mb-2"
                      >
                        Message <span className="text-crimson-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-white placeholder-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-crimson-600 hover:bg-crimson-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-crimson-600/25 hover:shadow-crimson-500/30"
                    >
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info - Right (2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Main Contact Info */}
              <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-sniper-brand/10 rounded-lg flex-shrink-0">
                      <MapPin className="h-5 w-5 text-sniper-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                        Headquarters
                      </p>
                      <p className="text-white font-medium">
                        1396 Swisco Rd.
                        <br />
                        Sulphur, LA 70665
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-sniper-brand/10 rounded-lg flex-shrink-0">
                      <Phone className="h-5 w-5 text-sniper-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                        Phone
                      </p>
                      <a
                        href="tel:1-855-827-4387"
                        className="text-white font-medium hover:text-sniper-brand transition-colors"
                      >
                        1-855-TARGETS
                      </a>
                      <p className="text-tactical-500 text-sm mt-0.5">
                        24/7 Emergency Response
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-sniper-brand/10 rounded-lg flex-shrink-0">
                      <Mail className="h-5 w-5 text-sniper-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                        Email
                      </p>
                      <a
                        href="mailto:info@sniper-elite.com"
                        className="text-white font-medium hover:text-sniper-brand transition-colors"
                      >
                        info@sniper-elite.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Contacts */}
              <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Department Contacts
                </h3>
                <div className="space-y-5">
                  {leadershipContacts.map((contact) => (
                    <div key={contact.name} className="flex items-start gap-4">
                      <div className="p-2.5 bg-tactical-800 rounded-lg flex-shrink-0">
                        <User className="h-5 w-5 text-tactical-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {contact.name}
                        </p>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-tactical-400 text-sm hover:text-sniper-brand transition-colors block"
                        >
                          {contact.phone}
                        </a>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-tactical-400 text-sm hover:text-sniper-brand transition-colors block"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency CTA */}
              <div className="bg-crimson-600/10 border border-crimson-600/30 rounded-2xl p-8 text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  Emergency Response
                </h3>
                <p className="text-tactical-400 text-sm mb-4">
                  24/7 emergency services available. Call us any time.
                </p>
                <a
                  href="tel:1-855-827-4387"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-crimson-600 hover:bg-crimson-500 text-white rounded-lg font-semibold transition-all"
                >
                  <Phone className="h-4 w-4" />
                  <span>1-855-TARGETS</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-tactical-900 border-t border-tactical-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3">
              Our Locations
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Where We Operate
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Headquarters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-sniper-brand rounded-full" />
                <span className="text-xs text-sniper-brand font-semibold uppercase tracking-wider">
                  Headquarters
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Sulphur, Louisiana
              </h3>
              <p className="text-tactical-400 text-sm">
                1396 Swisco Rd.
                <br />
                Sulphur, LA 70665
              </p>
            </motion.div>

            {/* Coverage Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-crimson-500 rounded-full" />
                <span className="text-xs text-crimson-400 font-semibold uppercase tracking-wider">
                  Service Area
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Gulf Coast Region
              </h3>
              <p className="text-tactical-400 text-sm">
                Serving Texas, Louisiana, and the entire Gulf Coast refining
                corridor.
              </p>
            </motion.div>

            {/* Nationwide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-tactical-400 rounded-full" />
                <span className="text-xs text-tactical-400 font-semibold uppercase tracking-wider">
                  Nationwide
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                North America
              </h3>
              <p className="text-tactical-400 text-sm">
                Deployable nationwide for turnarounds, emergency response, and
                specialty projects.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
