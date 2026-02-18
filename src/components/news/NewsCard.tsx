"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Crosshair } from "lucide-react";
import { format } from "date-fns";
import type { NewsArticle } from "@/lib/types";

interface NewsCardProps {
  article: NewsArticle;
  index?: number;
}

export default function NewsCard({ article, index = 0 }: NewsCardProps) {
  const displayDate = article.event_date || article.published_at || article.created_at;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        href={`/news/${article.slug}`}
        className="group block h-full bg-tactical-900 border border-tactical-700 hover:border-sniper-brand/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sniper-brand/5"
      >
        {/* Image */}
        <div className="relative h-48 bg-tactical-800 overflow-hidden">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Crosshair className="h-12 w-12 text-tactical-700" />
            </div>
          )}
          <div
            className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${
              article.type === "event"
                ? "bg-crimson-600/90 text-white"
                : "bg-sniper-brand/90 text-tactical-950"
            }`}
          >
            {article.type === "event" ? "Event" : "News"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4 text-tactical-500 text-xs mb-3">
            {displayDate && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(displayDate), "MMM d, yyyy")}
              </span>
            )}
            {article.type === "event" && article.event_location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {article.event_location}
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sniper-brand transition-colors line-clamp-2">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-tactical-400 text-sm line-clamp-3">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
