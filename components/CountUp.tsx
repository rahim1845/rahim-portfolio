"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (v: number) => (v >= 1000 ? Math.round(v).toLocaleString("en-US") : String(Math.round(v)));

export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    let started = false;
    const run = (t0: number) => {
      const step = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(to * e);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting && !started) {
            started = true;
            run(performance.now());
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {fmt(val)}
      {suffix}
    </span>
  );
}
