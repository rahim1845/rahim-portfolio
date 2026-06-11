"use client";

import { useEffect, useRef } from "react";

export default function Highlight({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("hl-on");
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
    <span ref={ref} className="hl">
      {children}
    </span>
  );
}
