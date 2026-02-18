"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Crosshair } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full bg-tactical-900 border border-tactical-700 hover:border-sniper-brand/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sniper-brand/5"
      >
        {/* Image */}
        <div className="relative h-52 bg-tactical-800 overflow-hidden">
          {project.featured_image ? (
            <Image
              src={project.featured_image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Crosshair className="h-12 w-12 text-tactical-700" />
            </div>
          )}
          <div className="absolute top-4 right-4 px-3 py-1 bg-sniper-brand/90 text-tactical-950 text-xs font-bold rounded-full">
            {project.market}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sniper-brand transition-colors">
            {project.title}
          </h3>

          <div className="flex items-center text-tactical-400 text-sm mb-3">
            <span className="font-medium">{project.client}</span>
            {project.location && (
              <>
                <span className="mx-2">|</span>
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{project.location}</span>
              </>
            )}
          </div>

          <p className="text-tactical-400 text-sm line-clamp-3">
            {project.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
