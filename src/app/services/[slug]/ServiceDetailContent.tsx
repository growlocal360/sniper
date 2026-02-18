"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Phone,
  ArrowRight,
  Atom,
  Flame,
  Wrench,
  FileText,
} from "lucide-react";
import ArticleContent from "@/components/editor/ArticleContent";
import type { Service, SubService } from "@/lib/types";

interface ServiceDetailContentProps {
  service: Service;
  subServices: SubService[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Atom,
  Flame,
  Wrench,
  FileText,
};

function getServiceIcon(iconName: string) {
  return iconMap[iconName] || FileText;
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
};

export default function ServiceDetailContent({
  service,
  subServices,
}: ServiceDetailContentProps) {
  const ServiceIcon = getServiceIcon(service.icon);

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
                className="hover:text-sand-400 transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href="/services"
                className="hover:text-sand-400 transition-colors"
              >
                Services
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-sand-400">{service.name}</span>
            </nav>

            <div className="inline-flex p-4 bg-sand-500/10 rounded-2xl mb-6">
              <ServiceIcon className="h-10 w-10 text-sand-500" />
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              {service.name}
            </h1>
            <p className="text-xl text-tactical-300 max-w-2xl mx-auto">
              {service.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Description */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ArticleContent content={service.description} />
          </motion.div>
        </div>
      </section>

      {/* Sub-Services Grid */}
      {subServices.length > 0 && (
        <section className="relative py-24 bg-tactical-900">
          <div className="absolute inset-0 crosshair-pattern" />
          <div className="absolute inset-0 noise-overlay" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.p
                {...fadeUp}
                className="text-sand-500 font-semibold tracking-wider uppercase text-sm mb-3"
              >
                Specialized Solutions
              </motion.p>
              <motion.h2
                {...fadeUp}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-4"
              >
                Our {service.name} Offerings
              </motion.h2>
              <motion.p
                {...fadeUp}
                transition={{ delay: 0.2 }}
                className="text-tactical-400 text-lg max-w-2xl mx-auto"
              >
                Explore the specialized services within our {service.name.toLowerCase()} division.
              </motion.p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {subServices.map((subService, index) => {
                const SubIcon = subService.icon
                  ? getServiceIcon(subService.icon)
                  : FileText;

                return (
                  <motion.div
                    key={subService.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-tactical-800/50 border border-tactical-700 hover:border-sand-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-sand-500/5"
                  >
                    <div className="p-3 bg-sand-500/10 rounded-xl w-fit mb-5 group-hover:bg-sand-500/20 transition-colors">
                      <SubIcon className="h-6 w-6 text-sand-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sand-400 transition-colors">
                      {subService.name}
                    </h3>
                    {subService.description && (
                      <div className="text-tactical-400 text-sm leading-relaxed line-clamp-4">
                        <ArticleContent content={subService.description} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              {...fadeUp}
              className="text-3xl font-bold text-white mb-4"
            >
              Explore Our Other Services
            </motion.h2>
          </div>
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {[
              {
                name: "Catalyst Services",
                href: "/services/catalyst-services",
                icon: Atom,
              },
              {
                name: "Specialty Welding",
                href: "/services/specialty-welding",
                icon: Flame,
              },
              {
                name: "Mechanical Services",
                href: "/services/mechanical-services",
                icon: Wrench,
              },
            ]
              .filter((s) => s.href !== `/services/${service.slug}`)
              .map((otherService) => {
                const OtherIcon = otherService.icon;
                return (
                  <Link
                    key={otherService.name}
                    href={otherService.href}
                    className="group inline-flex items-center space-x-3 px-6 py-4 bg-tactical-800/50 border border-tactical-700 hover:border-sand-500/30 rounded-xl transition-all"
                  >
                    <OtherIcon className="h-5 w-5 text-sand-500" />
                    <span className="text-tactical-200 group-hover:text-sand-400 font-medium transition-colors">
                      {otherService.name}
                    </span>
                    <ArrowRight className="h-4 w-4 text-tactical-500 group-hover:text-sand-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crimson-700 to-crimson-600" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 crosshair-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            {...fadeUp}
            className="text-sand-300 font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Ready to Get Started?
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Request a {service.name} Quote
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-10"
          >
            Our {service.name.toLowerCase()} specialists are ready to discuss your project
            requirements. 24/7 emergency response available.
          </motion.p>
          <motion.div
            {...fadeUp}
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
    </>
  );
}
