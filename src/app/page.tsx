import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/layout/Marquee";
import { Problem } from "@/components/sections/Problem";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { WhyItClicks } from "@/components/sections/WhyItClicks";
import { WebsiteCTA } from "@/components/sections/WebsiteCTA";

/**
 * The homepage is the portfolio.
 *
 * Order is an argument: statement → problem → proof → work → what we do →
 * how → why it holds up → send us your site.
 */

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      {/* ink → blue → paper. The hinge between the problem and the proof. */}
      <Marquee />
      <SelectedWork />
      <Services />
      <Process />
      <WhyItClicks />
      <WebsiteCTA />
    </>
  );
}
