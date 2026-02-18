import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { NewsArticle } from "@/lib/types";
import NewsFilterGrid from "@/components/news/NewsFilterGrid";

export const metadata = {
  title: "News & Events | Sniper Elite Services",
  description:
    "Stay up to date with the latest news, announcements, and events from Sniper Elite Services.",
};

export default async function NewsPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("news_articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const typedArticles = (articles as NewsArticle[]) || [];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-tactical-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-tactical-950/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-tactical-400 mb-8">
            <Link href="/" className="hover:text-sand-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sand-400">News &amp; Events</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            News &amp; <span className="text-gradient">Events</span>
          </h1>
          <p className="text-tactical-300 text-lg max-w-2xl mx-auto">
            The latest updates, announcements, and industry events from the
            Sniper Elite team.
          </p>
        </div>
      </section>

      {/* News Grid with Filters */}
      <section className="py-20 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsFilterGrid articles={typedArticles} />
        </div>
      </section>
    </>
  );
}
