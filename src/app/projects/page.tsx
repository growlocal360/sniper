import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata = {
  title: "Projects | Sniper Elite Services",
  description:
    "Explore our portfolio of industrial service projects across refining, chemical, renewables, and paper markets.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const typedProjects = (projects as Project[]) || [];

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
            <span className="text-sand-400">Projects</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Our <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-tactical-300 text-lg max-w-2xl mx-auto">
            Precision execution across every project. Explore our track record of
            delivering elite industrial services.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-tactical-400 text-lg">
                No projects to display yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
