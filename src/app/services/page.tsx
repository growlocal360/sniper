"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Atom,
  Flame,
  Wrench,
  ArrowRight,
  Phone,
  Shield,
  Clock,
  Award,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

const services = [
  {
    name: "Catalyst Services",
    href: "/services/catalyst-services",
    icon: Atom,
    tagline: "Precision Catalyst Management",
    description:
      "Expert catalyst handling, changeouts, and reactor loading services with specialized dust-free equipment for optimal process performance.",
    features: [
      "Precision Dense Loading",
      "Dust-Free Catalyst Handling",
      "Wet Dump Operations",
      "Inert Entry Services",
      "Reactor Inspections",
      "Emergency Response",
    ],
    metric: { value: "75+", label: "Tons Capacity" },
  },
  {
    name: "Specialty Welding",
    href: "/services/specialty-welding",
    icon: Flame,
    tagline: "Advanced Welding Expertise",
    description:
      "Advanced welding techniques and certified welders for high-pressure systems, exotic alloys, and critical industrial applications.",
    features: [
      "Exotic Alloy Welding",
      "Complex Pipe Fabrication",
      "Process Tube Welding",
      "Pressure Vessel Repairs",
      "100% Code Compliance",
      "Orbital Welding",
    ],
    metric: { value: "<0.5%", label: "Rejection Rate" },
  },
  {
    name: "Mechanical Services",
    href: "/services/mechanical-services",
    icon: Wrench,
    tagline: "Comprehensive Mechanical Support",
    description:
      "Comprehensive mechanical services including equipment installation, maintenance, field machining, and turnaround support for industrial facilities.",
    features: [
      "Heat Exchanger Services",
      "Field Machining",
      "Equipment Installation",
      "Bundle Extraction",
      "Turnaround Support",
      "Crane & Rigging",
    ],
    metric: { value: "\u00B10.001\"", label: "Precision" },
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-tactical-900" />
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-tactical-950/50 via-transparent to-tactical-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <nav className="flex items-center justify-center space-x-2 text-sm text-tactical-400 mb-6">
              <Link
                href="/"
                className="hover:text-sniper-brand transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sniper-brand">Services</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-tactical-300 max-w-2xl mx-auto">
              Three core service lines delivering precision execution across
              every phase of your industrial operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative py-12 bg-tactical-950 border-b border-tactical-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {[
              { icon: Shield, label: "Zero-Incident Safety Culture" },
              { icon: Clock, label: "24/7 Emergency Response" },
              { icon: Award, label: "25+ Years Combined Experience" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center space-x-3 text-center"
                >
                  <Icon className="h-5 w-5 text-sniper-brand flex-shrink-0" />
                  <span className="text-tactical-300 text-sm font-medium">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Link
                    href={service.href}
                    className="group block h-full bg-tactical-800/50 border border-tactical-700 hover:border-sniper-brand/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sniper-brand/5"
                  >
                    {/* Header with metric */}
                    <div className="relative p-8 pb-4">
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-4 bg-sniper-brand/10 rounded-xl group-hover:bg-sniper-brand/20 transition-colors">
                          <Icon className="h-8 w-8 text-sniper-brand" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-sniper-brand">
                            {service.metric.value}
                          </div>
                          <div className="text-tactical-500 text-xs font-medium">
                            {service.metric.label}
                          </div>
                        </div>
                      </div>

                      <p className="text-sniper-brand text-xs font-semibold tracking-wider uppercase mb-2">
                        {service.tagline}
                      </p>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sniper-brand transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-tactical-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="px-8 pb-8">
                      <div className="border-t border-tactical-700 pt-6">
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center text-sm text-tactical-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-sniper-brand mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <span className="inline-flex items-center text-sniper-brand font-semibold group-hover:text-sniper-brand transition-colors">
                          View Service Details
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 bg-tactical-900">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp}
              className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3"
            >
              The Sniper Elite Advantage
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Why Choose Us
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Elite Workforce",
                description:
                  "200+ seasoned professionals with deep expertise in their respective service disciplines.",
              },
              {
                title: "Safety Culture",
                description:
                  "Zero-incident mindset with rigorous protocols and continuous safety training programs.",
              },
              {
                title: "24/7 Response",
                description:
                  "Around-the-clock emergency capability ensures your operations never wait for critical support.",
              },
              {
                title: "Proven Track Record",
                description:
                  "25+ years of combined leadership experience serving major refineries and chemical plants.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6 text-center"
              >
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-tactical-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 crosshair-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            {...fadeUp}
            className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Ready for Elite Service?
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Let&apos;s Start Your Next Project
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="text-red-300/80 text-lg max-w-2xl mx-auto mb-10"
          >
            Contact our team for a consultation on your catalyst, welding, or
            mechanical service needs. 24/7 emergency response available.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-tactical-100 text-red-600 rounded-lg font-bold transition-all shadow-lg"
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
    </>
  );
}
