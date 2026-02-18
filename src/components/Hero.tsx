"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/specialty-welding-services-sniper-elite-1300px.jpg"
          alt="Specialty welding services"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-tactical-950/60" />
      <div className="absolute inset-0 bg-linear-to-r from-tactical-950/90 via-tactical-950/60 to-transparent" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Gold gradient overlay from bottom */}
      <div className="absolute inset-0 bg-linear-to-t from-sand-700/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-sand-500/10 border border-sand-500/20 rounded-full mb-8"
          >
            <Shield className="h-4 w-4 text-sand-500" />
            <span className="text-sand-400 text-sm font-medium">24/7 Emergency Response</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Precision{" "}
            <span className="text-gradient">Under</span>
            <br />
            Pressure
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-tactical-300 leading-relaxed mb-10 max-w-2xl"
          >
            Expert catalyst handling, specialty welding, and mechanical services
            delivered with military-grade precision for industrial facilities
            across North America.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-crimson-600 hover:bg-crimson-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-crimson-600/25 hover:shadow-crimson-500/30"
            >
              <ChevronRight className="h-5 w-5" />
              <span>Get Your Project Quote</span>
            </Link>
            <a
              href="tel:1-855-827-4387"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-tactical-800/50 hover:bg-tactical-700/50 border border-tactical-700 hover:border-sand-500/50 text-white rounded-lg font-semibold transition-all"
            >
              <Phone className="h-5 w-5 text-sand-500" />
              <span>1-855-TARGETS</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-tactical-600 rounded-full flex justify-center"
        >
          <div className="w-1 h-2 bg-sand-500 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
