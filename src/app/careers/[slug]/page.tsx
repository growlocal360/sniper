import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  Calendar,
  Crosshair,
} from "lucide-react";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import type { JobPosting } from "@/lib/types";
import ArticleContent from "@/components/editor/ArticleContent";

interface CareerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: job } = await supabase
    .from("job_postings")
    .select("title, location, employment_type")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!job) {
    return { title: "Position Not Found | Sniper Elite Services" };
  }

  return {
    title: `${job.title} | Careers | Sniper Elite Services`,
    description: `${job.title} - ${job.employment_type} position in ${job.location}. Apply now at Sniper Elite Services.`,
  };
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("job_postings")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    notFound();
  }

  const job = data as JobPosting;

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
            <Link href="/" className="hover:text-sniper-brand transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/careers"
              className="hover:text-sniper-brand transition-colors"
            >
              Careers
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sniper-brand truncate max-w-[200px]">
              {job.title}
            </span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {job.title}
          </h1>

          {/* Job Meta */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-tactical-300 text-sm">
            {job.department && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-tactical-800/60 rounded-full">
                <Briefcase className="h-4 w-4 text-sniper-brand" />
                {job.department}
              </span>
            )}
            <span className="flex items-center gap-1.5 px-3 py-1 bg-tactical-800/60 rounded-full">
              <MapPin className="h-4 w-4 text-sniper-brand" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-tactical-800/60 rounded-full">
              <Clock className="h-4 w-4 text-sniper-brand" />
              {job.employment_type}
            </span>
            {job.salary_range && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-tactical-800/60 rounded-full">
                <DollarSign className="h-4 w-4 text-sniper-brand" />
                {job.salary_range}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Job Content */}
      <section className="py-16 bg-tactical-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Job Info Bar */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {job.department && (
              <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-4">
                <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                  Department
                </p>
                <p className="text-white font-semibold">{job.department}</p>
              </div>
            )}
            <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-4">
              <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                Location
              </p>
              <p className="text-white font-semibold">{job.location}</p>
            </div>
            <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-4">
              <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                Employment Type
              </p>
              <p className="text-white font-semibold">{job.employment_type}</p>
            </div>
            {job.salary_range && (
              <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-4">
                <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                  Salary Range
                </p>
                <p className="text-white font-semibold">{job.salary_range}</p>
              </div>
            )}
            {job.published_at && (
              <div className="bg-tactical-900 border border-tactical-800 rounded-xl p-4">
                <p className="text-xs text-tactical-500 uppercase tracking-wider mb-1">
                  Posted
                </p>
                <p className="text-white font-semibold flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-sniper-brand" />
                  {format(new Date(job.published_at), "MMM d, yyyy")}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Job Description
            </h2>
            <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8 sm:p-12">
              <ArticleContent content={job.description} />
            </div>
          </div>

          {/* Requirements */}
          {job.requirements && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                Requirements
              </h2>
              <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8 sm:p-12">
                <ArticleContent content={job.requirements} />
              </div>
            </div>
          )}

          {/* Apply CTA */}
          <div className="relative py-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600" />
            <div className="absolute inset-0 crosshair-pattern opacity-50" />

            <div className="relative text-center px-6">
              <h3 className="text-2xl font-bold text-white mb-3">
                Ready to Apply?
              </h3>
              <p className="text-red-300/80 mb-6 max-w-lg mx-auto">
                Send us your resume and cover letter. We look forward to hearing
                from you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-tactical-100 text-red-600 rounded-lg font-bold transition-all shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span>Apply Now</span>
                </Link>
                <a
                  href="mailto:careers@sniper-elite.com"
                  className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-all"
                >
                  <span>Email Your Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sniper-brand hover:text-sniper-brand font-semibold transition-colors"
            >
              <Crosshair className="h-4 w-4" />
              View All Positions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
