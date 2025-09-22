import dynamic from "next/dynamic";
import { Suspense } from "react";

// Critical above-the-fold content - always loaded
import HeroSection from "@/components/sections/hero-section";

// Lazy load only heavy or below-the-fold components
// Remove "ssr: true" to actually benefit from lazy loading
const MissionVisionSection = dynamic(
  () => import("@/components/sections/mission-vision-section")
);

const ScriptureSection = dynamic(
  () => import("@/components/sections/scripture-section")
);

const StrategySection = dynamic(
  () => import("@/components/sections/strategy-section")
);

const PracticalInfoSection = dynamic(
  () => import("@/components/sections/practical-info-section")
);

// Footer is lightweight and often visible, so direct import
import Footer from "@/components/layout/footer";

/**
 * Optimized Landing Page following Next.js 14 best practices:
 *
 * 1. **Critical CSS**: Hero section uses direct import for immediate render
 * 2. **Progressive Enhancement**: Below-fold sections are truly lazy-loaded
 * 3. **No SSR for lazy components**: Reduces initial HTML size
 * 4. **Smart Loading**: Only lazy-load components that benefit from it
 *
 * When to use dynamic imports:
 * - Heavy components (charts, maps, etc.)
 * - Conditionally rendered components
 * - Below-the-fold content that might not be viewed
 * - Components with large dependencies
 */
export default function OptimizedLandingPage() {
  return (
    <div className="min-h-screen bg-bold text-white">
      {/* Hero Section - Immediately visible, no lazy loading */}
      <HeroSection />

      {/* Below-the-fold sections with true lazy loading */}
      <Suspense fallback={<div className="h-96" />}>
        <MissionVisionSection />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <ScriptureSection />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <StrategySection />
      </Suspense>

      <Suspense fallback={<div className="h-96" />}>
        <PracticalInfoSection />
      </Suspense>

      {/* Footer - Light component, direct import */}
      <Footer />
    </div>
  );
}
