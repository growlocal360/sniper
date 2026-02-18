"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, Layers } from "lucide-react";
import type { JSONContent } from "@tiptap/react";
import slugify from "slugify";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { createClient } from "@/lib/supabase/client";
import type { Service, SubService } from "@/lib/types";

export default function SubServicesManagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [loadingService, setLoadingService] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");

  // New sub-service form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState<JSONContent | null>(null);
  const [icon, setIcon] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();

      // Fetch parent service
      const { data: serviceData } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();

      if (serviceData) {
        setService(serviceData);
      }
      setLoadingService(false);

      // Fetch sub-services
      const { data: subsData } = await supabase
        .from("sub_services")
        .select("*")
        .eq("service_id", id)
        .order("display_order", { ascending: true });

      if (subsData) {
        setSubServices(subsData);
      }
      setLoadingSubs(false);
    };

    fetchData();
  }, [id]);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value, { lower: true, strict: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/services/${id}/sub-services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          description: description || { type: "doc", content: [] },
          icon: icon.trim() || null,
          image_url: imageUrl.trim() || null,
          display_order: displayOrder,
          published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create sub-service");
      }

      const newSub = await res.json();
      setSubServices((prev) => [...prev, newSub]);

      // Reset form
      setName("");
      setSlug("");
      setDescription(null);
      setIcon("");
      setImageUrl("");
      setDisplayOrder(0);
      setPublished(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const deleteSubService = async (subId: string) => {
    if (!confirm("Are you sure you want to delete this sub-service?")) return;

    setDeleting(subId);
    const supabase = createClient();
    const { error } = await supabase
      .from("sub_services")
      .delete()
      .eq("id", subId);

    if (!error) {
      setSubServices((prev) => prev.filter((s) => s.id !== subId));
    }
    setDeleting(null);
  };

  if (loadingService) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-sand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/services"
          className="inline-flex items-center space-x-2 text-tactical-400 hover:text-sand-400 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Services</span>
        </Link>
        <h1 className="text-3xl font-bold text-tactical-100">
          Sub-services: {service?.name}
        </h1>
        <p className="text-tactical-400 mt-1">
          Manage sub-services for this offering
        </p>
      </div>

      {/* Existing Sub-services List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden mb-8"
      >
        <div className="px-6 py-4 border-b border-tactical-700">
          <h2 className="text-lg font-semibold text-tactical-100 flex items-center space-x-2">
            <Layers className="h-5 w-5 text-sand-500" />
            <span>Current Sub-services</span>
          </h2>
        </div>

        {loadingSubs ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 text-sand-500 animate-spin" />
          </div>
        ) : subServices.length === 0 ? (
          <div className="py-12 text-center text-tactical-500">
            No sub-services yet. Add one below.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-tactical-800">
                <th className="text-left px-6 py-3 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Slug
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tactical-800">
              {subServices.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-tactical-800/50 transition-colors"
                >
                  <td className="px-6 py-3 text-tactical-100 font-medium">
                    {sub.name}
                  </td>
                  <td className="px-6 py-3 text-tactical-400 text-sm font-mono">
                    {sub.slug}
                  </td>
                  <td className="px-6 py-3 text-tactical-400 text-sm">
                    {sub.display_order}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm font-medium ${
                        sub.published ? "text-green-500" : "text-tactical-500"
                      }`}
                    >
                      {sub.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/services/${id}/sub-services/${sub.id}/edit`}
                        className="p-2 text-tactical-400 hover:text-sand-400 hover:bg-tactical-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Layers className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deleteSubService(sub.id)}
                        disabled={deleting === sub.id}
                        className="p-2 text-tactical-400 hover:text-crimson-400 hover:bg-tactical-700 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === sub.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <span className="text-sm font-medium">Delete</span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Add New Sub-service Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-tactical-700">
          <h2 className="text-lg font-semibold text-tactical-100">
            Add New Sub-service
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-crimson-600/10 border border-crimson-500/30 rounded-lg text-crimson-400 text-sm">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Name <span className="text-crimson-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50 focus:ring-1 focus:ring-sand-500/50 transition-colors"
              placeholder="e.g. TIG Welding"
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
              className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50 focus:ring-1 focus:ring-sand-500/50 transition-colors font-mono text-sm"
              placeholder="auto-generated-from-name"
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
              placeholder="Describe this sub-service..."
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
              className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50 focus:ring-1 focus:ring-sand-500/50 transition-colors"
              placeholder="e.g. Flame (Lucide icon name)"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-tactical-300 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50 focus:ring-1 focus:ring-sand-500/50 transition-colors"
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
              className="w-32 px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50 focus:ring-1 focus:ring-sand-500/50 transition-colors"
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center space-x-3">
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
            <label className="text-sm font-medium text-tactical-300">
              {published ? "Published" : "Draft"}
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 pt-4 border-t border-tactical-700">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              <span>{saving ? "Saving..." : "Save Sub-service"}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
