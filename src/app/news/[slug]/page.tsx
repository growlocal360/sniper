import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, MapPin, Crosshair } from "lucide-react";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import type { NewsArticle } from "@/lib/types";
import ArticleContent from "@/components/editor/ArticleContent";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("news_articles")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!article) {
    return { title: "Article Not Found | Sniper Elite Services" };
  }

  return {
    title: `${article.title} | Sniper Elite Services`,
    description: article.excerpt || undefined,
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    notFound();
  }

  const article = data as NewsArticle;
  const displayDate =
    article.event_date || article.published_at || article.created_at;

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
            <Link
              href="/news"
              className="hover:text-sand-400 transition-colors"
            >
              News &amp; Events
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sand-400 truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>

          {/* Type Badge */}
          <div className="mb-4">
            <span
              className={`inline-block px-4 py-1.5 text-xs font-bold rounded-full ${
                article.type === "event"
                  ? "bg-crimson-600/90 text-white"
                  : "bg-sand-500/90 text-tactical-950"
              }`}
            >
              {article.type === "event" ? "Event" : "News"}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {article.title}
          </h1>

          {/* Meta info */}
          <div className="flex items-center justify-center gap-6 text-tactical-300 text-sm">
            {displayDate && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-sand-500" />
                {format(new Date(displayDate), "MMMM d, yyyy")}
              </span>
            )}
            {article.type === "event" && article.event_location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-sand-500" />
                {article.event_location}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-tactical-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {article.featured_image && (
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-tactical-800">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Event Details Banner */}
          {article.type === "event" && (article.event_date || article.event_location) && (
            <div className="bg-crimson-600/10 border border-crimson-600/20 rounded-xl p-6 mb-10">
              <h3 className="text-white font-bold mb-3">Event Details</h3>
              <div className="flex flex-wrap gap-6">
                {article.event_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-crimson-400" />
                    <div>
                      <p className="text-xs text-tactical-500 uppercase tracking-wider">
                        Date
                      </p>
                      <p className="text-white font-medium">
                        {format(new Date(article.event_date), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                )}
                {article.event_location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-crimson-400" />
                    <div>
                      <p className="text-xs text-tactical-500 uppercase tracking-wider">
                        Location
                      </p>
                      <p className="text-white font-medium">
                        {article.event_location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8 sm:p-12">
            <ArticleContent content={article.content} />
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sand-400 hover:text-sand-300 font-semibold transition-colors"
            >
              <Crosshair className="h-4 w-4" />
              Back to News &amp; Events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
