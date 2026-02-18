import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Location } from "@/lib/types";
import LocationsGrid from "./LocationsGrid";

export const metadata = {
  title: "Our Locations | Sniper Elite Services",
  description:
    "Find Sniper Elite Services offices and service centers. Headquartered in Sulphur, Louisiana with strategic locations across the Gulf Coast.",
};

export default async function LocationsPage() {
  const supabase = await createClient();

  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .eq("published", true)
    .order("is_headquarters", { ascending: false })
    .order("name", { ascending: true });

  const locationList: Location[] = locations || [];

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
            <Link href="/" className="hover:text-sniper-brand transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href="/company"
              className="hover:text-sniper-brand transition-colors"
            >
              Company
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-sniper-brand">Locations</span>
          </nav>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Our <span className="text-gradient">Locations</span>
          </h1>
          <p className="text-xl text-tactical-300 max-w-2xl mx-auto">
            Strategically positioned across the Gulf Coast to deliver rapid
            response and reliable service to your facility.
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="relative py-24 bg-tactical-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {locationList.length > 0 ? (
            <LocationsGrid locations={locationList} />
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex p-6 bg-tactical-800/50 rounded-full mb-6">
                <MapPin className="h-12 w-12 text-tactical-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Locations Coming Soon
              </h3>
              <p className="text-tactical-400 max-w-md mx-auto mb-8">
                Our location details are being updated. In the meantime, contact
                us directly for service in your area.
              </p>

              {/* Fallback static HQ card */}
              <div className="max-w-md mx-auto bg-tactical-800/50 border border-sniper-brand/30 rounded-2xl p-8 text-left">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-sniper-brand/20 text-sniper-brand text-xs font-bold rounded-full uppercase tracking-wider">
                    Headquarters
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white mb-4">
                  Sulphur, Louisiana
                </h4>
                <div className="space-y-3 text-tactical-300 text-sm">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-4 w-4 text-sniper-brand mt-0.5 flex-shrink-0" />
                    <span>
                      1396 Swisco Rd.
                      <br />
                      Sulphur, LA 70665
                    </span>
                  </div>
                </div>
              </div>
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
            Need Service in Your Area?
          </h2>
          <p className="text-crimson-300/80 text-lg max-w-2xl mx-auto mb-10">
            Our teams deploy across the Gulf Coast and beyond. Contact us to
            discuss your project requirements and our availability in your region.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-tactical-100 text-crimson-600 rounded-lg font-bold transition-all shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
            <a
              href="tel:1-855-827-4387"
              className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white rounded-lg font-semibold transition-all"
            >
              <span>Call 1-855-TARGETS</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
