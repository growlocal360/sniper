"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Atom, Flame, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    name: "Catalyst Services",
    href: "/services/catalyst-services",
    icon: Atom,
    description:
      "Expert catalyst handling, changeouts, and reactor loading services with specialized dust-free equipment for optimal process performance.",
    features: [
      "Precision Dense Loading",
      "Dust-Free Handling",
      "Wet Dump Operations",
      "Advanced Inspections",
      "Emergency Response",
      "Inert Entry Services",
    ],
  },
  {
    name: "Specialty Welding",
    href: "/services/specialty-welding",
    icon: Flame,
    description:
      "Advanced welding techniques and certified welders for high-pressure systems, exotic alloys, and critical industrial applications.",
    features: [
      "Exotic Alloy Welding",
      "Complex Pipe Fabrication",
      "Process Tube Welding",
      "Pressure Vessel Repairs",
      "Code Compliance",
      "Emergency Services",
    ],
  },
  {
    name: "Mechanical Services",
    href: "/services/mechanical-services",
    icon: Wrench,
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
  },
];

export default function ServicesOverview() {
  return (
    <section className="relative py-24 bg-tactical-900">
      <div className="absolute inset-0 crosshair-pattern" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Industrial Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Elite Service Capabilities
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-tactical-400 text-lg max-w-2xl mx-auto"
          >
            Three core service lines delivering precision execution across every phase of your industrial operations.
          </motion.p>
        </div>

        {/* Services Grid */}
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
                  className="group block h-full bg-tactical-800/50 border border-tactical-700 hover:border-sniper-brand/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-sniper-brand/5"
                >
                  <div className="p-4 bg-sniper-brand/10 rounded-xl w-fit mb-6 group-hover:bg-sniper-brand/20 transition-colors">
                    <Icon className="h-8 w-8 text-sniper-brand" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sniper-brand transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-tactical-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-8">
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
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
