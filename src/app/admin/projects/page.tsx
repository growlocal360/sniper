"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Star,
  FolderKanban,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleteId(id);
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });

    if (response.ok) {
      setProjects(projects.filter((p) => p.id !== id));
    }
    setDeleteId(null);
  };

  const togglePublish = async (project: Project) => {
    const response = await fetch(`/api/projects/${project.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !project.published }),
    });

    if (response.ok) {
      fetchProjects();
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">Projects</h1>
          <p className="text-tactical-400 mt-1">
            Manage project case studies and portfolio
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white rounded-lg font-semibold transition-all shadow-lg shadow-crimson-500/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-tactical-500" />
        <input
          type="text"
          placeholder="Search projects by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-tactical-900 border border-tactical-700 focus:border-sand-500 rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
        />
      </div>

      {/* Projects List */}
      <div className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-tactical-400">Loading...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-8 text-center">
            <FolderKanban className="h-12 w-12 text-tactical-600 mx-auto mb-4" />
            <p className="text-tactical-400 mb-4">No projects found</p>
            <Link
              href="/admin/projects/new"
              className="text-sand-400 hover:text-sand-300"
            >
              Add your first project
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-tactical-700 bg-tactical-800/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Client
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Market
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Featured
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Date
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-tactical-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-tactical-800 hover:bg-tactical-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="text-tactical-100 font-medium">
                      {project.title}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {project.client}
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {project.market || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(project)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                        project.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-tactical-700 text-tactical-400"
                      }`}
                    >
                      {project.published ? (
                        <>
                          <Eye className="h-3 w-3" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {project.featured && (
                      <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium bg-sand-500/10 text-sand-400">
                        <Star className="h-3 w-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-tactical-500 text-sm">
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-tactical-400 hover:text-sand-400 hover:bg-tactical-800 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleteId === project.id}
                        className="p-2 text-tactical-400 hover:text-red-400 hover:bg-tactical-800 rounded transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
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
