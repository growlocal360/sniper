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
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";
import type { JobPosting } from "@/lib/types";

export default function CareersListPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("job_postings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setJobs(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    setDeleting(id);
    const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });

    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j.id !== id));
    }
    setDeleting(null);
  };

  const filtered = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const typeBadgeColor = (type: string) => {
    switch (type) {
      case "Full-time":
        return "bg-sand-500/10 text-sand-400 border-sand-500/30";
      case "Part-time":
        return "bg-tactical-700 text-tactical-300 border-tactical-600";
      case "Contract":
        return "bg-crimson-500/10 text-crimson-400 border-crimson-500/30";
      case "Internship":
        return "bg-sand-500/10 text-sand-300 border-sand-500/20";
      default:
        return "bg-tactical-700 text-tactical-400 border-tactical-600";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">Careers</h1>
          <p className="text-tactical-400 mt-1">
            Manage job postings and openings
          </p>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-crimson-600 hover:bg-crimson-700 text-white font-medium rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
          Post New Job
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-tactical-500" />
          <input
            type="text"
            placeholder="Search job postings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-tactical-900 border border-tactical-700 rounded-lg text-tactical-100 placeholder:text-tactical-500 focus:outline-none focus:border-sand-500/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-sand-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-tactical-500">
            {search
              ? "No job postings match your search."
              : "No job postings yet. Create your first one!"}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-tactical-700 text-left">
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-tactical-400 uppercase tracking-wider">
                  Type
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
              {filtered.map((job, index) => (
                <motion.tr
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-tactical-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-tactical-100 font-medium">
                      {job.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {job.department || "--"}
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {job.location}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${typeBadgeColor(
                        job.employment_type
                      )}`}
                    >
                      {job.employment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {job.published ? (
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
                          router.push(`/admin/careers/${job.id}/edit`)
                        }
                        className="p-2 text-tactical-400 hover:text-sand-400 hover:bg-tactical-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        disabled={deleting === job.id}
                        className="p-2 text-tactical-400 hover:text-crimson-400 hover:bg-tactical-700 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === job.id ? (
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
