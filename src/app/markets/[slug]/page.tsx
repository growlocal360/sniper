import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Crosshair, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Market, Service } from "@/lib/types";
import ArticleContent from "@/components/editor/ArticleContent";

interface MarketDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: MarketDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: market } = await supabase
    .from("markets")
    .select("name")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!market) {
    return { title: "Market Not Found | Sniper Elite Services" };
  }

  return {
    title: `${market.name} | Markets | Sniper Elite Services`,
    description: `Sniper Elite Services provides precision industrial solutions for the ${market.name} industry.`,
  };
}

export default async function MarketDetailPage({
  params,
}: MarketDetailPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("markets")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) {
    notFound();
  }

  const market = data as Market;

  // Fetch related services
  const { data: servicesData } = await supabase
    .from("services")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  const services = (servicesData as Service[]) || [];

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-tactical-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 crosshair-pattern" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-tactical-950/50 to-transparent" />

        {market.hero_image_url && (
          <>
            <Image
              src={market.hero_image_url}
              alt={market.name}
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-tactical-950/80 via-tactical-900/60 to-tactical-950" />
          </>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-tactical-400 mb-8">
            <Link href="/" className="hover:text-sniper-brand transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/markets"
              className="hover:text-sniper-brand transition-colors"
            >
              Markets
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sniper-brand">{market.name}</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {market.name}
          </h1>
        </div>
      </section>

      {/* Market Content */}
      <section className="py-16 bg-tactical-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-tactical-900 border border-tactical-800 rounded-2xl p-8 sm:p-12">
            <ArticleContent content={market.description} />
          </div>
        </div>
      </section>

      {/* Related Services */}
      {services.length > 0 && (
        <section className="py-16 bg-tactical-950 border-t border-tactical-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3">
                Our Capabilities
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Related Services
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group block bg-tactical-900 border border-tactical-700 hover:border-sniper-brand/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-sniper-brand/5"
                >
                  <div className="p-3 bg-sniper-brand/10 rounded-xl w-fit mb-4 group-hover:bg-sniper-brand/20 transition-colors">
                    <Crosshair className="h-6 w-6 text-sniper-brand" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sniper-brand transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-tactical-400 text-sm mb-4">
                    {service.tagline}
                  </p>
                  <span className="inline-flex items-center text-sniper-brand text-sm font-semibold group-hover:text-sniper-brand transition-colors">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crimson-700 to-crimson-600" />
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 crosshair-pattern opacity-50" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sniper-brand font-semibold tracking-wider uppercase text-sm mb-3">
            Ready to Get Started?
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Need {market.name} Services?
          </h2>
          <p className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-8">
            Our team delivers precision results for {market.name.toLowerCase()}{" "}
            operations. Contact us to discuss your next project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-tactical-100 text-crimson-600 rounded-lg font-bold transition-all shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
            <span>Get a Quote</span>
          </Link>
        </div>
      </section>
    </>
  );
}
