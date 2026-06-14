"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Intensity = "restrained" | "cinematic";

const SURFACES = [
  { tag: "customer app", note: "quick commerce", slug: "tingting", lines: ["a", "b", "c"], x: -150, y: -22, z: -40, appear: 0.02 },
  { tag: "ops · admin", note: "ops tooling", slug: "tingting", lines: ["b", "a", "c"], x: 150, y: 30, z: -230, appear: 0.22 },
  { tag: "themeforge · ai", note: "ai design tokens", slug: "themeforge", lines: ["c", "b", "a"], x: -110, y: 58, z: -430, appear: 0.46 },
  { tag: "assessment", note: "b2b admin ux", slug: "skill-assessment-platform", lines: ["a", "c"], x: 120, y: -50, z: -640, appear: 0.7 },
];

export default function DraftingTable() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [intensity, setIntensity] = useState<Intensity>("restrained");

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrap.classList.add("rm");
      wrap.style.setProperty("--p", "0.5");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const easeCinematic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
    const ease = intensity === "cinematic" ? easeCinematic : (p: number) => p;
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => wrap.style.setProperty("--p", ease(self.progress).toFixed(4)),
    });
    return () => st.kill();
  }, [intensity]);

  return (
    <section ref={wrapRef} className="dtbl-wrap" data-i={intensity} aria-label="The work, shown dimensionally on a drafting table.">
      <div className="dtbl-stage">
        <div className="dtbl-head">
          <div>
            <div className="mono dtbl-eyebrow">the work &middot; dimensionally</div>
            <h2 className="dtbl-title">
              Four kinds of product, <span className="serif-i">one table</span>
            </h2>
          </div>
          <div className="dtbl-compare mono" role="group" aria-label="preview intensity (temporary)">
            <span>preview</span>
            <button className={intensity === "restrained" ? "on" : ""} onClick={() => setIntensity("restrained")}>restrained</button>
            <button className={intensity === "cinematic" ? "on" : ""} onClick={() => setIntensity("cinematic")}>cinematic</button>
          </div>
        </div>

        <div className="dtbl-scene">
          <div className="dtbl-world">
            <div className="dtbl-floor" aria-hidden="true" />
            {SURFACES.map((s) => (
              <Link
                key={s.tag + s.z}
                href={`/work/${s.slug}`}
                className="dtbl-card"
                style={{ "--x": `${s.x}px`, "--y": `${s.y}px`, "--z": `${s.z}px`, "--appear": s.appear } as CSSProperties}
              >
                <div className="dtbl-dots" aria-hidden="true"><i /><i /><i /></div>
                {s.lines.map((c, i) => (
                  <div className={"dtbl-ln " + c} key={i} aria-hidden="true" />
                ))}
                <span className="dtbl-tag mono">{s.tag}</span>
                <span className="dtbl-note" aria-hidden="true">{s.note}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dtbl-foot">
          <span className="dtbl-hint mono"><span className="ln" /> scroll &mdash; the camera walks the table</span>
          <span className="dtbl-temp mono">↑ temporary compare toggle</span>
        </div>
      </div>
    </section>
  );
}
