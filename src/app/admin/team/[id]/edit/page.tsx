"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye, EyeOff, Trash2 } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  photo_url: string | null;
  email: string | null;
  phone: string | null;
  display_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      const response = await fetch(`/api/team/${id}`);
      if (response.ok) {
        const member: TeamMember = await response.json();
        setName(member.name);
        setTitle(member.title);
        setBio(member.bio || "");
        setPhotoUrl(member.photo_url || "");
        setEmail(member.email || "");
        setPhone(member.phone || "");
        setDisplayOrder(member.display_order);
        setPublished(member.published);
      }
      setLoading(false);
    };

    fetchMember();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title) return;

    setSaving(true);

    const response = await fetch(`/api/team/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        title,
        bio: bio || null,
        photo_url: photoUrl || null,
        email: email || null,
        phone: phone || null,
        display_order: displayOrder,
        published,
      }),
    });

    if (response.ok) {
      router.push("/admin/team");
    } else {
      const error = await response.json();
      alert(error.error || "Failed to update team member");
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    const response = await fetch(`/api/team/${id}`, { method: "DELETE" });

    if (response.ok) {
      router.push("/admin/team");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-tactical-400">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/team"
            className="p-2 text-tactical-400 hover:text-tactical-200 hover:bg-tactical-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-tactical-100">
              Edit Team Member
            </h1>
            <p className="text-tactical-400 mt-1">
              Update team member details
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 rounded-lg font-medium transition-colors"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Delete
        </button>
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
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="Full name"
                required
              />
            </motion.div>

            {/* Title / Position */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Title / Position *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="e.g. Operations Manager"
                required
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-tactical-300 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors resize-none"
                placeholder="Brief biography..."
              />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Contact Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-tactical-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-tactical-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Publish
              </h3>

              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                  published
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : "bg-tactical-800 text-tactical-400 border border-tactical-700"
                }`}
              >
                {published ? (
                  <>
                    <Eye className="h-5 w-5" />
                    <span>Published</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="h-5 w-5" />
                    <span>Draft</span>
                  </>
                )}
              </button>

              <p className="text-tactical-500 text-sm mt-2">
                {published
                  ? "Member will be visible on the website"
                  : "Member will be saved as a draft"}
              </p>
            </motion.div>

            {/* Photo URL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Photo
              </h3>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="Photo URL"
              />
              {photoUrl && (
                <div className="mt-4">
                  <img
                    src={photoUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-tactical-700"
                  />
                </div>
              )}
            </motion.div>

            {/* Display Order */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-tactical-100 mb-4">
                Display Order
              </h3>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-tactical-800 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
                placeholder="0"
                min={0}
              />
              <p className="text-tactical-500 text-sm mt-2">
                Lower numbers appear first
              </p>
            </motion.div>

            {/* Save Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              type="submit"
              disabled={saving || !name || !title}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 disabled:from-tactical-700 disabled:to-tactical-600 text-white rounded-lg font-semibold transition-all shadow-lg shadow-crimson-500/25 disabled:shadow-none"
            >
              <Save className="h-5 w-5" />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
}
