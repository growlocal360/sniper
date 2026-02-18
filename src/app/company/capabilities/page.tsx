"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Atom,
  Flame,
  Wrench,
  Gauge,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

const capabilities = [
  {
    name: "Catalyst Services",
    icon: Atom,
    href: "/services/catalyst-services",
    color: "sand",
    metrics: [
      { value: "75+", label: "Tons Capacity", detail: "Per single reactor loading operation" },
      { value: "100%", label: "Dust-Free", detail: "Specialized containment systems" },
      { value: "24/7", label: "Response", detail: "Emergency catalyst operations" },
    ],
    capabilities: [
      "Precision dense loading and sock loading techniques",
      "Catalyst unloading with vacuum and wet dump methods",
      "Inert entry and confined space operations",
      "Advanced reactor inspection and video documentation",
      "Catalyst screening, separation, and recycling coordination",
      "Custom engineered loading equipment and tooling",
    ],
    equipment: [
      "Proprietary dense loading systems",
      "HEPA-filtered dust containment units",
      "Vacuum catalyst removal equipment",
      "Inert atmosphere monitoring systems",
      "Reactor inspection cameras and probes",
      "Specialized lifting and rigging equipment",
    ],
    description:
      "Our catalyst services division handles the full lifecycle of reactor catalyst management. From precision dense loading that maximizes catalyst performance to dust-free unloading operations that protect personnel and the environment, we bring specialized equipment and decades of expertise to every engagement.",
  },
  {
    name: "Specialty Welding",
    icon: Flame,
    href: "/services/specialty-welding",
    color: "crimson",
    metrics: [
      { value: "<0.5%", label: "Rejection Rate", detail: "Industry-leading weld quality" },
      { value: "100%", label: "Code Compliance", detail: "ASME, AWS, API certified" },
      { value: "50+", label: "Exotic Alloys", detail: "Materials we weld" },
    ],
    capabilities: [
      "Exotic alloy welding (Inconel, Hastelloy, Monel, Duplex SS)",
      "Complex pipe fabrication and installation",
      "Process tube welding and replacement",
      "Pressure vessel repairs and modifications",
      "Heat exchanger tube-to-tubesheet welding",
      "Automated orbital welding systems",
    ],
    equipment: [
      "Automated orbital welding machines",
      "TIG, MIG, SMAW, and FCAW equipment",
      "Portable heat treatment systems",
      "Non-destructive testing (NDE) capability",
      "CNC pipe cutting and beveling machines",
      "Welding procedure qualification lab",
    ],
    description:
      "Our specialty welding division maintains one of the lowest rejection rates in the industry. With certified welders proficient in over 50 exotic alloy combinations and 100% code compliance on every project, we deliver welds that exceed the most demanding specifications in refining, chemical, and petrochemical applications.",
  },
  {
    name: "Mechanical Services",
    icon: Wrench,
    href: "/services/mechanical-services",
    color: "sand",
    metrics: [
      {
        value: "\u00B10.001\"",
        label: "Precision",
        detail: "Field machining tolerances",
      },
      { value: "100+", label: "Crane Lifts", detail: "Annual heavy lift operations" },
      { value: "3", label: "CNC Centers", detail: "In-house machining capability" },
    ],
    capabilities: [
      "Heat exchanger bundle extraction and re-tubing",
      "On-site field machining (flange facing, boring, milling)",
      "Heavy equipment installation and alignment",
      "Tower and vessel internal work",
      "Pump and compressor overhaul",
      "Turnaround planning and execution support",
    ],
    equipment: [
      "Portable CNC flange facing machines",
      "Line boring and milling equipment",
      "Hydraulic torque wrenches and tensioners",
      "Heavy lift cranes (up to 500 tons)",
      "Laser alignment and measurement tools",
      "In-house CNC machining centers",
    ],
    description:
      "Our mechanical services division delivers precision equipment maintenance and installation with field machining tolerances of \u00B10.001\". From heat exchanger services to heavy lift operations and in-house CNC machining, we provide comprehensive mechanical support for planned turnarounds, maintenance shutdowns, and emergency repairs.",
  },
];

export default function CapabilitiesPage() {
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
              <Link
                href="/company"
                className="hover:text-sniper-brand transition-colors"
              >
                Company
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sniper-brand">Capabilities</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Our <span className="text-gradient">Capabilities</span>
            </h1>
            <p className="text-xl text-tactical-300 max-w-2xl mx-auto">
              Equipment, expertise, and operational metrics that define
              industrial service excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Metrics */}
      <section className="relative py-16 bg-tactical-950 border-b border-tactical-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Gauge, value: "200+", label: "Elite Professionals" },
              { icon: ShieldCheck, value: "Zero", label: "Incident Target" },
              { icon: Zap, value: "24/7", label: "Emergency Response" },
              { icon: CheckCircle, value: "25+", label: "Years Experience" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-3 bg-sniper-brand/10 rounded-xl mb-4">
                    <Icon className="h-6 w-6 text-sniper-brand" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-tactical-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capability Sections */}
      {capabilities.map((capability, sectionIndex) => {
        const Icon = capability.icon;
        const isAlt = sectionIndex % 2 === 1;

        return (
          <section
            key={capability.name}
            className={`relative py-24 ${
              isAlt ? "bg-tactical-900" : "bg-tactical-950"
            }`}
          >
            {isAlt && <div className="absolute inset-0 crosshair-pattern" />}
            {isAlt && <div className="absolute inset-0 noise-overlay" />}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
                <motion.div {...fadeUp} className="mb-6 lg:mb-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-sniper-brand/10 rounded-2xl">
                      <Icon className="h-10 w-10 text-sniper-brand" />
                    </div>
                    <div>
                      <p className="text-sniper-brand font-semibold tracking-wider uppercase text-sm">
                        Service Capability
                      </p>
                      <h2 className="text-4xl font-bold text-white">
                        {capability.name}
                      </h2>
                    </div>
                  </div>
                  <p className="text-tactical-300 leading-relaxed max-w-2xl">
                    {capability.description}
                  </p>
                </motion.div>
                <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
                  <Link
                    href={capability.href}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-sniper-brand/10 border border-sniper-brand/20 hover:border-sniper-brand/40 text-sniper-brand hover:text-sniper-brand rounded-lg font-semibold transition-all"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>

              {/* Metrics */}
              <div className="grid sm:grid-cols-3 gap-6 mb-16">
                {capability.metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6 text-center"
                  >
                    <div className="text-4xl font-bold text-sniper-brand mb-1">
                      {metric.value}
                    </div>
                    <div className="text-white font-semibold mb-1">
                      {metric.label}
                    </div>
                    <div className="text-tactical-400 text-sm">
                      {metric.detail}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Capabilities & Equipment */}
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <CheckCircle className="h-5 w-5 text-sniper-brand mr-3" />
                    Service Capabilities
                  </h3>
                  <ul className="space-y-3">
                    {capability.capabilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start text-sm text-tactical-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sniper-brand mt-1.5 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Wrench className="h-5 w-5 text-sniper-brand mr-3" />
                    Equipment &amp; Technology
                  </h3>
                  <ul className="space-y-3">
                    {capability.equipment.map((item) => (
                      <li
                        key={item}
                        className="flex items-start text-sm text-tactical-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sniper-brand mt-1.5 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crimson-700 to-crimson-600" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 crosshair-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            {...fadeUp}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Ready to Deploy Elite Capabilities?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-10"
          >
            Contact our team to discuss how our equipment, expertise, and
            operational capabilities can support your next project.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2 }}
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
              <span>Call 1-855-TARGETS</span>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
