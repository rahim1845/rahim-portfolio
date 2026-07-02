"use client";

import Link from "next/link";
import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Media = { type: "image" | "video"; src: string };
type Surface = { tag: string; note: string; slug: string; media: Media; x: number; y: number; z: number; appear: number };

const SURFACES: Surface[] = [
  { tag: "customer app", note: "quick commerce", slug: "tingting", media: { type: "image", src: "/work/surface-customer.png" }, x: -210, y: -40, z: -10, appear: 0.02 },
  { tag: "ops · admin", note: "live ops board", slug: "tingting", media: { type: "video", src: "/work/surface-ops.mp4" }, x: 205, y: 16, z: -250, appear: 0.24 },
  { tag: "ai · unfold", note: "voice → idea", slug: "themeforge", media: { type: "image", src: "/work/surface-ai.webp" }, x: -165, y: 80, z: -470, appear: 0.48 },
  { tag: "design system", note: "one token set", slug: "tingting", media: { type: "image", src: "/work/surface-design.webp" }, x: -230, y: -118, z: -700, appear: 0.72 },
];

export default function DraftingTable() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.classList.add("rm");
      wrap.style.setProperty("--p", "0.5");
      wrap.querySelectorAll("video").forEach((v) => {
        v.autoplay = false;
        v.pause();
      });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => wrap.style.setProperty("--p", self.progress.toFixed(4)),
    });
    return () => st.kill();
  }, []);

  return (
    <section ref={wrapRef} className="dtbl-wrap" data-i="restrained" aria-label="The work, shown dimensionally on a drafting table.">
      <div className="dtbl-stage">
        <div className="dtbl-grid" aria-hidden="true" />
        <div className="dtbl-glow" aria-hidden="true" />
        <div className="dtbl-head">
          <div>
            <div className="mono dtbl-eyebrow">the work &middot; dimensionally</div>
            <h2 className="dtbl-title">
              Four kinds of product, <span className="serif-i">one table</span>
            </h2>
          </div>
        </div>

        <div className="dtbl-scene">
          <div className="dtbl-world">
            {SURFACES.map((s) => (
              <Link
                key={s.tag + s.z}
                href={`/work/${s.slug}`}
                className="dtbl-card"
                aria-label={s.tag}
                style={{ "--x": `${s.x}px`, "--y": `${s.y}px`, "--z": `${s.z}px`, "--appear": s.appear } as CSSProperties}
              >
                <span className="dtbl-screen" aria-hidden="true">
                  {s.media.type === "video" ? (
                    <video src={s.media.src} muted loop playsInline autoPlay preload="metadata" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.media.src} alt="" loading="lazy" />
                  )}
                </span>
                <span className="dtbl-tag mono">{s.tag}</span>
                <span className="dtbl-note" aria-hidden="true">{s.note}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dtbl-foot">
          <span className="dtbl-hint mono"><span className="ln" /> scroll &mdash; the camera walks the table</span>
        </div>
      </div>
    </section>
  );
}
