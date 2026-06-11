"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MarginNote({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      el,
      { opacity: 0, y: 14, rotation: -5 },
      { opacity: 1, y: 0, rotation: -2, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 78%" } }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);
  return (
    <div ref={ref} className="mnote" style={style} aria-hidden="true">
      {children}
    </div>
  );
}
