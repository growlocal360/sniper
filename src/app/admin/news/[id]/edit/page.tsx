"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import slugify from "slugify";
import type { JSONContent } from "@tiptap/react";
import RichTextEditor from "@/components/editor/RichTextEditor";
import type { NewsArticle, ArticleType } from "@/lib/types";

export default function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<ArticleType>("news");
  const [content, setContent] = useState<JSONContent>({ type: "doc", content: [] });
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [published, setPublished] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/news/${id}`);
      if (res.ok) {
        const data: NewsArticle = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setType(data.type);
        setContent(data.content);
        setExcerpt(data.excerpt || "");
        setFeaturedImage(data.featured_image || "");
        setPublished(data.published);
        setEventDate(data.event_date || "");
        setEventLocation(data.event_location || "");
      }
      setLoading(false);
    };
    fetchArticle();
  }, [id]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    setSaving(true);
    const body: Record<string, unknown> = {
      title,
      slug,
      type,
      content,
      excerpt: excerpt || null,
      featured_image: featuredImage || null,
      published,
    };

    if (type === "event") {
      body.event_date = eventDate || null;
      body.event_location = eventLocation || null;
    } else {
      body.event_date = null;
      body.event_location = null;
    }

    const res = await fetch(`/api/news/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/news");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-sand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/news"
          className="p-2 text-tactical-400 hover:text-tactical-200 hover:bg-tactical-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">
            Edit Article
          </h1>
          <p className="text-tactical-400 mt-1">
            Update news article or event details
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Article title"
              className="w-full px-4 py-3 bg-tactical-900 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="article-slug"
              className="w-full px-4 py-3 bg-tactical-900 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Content
            </label>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Write your article content..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-tactical-900 border border-tactical-700 rounded-xl p-6 space-y-5">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ArticleType)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 focus:outline-none focus:border-sand-500/50"
              >
                <option value="news">News</option>
                <option value="event">Event</option>
              </select>
            </div>

            {/* Published Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-tactical-300">
                Published
              </label>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  published ? "bg-sand-500" : "bg-tactical-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    published ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary..."
                rows={3}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50 resize-none"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Featured Image URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50"
              />
            </div>

            {/* Event-specific fields */}
            {type === "event" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-tactical-300 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 focus:outline-none focus:border-sand-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-tactical-300 mb-2">
                    Event Location
                  </label>
                  <input
                    type="text"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Event location"
                    className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50"
                  />
                </div>
              </>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving || !title.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-crimson-600 hover:bg-crimson-700 disabled:bg-tactical-700 disabled:text-tactical-500 text-white font-medium rounded-lg transition-colors"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
