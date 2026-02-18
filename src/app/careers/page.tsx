import Link from "next/link";
import { ChevronRight, Shield, Users, Award, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { JobPosting } from "@/lib/types";
import JobCard from "@/components/careers/JobCard";

export const metadata = {
  title: "Careers | Sniper Elite Services",
  description:
    "Join the Sniper Elite team. Explore career opportunities in catalyst services, specialty welding, and mechanical services.",
};

const whyWorkHere = [
  {
    icon: Shield,
    title: "Safety First Culture",
    description:
      "Our zero-incident mindset means every team member goes home safe. Industry-leading safety training and protocols.",
  },
  {
    icon: Users,
    title: "Elite Team Environment",
    description:
      "Work alongside the best in the industry. Collaborative teams that deliver precision results under pressure.",
  },
  {
    icon: Award,
    title: "Growth & Development",
    description:
      "Continuous training, certifications, and advancement opportunities. We invest in our people.",
  },
  {
    icon: Heart,
    title: "Competitive Benefits",
    description:
      "Comprehensive health coverage, competitive pay, per diem, travel support, and retirement plans.",
  },
];

export default async function CareersPage() {
  const supabase = await createClient();

  const now = new Date().toISOString();
  const { data: jobs } = await supabase
    .from("job_postings")
    .select("*")
    .eq("published", true)
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order("created_at", { ascending: false });

  const typedJobs = (jobs as JobPosting[]) || [];

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
            <span className="text-sniper-brand">Careers</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Join the <span className="text-gradient">Elite</span>
          </h1>
          <p className="text-tactical-300 text-lg max-w-2xl mx-auto">
            Build your career with an industry leader. We are always looking for
            skilled professionals who thrive under pressure.
          </p>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="py-20 bg-tactical-900">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3">
              Why Sniper Elite?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Work at Sniper Elite
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyWorkHere.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-tactical-800/50 border border-tactical-700 rounded-2xl p-6 text-center"
                >
                  <div className="inline-flex p-3 bg-sniper-brand/10 rounded-xl mb-4">
                    <Icon className="h-7 w-7 text-sniper-brand" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-tactical-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-tactical-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3">
              Open Positions
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Current Openings
            </h2>
          </div>

          {typedJobs.length > 0 ? (
            <div className="space-y-4">
              {typedJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-tactical-900 border border-tactical-800 rounded-2xl">
              <p className="text-tactical-400 text-lg mb-4">
                No open positions at this time.
              </p>
              <p className="text-tactical-500 text-sm max-w-md mx-auto">
                We are always interested in hearing from talented professionals.
                Send your resume to{" "}
                <a
                  href="mailto:careers@sniper-elite.com"
                  className="text-sniper-brand hover:text-sniper-brand transition-colors"
                >
                  careers@sniper-elite.com
                </a>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crimson-700 to-crimson-600" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 crosshair-pattern opacity-50" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Don&apos;t See Your Role?
          </h2>
          <p className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-8">
            We are growing fast and always looking for top talent. Reach out and
            tell us how you can contribute to the Sniper Elite mission.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-tactical-100 text-crimson-600 rounded-lg font-bold transition-all shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
            <span>Contact Us</span>
          </Link>
        </div>
      </section>
    </>
  );
}
