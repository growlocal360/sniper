"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Crosshair, ArrowRight } from "lucide-react";

const markets = [
  {
    name: "Refining",
    href: "/markets/refining",
    description: "Comprehensive services for petroleum refineries and downstream processing facilities.",
  },
  {
    name: "Chemical",
    href: "/markets/chemical",
    description: "Specialized support for chemical processing plants and petrochemical operations.",
  },
  {
    name: "Renewables",
    href: "/markets/renewables",
    description: "Forward-looking services for renewable energy and sustainable fuel production.",
  },
  {
    name: "Paper",
    href: "/markets/paper",
    description: "Tailored industrial solutions for paper manufacturing and pulp processing facilities.",
  },
];

export default function MarketsGrid() {
  return (
    <section className="relative py-24 bg-tactical-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sand-500 font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Markets Served
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Industries We Serve
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-tactical-400 text-lg max-w-2xl mx-auto"
          >
            Delivering precision industrial services across four key market sectors.
          </motion.p>
        </div>

        {/* Markets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {markets.map((market, index) => (
            <motion.div
              key={market.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={market.href}
                className="group block h-full bg-tactical-900 border border-tactical-700 hover:border-sand-500/30 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-sand-500/5"
              >
                <div className="inline-flex p-4 bg-sand-500/10 rounded-2xl mb-6 group-hover:bg-sand-500/20 transition-colors">
                  <Crosshair className="h-10 w-10 text-sand-500" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sand-400 transition-colors">
                  {market.name}
                </h3>

                <p className="text-tactical-400 text-sm leading-relaxed mb-6">
                  {market.description}
                </p>

                <span className="inline-flex items-center text-sand-400 text-sm font-semibold group-hover:text-sand-300 transition-colors">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
