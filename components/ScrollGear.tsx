"use client";

import { useEffect, useRef } from "react";

function Gear({
  cx,
  cy,
  r,
  teeth,
  toothH,
  toothW,
  gref,
  className = "",
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  toothH: number;
  toothW: number;
  gref: React.Ref<SVGGElement>;
  className?: string;
}) {
  const rects = Array.from({ length: teeth }, (_, i) => {
    const ang = (i * 360) / teeth;
    return (
      <rect
        key={i}
        x={cx - toothW / 2}
        y={cy - r - toothH + 0.5}
        width={toothW}
        height={toothH + 1}
        rx={0.6}
        transform={`rotate(${ang} ${cx} ${cy})`}
      />
    );
  });
  return (
    <g ref={gref} className={"sg-gear " + className}>
      {rects}
      <circle cx={cx} cy={cy} r={r} />
      <circle className="hub" cx={cx} cy={cy} r={r * 0.34} />
    </g>
  );
}

export default function ScrollGear() {
  const g1 = useRef<SVGGElement>(null);
  const g2 = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let ticking = false;
    const C1 = { x: 46, y: 44 };
    const C2 = { x: 27, y: 26 };
    const update = () => {
      const rot = window.scrollY * 0.22;
      g1.current?.setAttribute("transform", `rotate(${rot.toFixed(2)} ${C1.x} ${C1.y})`);
      g2.current?.setAttribute("transform", `rotate(${(-rot * 1.75).toFixed(2)} ${C2.x} ${C2.y})`);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scrollgear" aria-hidden="true">
      <svg viewBox="0 0 72 72">
        <Gear gref={g1} cx={46} cy={44} r={14} teeth={12} toothH={4} toothW={3.2} />
        <Gear gref={g2} cx={27} cy={26} r={8} teeth={8} toothH={3.4} toothW={2.8} className="sm" />
      </svg>
    </div>
  );
}
