"use client";

import { motion } from "framer-motion";
import { ShieldCheck, GraduationCap, Container } from "lucide-react";

const safetyItems = [
  {
    title: "Zero-Incident Policy",
    icon: ShieldCheck,
    description:
      "Comprehensive safety management systems with rigorous protocols ensuring zero workplace incidents and maximum personnel protection.",
  },
  {
    title: "Precision Safety Training",
    icon: GraduationCap,
    description:
      "Elite safety training programs with continuous education certification, maintenance, and emergency response preparedness for all team members.",
  },
  {
    title: "Containment Systems",
    icon: Container,
    description:
      "State-of-the-art containment and filtration technology ensuring the safest approach to hazardous materials handling and processing.",
  },
];

export default function SafetySection() {
  return (
    <section className="relative py-24 bg-tactical-900">
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-crimson-400 font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Safety First
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Safety Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-tactical-400 text-lg max-w-2xl mx-auto"
          >
            Uncompromising safety standards and practices for all industrial operations.
          </motion.p>
        </div>

        {/* Safety Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {safetyItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-8 text-center"
              >
                <div className="inline-flex p-4 bg-crimson-500/10 rounded-2xl mb-6">
                  <Icon className="h-8 w-8 text-crimson-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-tactical-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
