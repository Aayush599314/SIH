import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CTASection } from "@/components/landing/CTASection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--color-void)] text-[var(--color-ink)]">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-lime-400/[0.08] blur-3xl" />

      <div className="relative">
        <LandingNavbar />
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
        <LandingFooter />
      </div>
    </div>
  );
}
