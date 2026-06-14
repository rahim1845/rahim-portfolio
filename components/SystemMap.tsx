"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const SURFACES = [
  { l: 3, tag: "customer app", lines: ["a", "b", "c"] },
  { l: 2, tag: "store panel", lines: ["b", "a", "c"] },
  { l: 1, tag: "rider app", lines: ["c", "b", "a"] },
];

export default function SystemMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [exploded, setExploded] = useState(false);
  const userSet = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setExploded(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !userSet.current) {
            setExploded(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="cs-widget sysmap wide" aria-label="Exploded axonometric diagram: TingTing's customer app, store panel and rider app all sit on one shared system layer (one token set, one phone ID, one geofence).">
      <div className="sm-bar">
        <span className="mono">tingting &middot; four surfaces, one system</span>
        <button
          className="sm-tog mono"
          onClick={() => {
            userSet.current = true;
            setExploded((v) => !v);
          }}
          aria-pressed={!exploded}
        >
          {exploded ? "▲ collapse to one screen" : "▼ explode the system"}
        </button>
      </div>

      <div className="sm-stage">
        <div ref={ref} className={"sm-world" + (exploded ? " exploded" : "")}>
          {SURFACES.map((s) => (
            <div className="sm-plane" style={{ "--l": s.l } as CSSProperties} key={s.tag}>
              <div className="sm-dots"><i /><i /><i /></div>
              {s.lines.map((c, i) => (
                <div className={"sm-ln " + c} key={i} />
              ))}
              <span className="sm-pl-tag mono">{s.tag}</span>
            </div>
          ))}
          <div className="sm-plane base" style={{ "--l": 0 } as CSSProperties}>
            <div className="sm-core mono">
              <span>one token set</span>
              <span>one phone ID</span>
              <span>one geofence</span>
            </div>
            <span className="sm-pl-tag mono">shared system</span>
          </div>
        </div>
      </div>

      <span className="sm-note">most people design<br />the top layer &#8600;</span>
      <figcaption className="mono">exploded axonometric &middot; the layer the user never sees</figcaption>
    </figure>
  );
}
