"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import type { TeamMember } from "@/lib/types";

interface TeamGridProps {
  members: TeamMember[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {members.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="group bg-tactical-800/50 border border-tactical-700 hover:border-sniper-brand/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sniper-brand/5"
        >
          {/* Photo */}
          <div className="relative h-64 bg-tactical-800 overflow-hidden">
            {member.photo_url ? (
              <Image
                src={member.photo_url}
                alt={member.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <User className="h-16 w-16 text-tactical-600" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-tactical-950/80 via-transparent to-transparent" />
          </div>

          {/* Info */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-white group-hover:text-sniper-brand transition-colors">
              {member.name}
            </h3>
            <p className="text-sniper-brand text-sm font-medium mb-3">
              {member.title}
            </p>
            {member.bio && (
              <p className="text-tactical-400 text-sm leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
