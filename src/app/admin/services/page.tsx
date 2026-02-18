"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Layers,
  Loader2,
  Wrench,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/lib/types";

export default function AdminServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  };

  const togglePublish = async (service: Service) => {
    setToggling(service.id);
    const supabase = createClient();
    const { error } = await supabase
      .from("services")
      .update({ published: !service.published })
      .eq("id", service.id);

    if (!error) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, published: !s.published } : s
        )
      );
    }
    setToggling(null);
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service? This will also delete all associated sub-services.")) {
      return;
    }

    setDeleting(id);
    const supabase = createClient();
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (!error) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
    setDeleting(null);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">Services</h1>
          <p className="text-tactical-400 mt-1">
            Manage your service offerings and sub-services
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white font-medium rounded-lg transition-all"
        >
          <Plus className="h-5 w-5" />
          <span>Add Service</span>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tactical-500" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-tactical-800 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sniper-brand/50 focus:ring-1 focus:ring-sniper-brand/50 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-sniper-brand animate-spin" />
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-tactical-500">
            <Wrench className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">
              {search ? "No services match your search" : "No services yet"}
            </p>
            {!search && (
              <Link
                href="/admin/services/new"
                className="mt-4 text-sniper-brand hover:text-sniper-brand transition-colors"
              >
                Create your first service
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-tactical-700">
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Slug
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Tagline
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-tactical-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tactical-800">
              {filteredServices.map((service, index) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-tactical-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-tactical-100 font-medium">
                      {service.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-tactical-400 text-sm font-mono">
                      {service.slug}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-tactical-400 text-sm line-clamp-1">
                      {service.tagline}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(service)}
                      disabled={toggling === service.id}
                      className="inline-flex items-center space-x-1.5"
                    >
                      {toggling === service.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-tactical-500" />
                      ) : service.published ? (
                        <>
                          <Eye className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-500 font-medium">
                            Published
                          </span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4 text-tactical-500" />
                          <span className="text-sm text-tactical-500 font-medium">
                            Draft
                          </span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/services/${service.id}/sub-services/new`}
                        className="p-2 text-tactical-400 hover:text-sniper-brand hover:bg-tactical-700 rounded-lg transition-colors"
                        title="Manage Sub-services"
                      >
                        <Layers className="h-4 w-4" />
                      </Link>
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="p-2 text-tactical-400 hover:text-sniper-brand hover:bg-tactical-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => deleteService(service.id)}
                        disabled={deleting === service.id}
                        className="p-2 text-tactical-400 hover:text-crimson-400 hover:bg-tactical-700 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === service.id ? (
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
      </motion.div>
    </div>
  );
}
