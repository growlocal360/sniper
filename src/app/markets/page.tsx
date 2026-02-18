import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Crosshair, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Market } from "@/lib/types";

export const metadata = {
  title: "Markets We Serve | Sniper Elite Services",
  description:
    "Sniper Elite Services delivers precision industrial solutions across refining, chemical, renewables, and paper markets.",
};

export default async function MarketsPage() {
  const supabase = await createClient();
  const { data: markets } = await supabase
    .from("markets")
    .select("*")
    .eq("published", true)
    .order("display_order", { ascending: true });

  const typedMarkets = (markets as Market[]) || [];

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
            <span className="text-sand-400">Markets</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Markets We <span className="text-gradient">Serve</span>
          </h1>
          <p className="text-tactical-300 text-lg max-w-2xl mx-auto">
            Delivering precision industrial services across key market sectors
            with military-grade reliability.
          </p>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="py-20 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {typedMarkets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {typedMarkets.map((market) => (
                <Link
                  key={market.id}
                  href={`/markets/${market.slug}`}
                  className="group block h-full bg-tactical-900 border border-tactical-700 hover:border-sand-500/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-sand-500/5"
                >
                  {/* Icon / Hero Image */}
                  {market.hero_image_url ? (
                    <div className="relative h-48 bg-tactical-800 overflow-hidden">
                      <Image
                        src={market.hero_image_url}
                        alt={market.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-tactical-900 to-transparent" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 bg-tactical-800">
                      {market.icon_url ? (
                        <Image
                          src={market.icon_url}
                          alt={market.name}
                          width={48}
                          height={48}
                          className="opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <div className="p-4 bg-sand-500/10 rounded-2xl group-hover:bg-sand-500/20 transition-colors">
                          <Crosshair className="h-10 w-10 text-sand-500" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sand-400 transition-colors">
                      {market.name}
                    </h3>

                    <p className="text-tactical-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {/* Extract text preview from JSONContent description */}
                      {typeof market.description === "object" &&
                      market.description?.content
                        ? market.description.content
                            .map((node: { content?: { text?: string }[] }) =>
                              node.content
                                ?.map(
                                  (child: { text?: string }) => child.text || ""
                                )
                                .join("")
                            )
                            .join(" ")
                            .slice(0, 150) + "..."
                        : "Learn more about our services in this market."}
                    </p>

                    <span className="inline-flex items-center text-sand-400 text-sm font-semibold group-hover:text-sand-300 transition-colors">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-tactical-400 text-lg">
                No markets to display yet. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
