import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, MapPin, Crosshair } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import ArticleContent from "@/components/editor/ArticleContent";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!project) {
    return { title: "Project Not Found | Sniper Elite Services" };
  }

  return {
    title: `${project.title} | Sniper Elite Services`,
    description: project.excerpt,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    notFound();
  }

  const project = data as Project;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-tactical-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-tactical-950/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-tactical-400 mb-8">
            <Link href="/" className="hover:text-sand-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/projects"
              className="hover:text-sand-400 transition-colors"
            >
              Projects
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sand-400 truncate max-w-[200px]">
              {project.title}
            </span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-tactical-300 text-lg max-w-2xl mx-auto">
            {project.excerpt}
          </p>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 bg-tactical-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {project.featured_image && (
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-tactical-800">
              <Image
                src={project.featured_image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Project Details */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-5">
              <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                Client
              </p>
              <p className="text-white font-semibold">{project.client}</p>
            </div>
            {project.location && (
              <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-5">
                <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                  Location
                </p>
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-sand-500" />
                  {project.location}
                </p>
              </div>
            )}
            <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-5">
              <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                Market
              </p>
              <p className="text-white font-semibold">{project.market}</p>
            </div>
            {project.services_used && project.services_used.length > 0 && (
              <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-5">
                <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                  Services
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.services_used.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-0.5 bg-sand-500/10 text-sand-400 text-xs font-medium rounded-full border border-sand-500/20"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8 sm:p-12">
            <ArticleContent content={project.description} />
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sand-400 hover:text-sand-300 font-semibold transition-colors"
            >
              <Crosshair className="h-4 w-4" />
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
