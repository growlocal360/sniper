import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Service, SubService } from "@/lib/types";
import ServiceDetailContent from "./ServiceDetailContent";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("name, tagline")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!service) {
    return {
      title: "Service Not Found | Sniper Elite Services",
    };
  }

  return {
    title: `${service.name} | Sniper Elite Services`,
    description: service.tagline,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!service) {
    notFound();
  }

  const typedService = service as Service;

  const { data: subServices } = await supabase
    .from("sub_services")
    .select("*")
    .eq("service_id", typedService.id)
    .eq("published", true)
    .order("display_order", { ascending: true });

  const typedSubServices: SubService[] = subServices || [];

  return (
    <ServiceDetailContent
      service={typedService}
      subServices={typedSubServices}
    />
  );
}
