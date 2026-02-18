"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import slugify from "slugify";
import type { JSONContent } from "@tiptap/react";
import RichTextEditor from "@/components/editor/RichTextEditor";

const MARKET_OPTIONS = ["Refining", "Chemical", "Renewables", "Paper"];

const SERVICE_OPTIONS = [
  "Catalyst Services",
  "Specialty Welding",
  "Mechanical Services",
];

export default function NewProjectPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState<JSONContent | null>(null);
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [market, setMarket] = useState("");
  const [servicesUsed, setServicesUsed] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === slugify(title, { lower: true, strict: true })) {
      setSlug(slugify(value, { lower: true, strict: true }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setServicesUsed((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !client || !excerpt) return;

    setSaving(true);

    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        client,
        location: location || null,
        excerpt,
        description: description || { type: "doc", content: [] },
        published,
        featured,
        market: market || null,
        services_used: servicesUsed,
        featured_image: featuredImage || null,
      }),
    });

    if (response.ok) {
      router.push("/admin/projects");
    } else {
      const error = await response.json();
      alert(error.error || "Failed to create project");
    }

    setSaving(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/projects"
            className="p-2 text-tactical-400 hover:text-tactical-200 hover:bg-tactical-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-tactical-100">
              Add Project
            </h1>
            <p className="text-tactical-400 mt-1">
              Create a new project case study
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="e.g. Reactor Vessel Catalyst Changeout"
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
                  /projects/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-r-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                  placeholder="project-slug"
                  required
                />
              </div>
            </motion.div>

            {/* Client */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Client *
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="e.g. ExxonMobil"
                required
              />
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="e.g. Baytown, TX"
              />
            </motion.div>

            {/* Excerpt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Excerpt *
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors resize-none"
                placeholder="Brief summary of the project..."
                required
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Description
              </label>
              <RichTextEditor
                content={description}
                onChange={setDescription}
                placeholder="Detailed project description..."
              />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish & Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Visibility
              </h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="w-5 h-5 rounded border-tactical-600 bg-tactical-800 text-sniper-brand focus:ring-sniper-brand focus:ring-offset-tactical-900"
                  />
                  <span className="text-tactical-300">Published</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-5 h-5 rounded border-tactical-600 bg-tactical-800 text-sniper-brand focus:ring-sniper-brand focus:ring-offset-tactical-900"
                  />
                  <span className="text-tactical-300">Featured</span>
                </label>
              </div>
            </motion.div>

            {/* Market */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Market
              </h3>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 outline-none transition-colors"
              >
                <option value="">Select market...</option>
                {MARKET_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Services Used */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Services Used
              </h3>
              <div className="space-y-3">
                {SERVICE_OPTIONS.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={servicesUsed.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-5 h-5 rounded border-tactical-600 bg-tactical-800 text-sniper-brand focus:ring-sniper-brand focus:ring-offset-tactical-900"
                    />
                    <span className="text-tactical-300">{service}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Featured Image
              </h3>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="Image URL..."
              />
              {featuredImage && (
                <div className="mt-3 rounded-lg overflow-hidden border border-tactical-700">
                  <img
                    src={featuredImage}
                    alt="Featured preview"
                    className="w-full h-32 object-cover"
                  />
                </div>
              )}
            </motion.div>

            {/* Save Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              type="submit"
              disabled={saving || !title || !slug || !client || !excerpt}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-tactical-700 disabled:to-tactical-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-red-500/25 disabled:shadow-none"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Saving..." : "Save Project"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
