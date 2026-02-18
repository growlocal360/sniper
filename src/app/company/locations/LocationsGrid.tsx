"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Star } from "lucide-react";
import type { Location } from "@/lib/types";

interface LocationsGridProps {
  locations: Location[];
}

export default function LocationsGrid({ locations }: LocationsGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {locations.map((location, index) => (
        <motion.div
          key={location.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`bg-tactical-800/50 border rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-sand-500/5 ${
            location.is_headquarters
              ? "border-sand-500/30 ring-1 ring-sand-500/10"
              : "border-tactical-700 hover:border-sand-500/30"
          }`}
        >
          {/* HQ Badge */}
          {location.is_headquarters && (
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-4 w-4 text-sand-500 fill-sand-500" />
              <span className="px-3 py-1 bg-sand-500/20 text-sand-400 text-xs font-bold rounded-full uppercase tracking-wider">
                Headquarters
              </span>
            </div>
          )}

          <h3 className="text-xl font-bold text-white mb-1">{location.name}</h3>
          <p className="text-tactical-400 text-sm mb-6">
            {location.city}, {location.state} {location.zip}
          </p>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 text-sand-500 mt-0.5 flex-shrink-0" />
              <span className="text-tactical-300 text-sm">
                {location.address}
                <br />
                {location.city}, {location.state} {location.zip}
              </span>
            </div>

            {location.phone && (
              <a
                href={`tel:${location.phone}`}
                className="flex items-center space-x-3 text-tactical-300 hover:text-sand-400 text-sm transition-colors"
              >
                <Phone className="h-4 w-4 text-sand-500 flex-shrink-0" />
                <span>{location.phone}</span>
              </a>
            )}

            {location.email && (
              <a
                href={`mailto:${location.email}`}
                className="flex items-center space-x-3 text-tactical-300 hover:text-sand-400 text-sm transition-colors"
              >
                <Mail className="h-4 w-4 text-sand-500 flex-shrink-0" />
                <span>{location.email}</span>
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
