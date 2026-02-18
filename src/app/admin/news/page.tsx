"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Newspaper,
  Calendar,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";
import type { NewsArticle, ArticleType } from "@/lib/types";

type FilterTab = "all" | "news" | "event";

export default function NewsListPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("news_articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setArticles(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    setDeleting(id);
    const res = await fetch(`/api/news/${id}`, { method: "DELETE" });

    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
    setDeleting(null);
  };

  const filtered = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || article.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const tabs: { label: string; value: FilterTab }[] = [
    { label: "All", value: "all" },
    { label: "News", value: "news" },
    { label: "Events", value: "event" },
  ];

  const typeBadge = (type: ArticleType) => {
    if (type === "event") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sniper-brand/10 text-sniper-brand border border-sniper-brand/30">
          <Calendar className="h-3 w-3" />
          Event
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-crimson-500/10 text-crimson-400 border border-crimson-500/30">
        <Newspaper className="h-3 w-3" />
        News
      </span>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">
            News & Events
          </h1>
          <p className="text-tactical-400 mt-1">
            Manage news articles and event announcements
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add New
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Type filter tabs */}
        <div className="flex bg-tactical-900 border border-tactical-700 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.value
                  ? "bg-sniper-brand/10 text-sniper-brand border border-sniper-brand/30"
                  : "text-tactical-400 hover:text-tactical-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tactical-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-tactical-900 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-sniper-brand animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-tactical-500">
            {search || activeTab !== "all"
              ? "No articles match your filters."
              : "No articles yet. Create your first one!"}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-tactical-700 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tactical-800">
              {filtered.map((article, index) => (
                <motion.tr
                  key={article.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-tactical-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-tactical-100 font-medium">
                      {article.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">{typeBadge(article.type)}</td>
                  <td className="px-6 py-4">
                    {article.published ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-tactical-700 text-tactical-400 border border-tactical-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {format(new Date(article.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/news/${article.id}/edit`)
                        }
                        className="p-2 text-tactical-400 hover:text-sniper-brand hover:bg-tactical-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        disabled={deleting === article.id}
                        className="p-2 text-tactical-400 hover:text-crimson-400 hover:bg-tactical-700 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === article.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
