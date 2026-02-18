"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMembers = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });

    setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    setDeleteId(id);
    const response = await fetch(`/api/team/${id}`, { method: "DELETE" });

    if (response.ok) {
      setMembers(members.filter((m) => m.id !== id));
    }
    setDeleteId(null);
  };

  const togglePublish = async (member: TeamMember) => {
    const response = await fetch(`/api/team/${member.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !member.published }),
    });

    if (response.ok) {
      fetchMembers();
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-tactical-100">Team Members</h1>
          <p className="text-tactical-400 mt-1">
            Manage your team roster
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white rounded-lg font-semibold transition-all shadow-lg shadow-crimson-500/25"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Team Member
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-tactical-500" />
        <input
          type="text"
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-tactical-900 border border-tactical-700 focus:border-sniper-brand rounded-lg text-tactical-100 placeholder-tactical-500 outline-none transition-colors"
        />
      </div>

      {/* Team Members List */}
      <div className="bg-tactical-900 border border-tactical-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-tactical-400">Loading...</div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-tactical-400 mb-4">No team members found</p>
            <Link
              href="/admin/team/new"
              className="text-sniper-brand hover:text-sniper-brand"
            >
              Add your first team member
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-tactical-700 bg-tactical-800/50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-tactical-300">
                  Order
                </th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-tactical-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-tactical-800 hover:bg-tactical-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover border border-tactical-700"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-tactical-800 border border-tactical-700 flex items-center justify-center">
                          <span className="text-tactical-500 text-sm font-medium">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <p className="text-tactical-100 font-medium">
                        {member.name}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {member.title}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => togglePublish(member)}
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                        member.published
                          ? "bg-green-500/10 text-green-400"
                          : "bg-tactical-700 text-tactical-400"
                      }`}
                    >
                      {member.published ? (
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
                  <td className="px-6 py-4 text-tactical-400 text-sm">
                    {member.display_order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/team/${member.id}/edit`}
                        className="p-2 text-tactical-400 hover:text-sniper-brand hover:bg-tactical-800 rounded transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(member.id)}
                        disabled={deleteId === member.id}
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
