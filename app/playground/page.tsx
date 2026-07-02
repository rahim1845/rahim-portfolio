import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SecHead from "@/components/SecHead";
import PlaygroundGrid from "@/components/PlaygroundGrid";
import Playlist from "@/components/Playlist";

export const metadata: Metadata = {
  title: "Playground",
  description: "Interactive experiments and a vibe-coded playlist of small builds — every one opens as a working prototype.",
  alternates: { canonical: "/playground" },
};

export default function Playground() {
  return (
    <>
      <section className="section deep" style={{ paddingTop: 150 }}>
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

      <section className="section" id="playlist">
        <div className="wrap">
          <SecHead
            title={<>Vibe-coded, <span className="serif-i">a playlist</span></>}
            count="small builds · click any to open the project"
          />
          <Playlist />
        </div>
      </section>
    </>
  );
}
