import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SecHead from "@/components/SecHead";
import PlaygroundGrid from "@/components/PlaygroundGrid";

export const metadata: Metadata = { title: "Playground \u2014 Rahim Rangrez" };

export default function Playground() {
  return (
    <section className="section deep" style={{ paddingTop: 150, minHeight: "100svh" }}>
      <div className="wrap">
        <SecHead
          title={<>The <span className="serif-i">playground</span></>}
          count="tools i actually built, rules i actually shipped"
        />
        <Reveal>
          <PlaygroundGrid />
        </Reveal>
      </div>
    </section>
  );
}
