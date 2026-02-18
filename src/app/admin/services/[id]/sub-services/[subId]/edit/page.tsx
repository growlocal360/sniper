"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import type { JSONContent } from "@tiptap/react";
import slugify from "slugify";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { createClient } from "@/lib/supabase/client";
import type { SubService } from "@/lib/types";

export default function EditSubServicePage({
  params,
}: {
  params: Promise<{ id: string; subId: string }>;
}) {
  const { id, subId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [serviceName, setServiceName] = useState("");

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

      // Fetch parent service name
      const { data: serviceData } = await supabase
        .from("services")
        .select("name")
        .eq("id", id)
        .single();

      if (serviceData) {
        setServiceName(serviceData.name);
      }

      // Fetch sub-service
      const { data, error: fetchError } = await supabase
        .from("sub_services")
        .select("*")
        .eq("id", subId)
        .single();

      if (fetchError || !data) {
        setError("Failed to load sub-service");
        setLoading(false);
        return;
      }

      const sub = data as SubService;
      setName(sub.name);
      setSlug(sub.slug);
      setDescription(sub.description);
      setIcon(sub.icon || "");
      setImageUrl(sub.image_url || "");
      setDisplayOrder(sub.display_order);
      setPublished(sub.published);
      setLoading(false);
    };

    fetchData();
  }, [id, subId]);

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
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("sub_services")
        .update({
          name: name.trim(),
          slug: slug.trim(),
          description: description || { type: "doc", content: [] },
          icon: icon.trim() || null,
          image_url: imageUrl.trim() || null,
          display_order: displayOrder,
          published,
        })
        .eq("id", subId);

      if (updateError) {
        throw new Error(updateError.message);
      }

      router.push(`/admin/services/${id}/sub-services/new`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-sniper-brand animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/admin/services/${id}/sub-services/new`}
          className="inline-flex items-center space-x-2 text-tactical-400 hover:text-sniper-brand transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sub-services{serviceName ? `: ${serviceName}` : ""}</span>
        </Link>
        <h1 className="text-3xl font-bold text-tactical-100">
          Edit Sub-service
        </h1>
        <p className="text-tactical-400 mt-1">
          Update sub-service details
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
            className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors font-mono text-sm"
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
            className="w-full px-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
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
            <span>{saving ? "Saving..." : "Update Sub-service"}</span>
          </button>
          <Link
            href={`/admin/services/${id}/sub-services/new`}
            className="px-6 py-2.5 text-tactical-400 hover:text-tactical-200 font-medium transition-colors"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
