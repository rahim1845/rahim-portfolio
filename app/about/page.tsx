import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Highlight from "@/components/Highlight";
import MarginNote from "@/components/MarginNote";

export const metadata: Metadata = { title: "About \u2014 Rahim Rangrez" };

export default function About() {
  return (
    <section className="section" style={{ paddingTop: 150 }}>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal className="sec-head">
          <h2 className="sec-title">
            About, <span className="serif-i">briefly</span>
          </h2>
          <span className="sec-count mono">engineer first, designer by conviction</span>
        </Reveal>
        <div className="about-grid">
          <Reveal className="portrait">
            <span className="init">RR</span>
            <span className="ph-note mono">mumbai, india &middot; works everywhere</span>
          </Reveal>
          <Reveal className="about-body">
            <p>
              I came to design from mechanical engineering, which is why I can&apos;t treat an interface as a
              picture. Everything is a system with <Highlight>loads, tolerances, and failure modes</Highlight>,
              and the interesting failures are never on the screen.
            </p>
            <p>
              My best work lives where design meets operations: I was the founding designer of TingTing, a
              quick-commerce ecosystem covering the customer app, store fulfilment, and admin operations for a
              30-store chain. Five years in, the pattern I keep returning to is the same: <b>design the system,
              and the screens follow</b>.
            </p>
            <p>
              Lately that system is AI. I build my own tools, an AI design-system generator, Figma automation
              plugins, gesture-tracking prototypes, because the fastest way to understand a material is to make
              things with it. Long term, I want this skillset pointed at affordable bionics and free education.
              Short term, I want to do the best systems design work of my career on a team shipping AI products.
            </p>
            <div className="facts">
              <div className="fact"><span className="k mono">now</span><span className="v">Senior Product Designer &middot; Diamond Atelier, Mumbai</span></div>
              <div className="fact"><span className="k mono">before</span><span className="v">Founding designer, TingTing (quick commerce) &middot; Kanini &middot; AppIncubator</span></div>
              <div className="fact"><span className="k mono">tools</span><span className="v">Figma + its plugin API, design tokens, Flutter/Material systems, Claude &amp; GPT APIs, Next.js</span></div>
              <div className="fact"><span className="k mono">writes</span><span className="v"><a href="https://www.linkedin.com/newsletters/weekly-design-zaiqa-7346642262941933568/" target="_blank" rel="noreferrer">Weekly Design Zaiqa &#8599;</a></span></div>
              <div className="fact"><span className="k mono">believes</span><span className="v">the operator is a user too; the rule should hold so people don&apos;t have to</span></div>
              <div className="fact"><span className="k mono">resume</span><span className="v"><a href="https://drive.google.com/file/d/13h7CcaKzCGYpSZQMwr491nwOS63EeXTU/view" target="_blank" rel="noreferrer">one page, pdf &#8599;</a></span></div>
            </div>
          </Reveal>
        </div>
        <MarginNote style={{ top: "6%", right: "1%" }}>
          ask me about the 30-store rollout. i have stories &rarr;
        </MarginNote>
      </div>
    </section>
  );
}
