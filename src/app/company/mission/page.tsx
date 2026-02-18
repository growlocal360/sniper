"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Crosshair,
  Shield,
  Target,
  Award,
  Heart,
  Zap,
  Users,
} from "lucide-react";

export default function MissionPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true } as const,
  };

  const pillars = [
    {
      title: "Precision",
      icon: Crosshair,
      description:
        "Every operation is executed with military-grade accuracy. We measure success in tolerances, not estimates. From catalyst loading densities to weld rejection rates, our metrics define the industry standard.",
    },
    {
      title: "Safety",
      icon: Shield,
      description:
        "Safety is not a policy -- it is our culture. Every team member, every project, every day. Our zero-incident mindset protects our people, your assets, and the communities where we operate.",
    },
    {
      title: "Excellence",
      icon: Award,
      description:
        "We do not settle for good enough. Continuous improvement, rigorous training, and investment in cutting-edge equipment ensure we deliver exceptional results on every engagement.",
    },
    {
      title: "Integrity",
      icon: Heart,
      description:
        "Transparent communication, honest assessments, and unwavering commitment to doing what is right. Our word is our bond, and our reputation is our most valuable asset.",
    },
  ];

  const commitments = [
    {
      title: "To Our Clients",
      icon: Target,
      points: [
        "Deliver on time, on budget, and beyond expectations",
        "Provide 24/7 emergency response capability",
        "Maintain transparent communication throughout every project",
        "Continuously innovate to improve efficiency and safety",
      ],
    },
    {
      title: "To Our People",
      icon: Users,
      points: [
        "Invest in continuous training and professional development",
        "Maintain an uncompromising safety-first culture",
        "Foster a team environment built on mutual respect",
        "Provide competitive compensation and growth opportunities",
      ],
    },
    {
      title: "To Our Industry",
      icon: Zap,
      points: [
        "Set the standard for industrial service quality",
        "Advance safety practices and technologies",
        "Support workforce development in Southwest Louisiana",
        "Drive innovation in catalyst, welding, and mechanical services",
      ],
    },
  ];

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
              <span className="text-sniper-brand">Our Mission</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Our <span className="text-gradient">Mission</span>
            </h1>
            <p className="text-xl text-tactical-300 max-w-2xl mx-auto">
              Delivering precision industrial services with an unwavering
              commitment to safety, quality, and operational excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-tactical-800/50 border border-tactical-700 rounded-3xl p-10 sm:p-14"
          >
            <div className="inline-flex p-4 bg-sniper-brand/10 rounded-2xl mb-8">
              <Target className="h-10 w-10 text-sniper-brand" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-tactical-200 leading-relaxed mb-6">
              To be the most trusted name in industrial services by delivering
              precision execution, maintaining an uncompromising safety culture,
              and building lasting partnerships with our clients across the energy
              and process industries.
            </p>
            <p className="text-tactical-400 leading-relaxed">
              Every reactor loaded, every weld completed, every piece of equipment
              serviced reflects our commitment to excellence. We do not just meet
              industry standards -- we set them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="relative py-24 bg-tactical-900">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp}
              className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3"
            >
              Foundation
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Our Core Pillars
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ delay: 0.2 }}
              className="text-tactical-400 text-lg max-w-2xl mx-auto"
            >
              The four foundational principles that guide every decision, every
              operation, and every relationship.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-8"
                >
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 p-4 bg-sniper-brand/10 rounded-2xl">
                      <Icon className="h-8 w-8 text-sniper-brand" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {pillar.title}
                      </h3>
                      <p className="text-tactical-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3">
                Looking Forward
              </p>
              <h2 className="text-4xl font-bold text-white mb-6">Our Vision</h2>
              <div className="space-y-4 text-tactical-300 leading-relaxed">
                <p>
                  We envision a future where Sniper Elite Services is the first
                  call for every industrial facility that demands precision,
                  safety, and reliability. A future where our name is synonymous
                  with excellence in catalyst handling, specialty welding, and
                  mechanical services.
                </p>
                <p>
                  As the energy landscape evolves, we are committed to growing
                  alongside our clients -- expanding into renewable energy,
                  adopting new technologies, and developing the next generation
                  of elite industrial professionals.
                </p>
                <p>
                  Our vision extends beyond business. We are dedicated to
                  strengthening the communities where we live and work,
                  supporting workforce development in Southwest Louisiana, and
                  raising the bar for safety and quality across our industry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {[
                {
                  value: "Zero",
                  label: "Incidents",
                  sub: "Our non-negotiable safety standard",
                },
                {
                  value: "100%",
                  label: "Code Compliance",
                  sub: "Every weld, every time",
                },
                {
                  value: "24/7",
                  label: "Availability",
                  sub: "Emergency response readiness",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-6 bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6"
                >
                  <div className="text-4xl font-bold text-sniper-brand min-w-[100px] text-center">
                    {item.value}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.label}</div>
                    <div className="text-tactical-400 text-sm">{item.sub}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="relative py-24 bg-tactical-900">
        <div className="absolute inset-0 noise-overlay" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp}
              className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3"
            >
              Our Promise
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Our Commitments
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {commitments.map((commitment, index) => {
              const Icon = commitment.icon;
              return (
                <motion.div
                  key={commitment.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-8"
                >
                  <div className="inline-flex p-4 bg-sniper-brand/10 rounded-2xl mb-6">
                    <Icon className="h-8 w-8 text-sniper-brand" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6">
                    {commitment.title}
                  </h3>
                  <ul className="space-y-3">
                    {commitment.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start text-sm text-tactical-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sniper-brand mt-1.5 mr-3 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
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
            Experience the Sniper Elite Difference
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-10"
          >
            Partner with a team that shares your commitment to precision, safety,
            and operational excellence.
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
            <Link
              href="/company/capabilities"
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-all"
            >
              <span>View Our Capabilities</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
