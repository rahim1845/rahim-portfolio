"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Reveal({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "section" | "article" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.remove("reveal-init");
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={("reveal-init " + className).trim()}>
      {children}
    </Tag>
  );
}
