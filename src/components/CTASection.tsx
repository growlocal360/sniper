"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-crimson-700 to-crimson-600" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-0 crosshair-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sand-300 font-semibold tracking-wider uppercase text-sm mb-3"
        >
          Ready for Elite Service?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-white mb-6"
        >
          Let&apos;s Start Your Next Project
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-10"
        >
          Contact our team for a consultation on your catalyst, welding, or mechanical service needs.
          24/7 emergency response available.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-tactical-100 text-crimson-600 rounded-lg font-bold transition-all shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
            <span>Get Your Project Quote</span>
          </Link>
          <a
            href="tel:1-855-827-4387"
            className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-all"
          >
            <Phone className="h-5 w-5" />
            <span>Call 1-855-TARGETS</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
