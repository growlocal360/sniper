"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import type { JobPosting } from "@/lib/types";

interface JobCardProps {
  job: JobPosting;
  index?: number;
}

export default function JobCard({ job, index = 0 }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/careers/${job.slug}`}
        className="group block bg-tactical-900 border border-tactical-700 hover:border-sand-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sand-500/5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sand-400 transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-4 text-sm text-tactical-400">
              {job.department && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-sand-500" />
                  {job.department}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-sand-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-sand-500" />
                {job.employment_type}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {job.published_at && (
              <span className="text-xs text-tactical-500 hidden md:block">
                Posted {format(new Date(job.published_at), "MMM d, yyyy")}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-sand-400 font-semibold text-sm group-hover:text-sand-300 transition-colors whitespace-nowrap">
              View Details
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
