"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Users,
  Target,
  Atom,
  Flame,
  Wrench,
  MapPin,
  Shield,
  Award,
  Clock,
  ArrowRight,
  Crosshair,
} from "lucide-react";

const values = [
  {
    title: "Precision Execution",
    icon: Crosshair,
    description:
      "Every task is performed with military-grade accuracy. Our teams operate with zero tolerance for error, delivering measurable results on every engagement.",
  },
  {
    title: "Safety Excellence",
    icon: Shield,
    description:
      "Uncompromising safety culture with rigorous protocols, continuous training, and a zero-incident mindset that protects our people and your operations.",
  },
  {
    title: "Elite Workforce",
    icon: Users,
    description:
      "200+ seasoned professionals with deep expertise in catalyst handling, specialty welding, and mechanical services for the most demanding industrial environments.",
  },
  {
    title: "24/7 Readiness",
    icon: Clock,
    description:
      "Around-the-clock emergency response capability ensures your facility is never without critical support when you need it most.",
  },
];

const serviceHighlights = [
  {
    name: "Catalyst Services",
    icon: Atom,
    description:
      "Expert catalyst handling, changeouts, and reactor loading with specialized dust-free equipment for optimal process performance.",
    href: "/services/catalyst-services",
  },
  {
    name: "Specialty Welding",
    icon: Flame,
    description:
      "Advanced welding techniques and certified welders for high-pressure systems, exotic alloys, and critical industrial applications.",
    href: "/services/specialty-welding",
  },
  {
    name: "Mechanical Services",
    icon: Wrench,
    description:
      "Comprehensive mechanical services including equipment installation, maintenance, field machining, and turnaround support.",
    href: "/services/mechanical-services",
  },
];

const markets = [
  { name: "Refining", href: "/markets/refining" },
  { name: "Chemical", href: "/markets/chemical" },
  { name: "Renewables", href: "/markets/renewables" },
  { name: "Paper", href: "/markets/paper" },
];

const linkSections = [
  {
    title: "Our Team",
    description: "Meet the elite professionals behind every successful project.",
    href: "/company/team",
    icon: Users,
  },
  {
    title: "Our Mission",
    description: "Discover the values and commitment that drive everything we do.",
    href: "/company/mission",
    icon: Target,
  },
  {
    title: "Capabilities",
    description: "Explore our equipment, expertise, and operational metrics.",
    href: "/company/capabilities",
    icon: Award,
  },
  {
    title: "Locations",
    description: "Find our offices and service centers across the region.",
    href: "/company/locations",
    icon: MapPin,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function CompanyPage() {
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
              <Link href="/" className="hover:text-sand-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sand-400">Company</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              About <span className="text-gradient">Sniper Elite</span>
            </h1>
            <p className="text-xl text-tactical-300 max-w-2xl mx-auto">
              Precision industrial services delivered with military-grade accuracy
              from the heart of Southwest Louisiana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-sand-500 font-semibold tracking-wider uppercase text-sm mb-3">
                Who We Are
              </p>
              <h2 className="text-4xl font-bold text-white mb-6">
                Industrial Excellence Since Day One
              </h2>
              <div className="space-y-4 text-tactical-300 leading-relaxed">
                <p>
                  Based in Sulphur, Louisiana, Sniper Elite Services is a premier
                  industrial services company specializing in catalyst handling,
                  specialty welding, and mechanical services for the energy and
                  process industries.
                </p>
                <p>
                  With over 25 years of combined leadership experience and a team of
                  200+ elite professionals, we deliver precision execution on every
                  project -- from routine maintenance to complex turnarounds and
                  emergency response operations.
                </p>
                <p>
                  Our commitment to safety, quality, and operational excellence has
                  earned the trust of leading refineries, chemical plants, renewable
                  energy facilities, and paper manufacturers across the Gulf Coast
                  and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "200+", label: "Elite Professionals" },
                { value: "25+", label: "Years Experience" },
                { value: "24/7", label: "Emergency Response" },
                { value: "Zero", label: "Compromise Safety" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-sand-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-tactical-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Values */}
      <section className="relative py-24 bg-tactical-900">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp}
              className="text-sand-500 font-semibold tracking-wider uppercase text-sm mb-3"
            >
              Core Values
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              What Sets Us Apart
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="text-tactical-400 text-lg max-w-2xl mx-auto"
            >
              The principles that guide every decision, every operation, and every
              interaction with our clients.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-8 text-center"
                >
                  <div className="inline-flex p-4 bg-sand-500/10 rounded-2xl mb-6">
                    <Icon className="h-8 w-8 text-sand-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-tactical-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp}
              className="text-sand-500 font-semibold tracking-wider uppercase text-sm mb-3"
            >
              What We Do
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Three Core Service Lines
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {serviceHighlights.map((service, index) => {
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
                    className="group block h-full bg-tactical-800/50 border border-tactical-700 hover:border-sand-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-sand-500/5"
                  >
                    <div className="p-4 bg-sand-500/10 rounded-xl w-fit mb-6 group-hover:bg-sand-500/20 transition-colors">
                      <Icon className="h-8 w-8 text-sand-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-sand-400 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-tactical-400 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-sand-400 font-semibold group-hover:text-sand-300 transition-colors">
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

      {/* Markets */}
      <section className="relative py-16 bg-tactical-900 border-y border-tactical-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeUp}
            className="flex flex-col sm:flex-row items-center justify-between gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Markets We Serve
              </h3>
              <p className="text-tactical-400">
                Delivering precision industrial services across four key sectors.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {markets.map((market) => (
                <Link
                  key={market.name}
                  href={market.href}
                  className="px-5 py-2.5 bg-tactical-800/50 border border-tactical-700 hover:border-sand-500/30 text-tactical-200 hover:text-sand-400 rounded-full text-sm font-medium transition-all"
                >
                  {market.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Link Sections */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp}
              className="text-sand-500 font-semibold tracking-wider uppercase text-sm mb-3"
            >
              Explore
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white"
            >
              Learn More About Us
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {linkSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={section.href}
                    className="group block h-full bg-tactical-900 border border-tactical-700 hover:border-sand-500/30 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-sand-500/5"
                  >
                    <div className="inline-flex p-4 bg-sand-500/10 rounded-2xl mb-6 group-hover:bg-sand-500/20 transition-colors">
                      <Icon className="h-10 w-10 text-sand-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sand-400 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-tactical-400 text-sm leading-relaxed mb-6">
                      {section.description}
                    </p>
                    <span className="inline-flex items-center text-sand-400 text-sm font-semibold group-hover:text-sand-300 transition-colors">
                      Explore
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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
            Ready to Work with the Best?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-10"
          >
            Contact our team to discuss your next catalyst, welding, or mechanical
            service project. 24/7 emergency response available.
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
