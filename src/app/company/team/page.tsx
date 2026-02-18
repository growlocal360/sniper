import Link from "next/link";
import Image from "next/image";
import { ChevronRight, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types";
import TeamGrid from "./TeamGrid";

export const metadata = {
  title: "Our Team | Sniper Elite Services",
  description:
    "Meet the elite professionals behind Sniper Elite Services. 200+ experienced catalyst, welding, and mechanical service experts.",
};

export default async function TeamPage() {
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("team_members")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  const teamMembers: TeamMember[] = members || [];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-tactical-900" />
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-tactical-950/50 via-transparent to-tactical-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center space-x-2 text-sm text-tactical-400 mb-6">
            <Link href="/" className="hover:text-sand-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/company"
              className="hover:text-sand-400 transition-colors"
            >
              Company
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sand-400">Our Team</span>
          </nav>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Our <span className="text-gradient">Team</span>
          </h1>
          <p className="text-xl text-tactical-300 max-w-2xl mx-auto">
            Meet the elite professionals who bring precision, expertise, and
            dedication to every project.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamMembers.length > 0 ? (
            <TeamGrid members={teamMembers} />
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex p-6 bg-tactical-800/50 rounded-full mb-6">
                <User className="h-12 w-12 text-tactical-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Team Coming Soon
              </h3>
              <p className="text-tactical-400 max-w-md mx-auto">
                Our team profiles are being prepared. Check back soon to meet the
                elite professionals behind Sniper Elite Services.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crimson-700 to-crimson-600" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 crosshair-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join Our Elite Team
          </h2>
          <p className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-10">
            We are always looking for skilled professionals who share our commitment
            to precision and safety. Explore career opportunities with Sniper Elite.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/careers"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-tactical-100 text-crimson-600 rounded-lg font-bold transition-all shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
              <span>View Open Positions</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-all"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
