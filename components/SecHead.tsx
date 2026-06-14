"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SecHead({ title, count }: { title: React.ReactNode; count?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const valRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const rule = ruleRef.current;
    if (!el || !rule) return;
    el.classList.add("dimd");
    const measure = () => {
      if (valRef.current) valRef.current.textContent = Math.round(el.getBoundingClientRect().width) + " px";
    };
    const raf = requestAnimationFrame(measure);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.remove("reveal-init");
      rule.classList.add("draw");
      window.addEventListener("resize", measure);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", measure);
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
        onEnter: () => {
          measure();
          rule.classList.add("draw");
        },
      },
    });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      tween.scrollTrigger?.kill();
      tween.kill();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} className="sec-head reveal-init">
      <h2 className="sec-title">{title}</h2>
      {count != null && <span className="sec-count mono">{count}</span>}
      <div ref={ruleRef} className="dimrule" aria-hidden="true">
        <i className="run" />
        <i className="tick l" />
        <i className="tick r" />
        <i className="ar l" />
        <i className="ar r" />
        <span ref={valRef} className="dim-val" />
      </div>
    </div>
  );
}
