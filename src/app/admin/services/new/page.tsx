"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import type { JSONContent } from "@tiptap/react";
import slugify from "slugify";
import RichTextEditor from "@/components/editor/RichTextEditor";

export default function NewServicePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState<JSONContent | null>(null);
  const [icon, setIcon] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !tagline.trim()) {
      setError("Name and tagline are required.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          tagline: tagline.trim(),
          description: description || { type: "doc", content: [] },
          icon: icon.trim() || undefined,
          hero_image_url: heroImageUrl.trim() || null,
          display_order: displayOrder,
          published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create service");
      }

      router.push("/admin/services");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/services"
          className="inline-flex items-center space-x-2 text-tactical-400 hover:text-sniper-brand transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Services</span>
        </Link>
        <h1 className="text-3xl font-bold text-tactical-100">
          Add New Service
        </h1>
        <p className="text-tactical-400 mt-1">
          Create a new service offering
        </p>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-6"
      >
        {error && (
          <div className="p-4 bg-red-600/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-tactical-300 mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
            placeholder="e.g. Pipeline Welding"
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
            className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors font-mono text-sm"
            placeholder="auto-generated-from-name"
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-sm font-medium text-tactical-300 mb-2">
            Tagline <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
            className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
            placeholder="A brief tagline for this service"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-tactical-300 mb-2">
            Description
          </label>
          <RichTextEditor
            content={description}
            onChange={setDescription}
            placeholder="Describe this service in detail..."
          />
        </div>

        {/* Icon Name */}
        <div>
          <label className="block text-sm font-medium text-tactical-300 mb-2">
            Icon Name
          </label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
            placeholder="e.g. Wrench (Lucide icon name)"
          />
        </div>

        {/* Hero Image URL */}
        <div>
          <label className="block text-sm font-medium text-tactical-300 mb-2">
            Hero Image URL
          </label>
          <input
            type="text"
            value={heroImageUrl}
            onChange={(e) => setHeroImageUrl(e.target.value)}
            className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium text-tactical-300 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
            className="w-32 px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
          />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              published ? "bg-sniper-brand" : "bg-tactical-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                published ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <label className="text-sm font-medium text-tactical-300">
            {published ? "Published" : "Draft"}
          </label>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 pt-4 border-t border-tactical-700">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            <span>{saving ? "Saving..." : "Save Service"}</span>
          </button>
          <Link
            href="/admin/services"
            className="px-6 py-2.5 text-tactical-400 hover:text-tactical-200 font-medium transition-colors"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
