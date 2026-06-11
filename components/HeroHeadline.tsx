"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TOKENS = ["I", "design", "the", "whole"];

export default function HeroHeadline() {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = el.querySelectorAll<HTMLElement>(".w");
    const strike = el.querySelector<SVGPathElement>(".strike path");
    const rewrite = el.querySelector<HTMLElement>(".rewrite");
    const caret = el.querySelector<HTMLElement>(".caret");
    const sub = document.getElementById("heroSub");
    const meta = document.getElementById("heroMeta");
    const scrollHint = document.getElementById("heroScroll");
    if (!strike || !rewrite) return;

    if (reduced) {
      gsap.set(words, { opacity: 1, filter: "blur(0px)" });
      gsap.set([sub, meta, scrollHint], { opacity: 1, y: 0 });
      gsap.set(strike, { strokeDasharray: 1, strokeDashoffset: 0 });
      gsap.set(rewrite, { opacity: 1 });
      if (caret) caret.style.display = "none";
      return;
    }

    gsap.set(strike, { strokeDasharray: 1, strokeDashoffset: 1 });
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(words, { opacity: 1, filter: "blur(0px)", duration: 0.45, stagger: 0.16, delay: 0.4 })
      .to(strike, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, "+=0.7")
      .fromTo(
        rewrite,
        { opacity: 0, rotation: -10, scale: 0.8, transformOrigin: "left bottom" },
        { opacity: 1, rotation: -3.5, scale: 1, duration: 0.45, ease: "back.out(2)" },
        "-=0.1"
      )
      .to(sub, { opacity: 1, y: 0, duration: 0.7 }, "-=0.1")
      .to(meta, { opacity: 1, duration: 0.6 }, "-=0.4")
      .to(scrollHint, { opacity: 1, duration: 0.6 }, "-=0.3")
      .add(() => {
        if (caret) caret.style.display = "none";
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <h1 ref={root} className="hero-h1" aria-label="I design the whole system, not just the screen.">
      {TOKENS.map((t) => (
        <span key={t} className="w" aria-hidden="true">
          {t}&nbsp;
        </span>
      ))}
      <span className="fix w" aria-hidden="true">
        screen.
        <svg className="strike" viewBox="0 0 200 24" preserveAspectRatio="none">
          <path d="M2 14 C 40 8, 70 20, 105 12 S 175 9, 198 13" pathLength={1} />
        </svg>
        <span className="rewrite">system.</span>
      </span>
      <span className="caret" aria-hidden="true" />
    </h1>
  );
}
