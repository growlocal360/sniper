"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Wrench,
  FolderKanban,
  Factory,
  Newspaper,
  Briefcase,
  MapPin,
  Plus,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface DashboardStats {
  teamCount: number;
  servicesCount: number;
  projectsCount: number;
  publishedProjectsCount: number;
  marketsCount: number;
  newsCount: number;
  publishedNewsCount: number;
  jobsCount: number;
  activeJobsCount: number;
  locationsCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    teamCount: 0,
    servicesCount: 0,
    projectsCount: 0,
    publishedProjectsCount: 0,
    marketsCount: 0,
    newsCount: 0,
    publishedNewsCount: 0,
    jobsCount: 0,
    activeJobsCount: 0,
    locationsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();

      const [
        teamResult,
        servicesResult,
        projectsResult,
        publishedProjectsResult,
        marketsResult,
        newsResult,
        publishedNewsResult,
        jobsResult,
        activeJobsResult,
        locationsResult,
      ] = await Promise.all([
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("projects").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("markets").select("id", { count: "exact", head: true }),
        supabase.from("news_articles").select("id", { count: "exact", head: true }),
        supabase.from("news_articles").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("job_postings").select("id", { count: "exact", head: true }),
        supabase.from("job_postings").select("id", { count: "exact", head: true }).eq("published", true),
        supabase.from("locations").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        teamCount: teamResult.count || 0,
        servicesCount: servicesResult.count || 0,
        projectsCount: projectsResult.count || 0,
        publishedProjectsCount: publishedProjectsResult.count || 0,
        marketsCount: marketsResult.count || 0,
        newsCount: newsResult.count || 0,
        publishedNewsCount: publishedNewsResult.count || 0,
        jobsCount: jobsResult.count || 0,
        activeJobsCount: activeJobsResult.count || 0,
        locationsCount: locationsResult.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Team Members",
      total: stats.teamCount,
      published: null,
      icon: Users,
      href: "/admin/team",
      newHref: "/admin/team/new",
      color: "sand",
    },
    {
      title: "Services",
      total: stats.servicesCount,
      published: null,
      icon: Wrench,
      href: "/admin/services",
      newHref: "/admin/services/new",
      color: "crimson",
    },
    {
      title: "Projects",
      total: stats.projectsCount,
      published: stats.publishedProjectsCount,
      icon: FolderKanban,
      href: "/admin/projects",
      newHref: "/admin/projects/new",
      color: "sand",
    },
    {
      title: "Markets",
      total: stats.marketsCount,
      published: null,
      icon: Factory,
      href: "/admin/markets",
      newHref: "/admin/markets/new",
      color: "crimson",
    },
    {
      title: "News & Events",
      total: stats.newsCount,
      published: stats.publishedNewsCount,
      icon: Newspaper,
      href: "/admin/news",
      newHref: "/admin/news/new",
      color: "sand",
    },
    {
      title: "Job Postings",
      total: stats.jobsCount,
      published: stats.activeJobsCount,
      icon: Briefcase,
      href: "/admin/careers",
      newHref: "/admin/careers/new",
      color: "crimson",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-tactical-100">Dashboard</h1>
        <p className="text-tactical-400 mt-1">
          Manage your website content from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-tactical-900 border border-tactical-700 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    card.color === "sand"
                      ? "bg-sand-500/10"
                      : "bg-crimson-500/10"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      card.color === "sand"
                        ? "text-sand-500"
                        : "text-crimson-500"
                    }`}
                  />
                </div>
                <Link
                  href={card.newHref}
                  className="flex items-center space-x-1 text-sm text-tactical-400 hover:text-sand-400 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New</span>
                </Link>
              </div>

              <h3 className="text-lg font-semibold text-tactical-100 mb-1">
                {card.title}
              </h3>

              {loading ? (
                <div className="h-8 bg-tactical-800 rounded animate-pulse" />
              ) : (
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-tactical-100">
                    {card.total}
                  </span>
                  {card.published !== null && (
                    <span className="text-tactical-500 text-sm">
                      ({card.published} published)
                    </span>
                  )}
                </div>
              )}

              <Link
                href={card.href}
                className="inline-flex items-center text-sm text-sand-400 hover:text-sand-300 mt-4 transition-colors"
              >
                Manage
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-tactical-900 border border-tactical-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-tactical-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/team/new"
            className="flex items-center space-x-3 p-4 bg-tactical-800 hover:bg-tactical-700 border border-tactical-700 hover:border-sand-500/50 rounded-lg transition-colors"
          >
            <Users className="h-5 w-5 text-sand-500" />
            <span className="text-tactical-200">Add Team Member</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center space-x-3 p-4 bg-tactical-800 hover:bg-tactical-700 border border-tactical-700 hover:border-sand-500/50 rounded-lg transition-colors"
          >
            <FolderKanban className="h-5 w-5 text-sand-500" />
            <span className="text-tactical-200">Add Project</span>
          </Link>
          <Link
            href="/admin/news/new"
            className="flex items-center space-x-3 p-4 bg-tactical-800 hover:bg-tactical-700 border border-tactical-700 hover:border-sand-500/50 rounded-lg transition-colors"
          >
            <Newspaper className="h-5 w-5 text-sand-500" />
            <span className="text-tactical-200">Create News Article</span>
          </Link>
          <Link
            href="/admin/careers/new"
            className="flex items-center space-x-3 p-4 bg-tactical-800 hover:bg-tactical-700 border border-tactical-700 hover:border-sand-500/50 rounded-lg transition-colors"
          >
            <Briefcase className="h-5 w-5 text-sand-500" />
            <span className="text-tactical-200">Post New Job</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
