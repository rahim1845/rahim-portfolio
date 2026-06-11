import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PlaygroundGrid from "@/components/PlaygroundGrid";

export const metadata: Metadata = { title: "Playground \u2014 Rahim Rangrez" };

export default function Playground() {
  return (
    <section className="section deep" style={{ paddingTop: 150, minHeight: "100svh" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <h2 className="sec-title">
            The <span className="serif-i">playground</span>
          </h2>
          <span className="sec-count mono">tools i actually built, rules i actually shipped</span>
        </Reveal>
        <Reveal>
          <PlaygroundGrid />
        </Reveal>
      </div>
    </section>
  );
}
