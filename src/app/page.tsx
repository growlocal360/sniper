import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import StatsBar from "@/components/StatsBar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import MarketsGrid from "@/components/MarketsGrid";
import SafetySection from "@/components/SafetySection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <StatsBar />
      <ProjectsShowcase />
      <MarketsGrid />
      <SafetySection />
      <CTASection />
    </>
  );
}
