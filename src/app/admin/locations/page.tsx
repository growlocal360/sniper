"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  MapPin,
  Building2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Location } from "@/lib/types";

export default function LocationsListPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("is_headquarters", { ascending: false })
      .order("name", { ascending: true });

    if (!error && data) {
      setLocations(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;

    setDeleting(id);
    const res = await fetch(`/api/locations/${id}`, { method: "DELETE" });

    if (res.ok) {
      setLocations((prev) => prev.filter((l) => l.id !== id));
    }
    setDeleting(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">Locations</h1>
          <p className="text-tactical-400 mt-1">
            Manage office and facility locations
          </p>
        </div>
        <Link
          href="/admin/locations/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Location
        </Link>
      </div>

      {/* Grid */}
      <div className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-sniper-brand animate-spin" />
          </div>
        ) : locations.length === 0 ? (
          <div className="text-center py-20 text-tactical-500">
            No locations yet. Add your first one!
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-tactical-700 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  City / State
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  HQ
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tactical-800">
              {locations.map((loc, index) => (
                <motion.tr
                  key={loc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-tactical-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sniper-brand shrink-0" />
                      <span className="text-tactical-100 font-medium">
                        {loc.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {loc.address}
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {loc.city}, {loc.state}
                  </td>
                  <td className="px-6 py-4">
                    {loc.is_headquarters && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-sniper-brand/10 text-sniper-brand border border-sniper-brand/30">
                        <Building2 className="h-3 w-3" />
                        HQ
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {loc.published ? (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-tactical-700 text-tactical-400 border border-tactical-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          router.push(`/admin/locations/${loc.id}/edit`)
                        }
                        className="p-2 text-tactical-400 hover:text-sniper-brand hover:bg-tactical-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(loc.id)}
                        disabled={deleting === loc.id}
                        className="p-2 text-tactical-400 hover:text-crimson-400 hover:bg-tactical-700 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === loc.id ? (
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
