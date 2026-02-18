"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";
import NewsCard from "./NewsCard";

const filterTabs = [
  { label: "All", value: "all" },
  { label: "News", value: "news" },
  { label: "Events", value: "event" },
] as const;

type FilterValue = (typeof filterTabs)[number]["value"];

interface NewsFilterGridProps {
  articles: NewsArticle[];
}

export default function NewsFilterGrid({ articles }: NewsFilterGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered =
    activeFilter === "all"
      ? articles
      : articles.filter((a) => a.type === activeFilter);

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
              activeFilter === tab.value
                ? "bg-sniper-brand text-tactical-950"
                : "bg-tactical-800 text-tactical-300 hover:bg-tactical-700 hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-tactical-400 text-lg">
                No {activeFilter === "event" ? "events" : "articles"} found.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
