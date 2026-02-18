"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import slugify from "slugify";
import type { JSONContent } from "@tiptap/react";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function NewMarketPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState<JSONContent | null>(null);
  const [iconUrl, setIconUrl] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(true);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!slug || slug === slugify(name, { lower: true, strict: true })) {
      setSlug(slugify(value, { lower: true, strict: true }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setSaving(true);

    const response = await fetch("/api/markets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug,
        description: description || { type: "doc", content: [] },
        icon_url: iconUrl || null,
        hero_image_url: heroImageUrl || null,
        display_order: displayOrder,
        published,
      }),
    });

    if (response.ok) {
      router.push("/admin/markets");
    } else {
      const error = await response.json();
      alert(error.error || "Failed to create market");
    }

    setSaving(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/markets"
            className="p-2 text-tactical-400 hover:text-tactical-200 hover:bg-tactical-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-tactical-100">
              Add Market
            </h1>
            <p className="text-tactical-400 mt-1">
              Create a new industry market
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="e.g. Refining"
                required
              />
            </motion.div>

            {/* Slug */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                URL Slug *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-tactical-800 border border-r-0 border-tactical-700 rounded-l-lg text-tactical-500 text-sm">
                  /markets/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-r-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                  placeholder="market-slug"
                  required
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Description
              </label>
              <RichTextEditor
                content={description}
                onChange={setDescription}
                placeholder="Market description and details..."
              />
            </motion.div>

            {/* Icon URL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Icon URL
              </label>
              <input
                type="text"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="Icon image URL..."
              />
            </motion.div>

            {/* Hero Image URL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Hero Image URL
              </label>
              <input
                type="text"
                value={heroImageUrl}
                onChange={(e) => setHeroImageUrl(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="Hero image URL..."
              />
              {heroImageUrl && (
                <div className="mt-3 rounded-lg overflow-hidden border border-tactical-700">
                  <img
                    src={heroImageUrl}
                    alt="Hero preview"
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Display Order */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Display Order
              </h3>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 outline-none transition-colors"
                min="0"
              />
              <p className="text-tactical-500 text-sm mt-2">
                Lower numbers appear first
              </p>
            </motion.div>

            {/* Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Visibility
              </h3>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 rounded border-tactical-600 bg-tactical-800 text-sniper-brand focus:ring-sniper-brand focus:ring-offset-tactical-900"
                />
                <span className="text-tactical-300">Publish immediately</span>
              </label>
            </motion.div>

            {/* Save Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              type="submit"
              disabled={saving || !name || !slug}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 disabled:from-tactical-700 disabled:to-tactical-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-crimson-500/25 disabled:shadow-none"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Saving..." : "Save Market"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
