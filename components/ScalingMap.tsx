"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "@/components/CountUp";

const N = 30;
const CX = 120;
const CY = 102;
const R = 78;
const GOLDEN = 2.399963229728653;

const dots = Array.from({ length: N }, (_, i) => {
  const rr = R * Math.sqrt((i + 0.5) / N);
  const th = i * GOLDEN;
  return { x: +(CX + rr * Math.cos(th)).toFixed(1), y: +(CY + rr * Math.sin(th)).toFixed(1) };
});

export default function ScalingMap() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setLive(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={ref} className={"cs-widget scalemap wide" + (live ? " live" : "")} aria-label="We launched to one store inside a 5 km geofence, then grew to thirty, each inheriting the last one's fixes.">
      <div className="scl-stat">
        <div className="scl-num">
          <span className="scl-from">01</span>
          <span className="scl-arrow serif-i">&rarr;</span>
          <CountUp to={N} className="scl-to" />
        </div>
        <div className="scl-label mono">stores, one geofence</div>
        <p className="scl-copy">
          We didn&apos;t launch to thirty. One store ran clean inside a 5&nbsp;km radius first &mdash; every store
          after it inherited the fixes.
        </p>
      </div>

      <svg className="scl-map" viewBox="0 0 240 204" role="img" aria-hidden="true">
        <circle className="scl-fence" cx={CX} cy={CY} r={R + 14} />
        <line className="scl-radius" x1={CX} y1={CY} x2={CX + R + 14} y2={CY} />
        <text className="scl-rkm" x={CX + 20} y={CY - 6}>5 km</text>
        {dots.map((d, i) => (
          <circle
            key={i}
            className={"scl-dot" + (i === 0 ? " first" : "")}
            cx={d.x}
            cy={d.y}
            r={i === 0 ? 5 : 3.4}
            style={{ transitionDelay: `${0.25 + i * 0.045}s` }}
          />
        ))}
      </svg>
      <figcaption className="mono">0 &rarr; 1 &rarr; 30 &middot; one store at a time</figcaption>
    </figure>
  );
}
