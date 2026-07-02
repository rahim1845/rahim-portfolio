"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

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
    const titleEl = el.querySelector<HTMLElement>(".sec-title");
    const countEl = el.querySelector<HTMLElement>(".sec-count");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(measure);
      rule.classList.add("draw");
      return;
    }

    gsap.registerPlugin(ScrollTrigger, SplitText);
    let killed = false;
    let cleanup = () => {};
    if (titleEl) titleEl.style.visibility = "hidden";

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => {
      if (killed || !titleEl) return;
      requestAnimationFrame(() => {
        if (killed) return;
        const split = SplitText.create(titleEl, { type: "lines", mask: "lines", linesClass: "lr-line" });
        gsap.set(split.lines, { yPercent: 115 });
        titleEl.style.visibility = "visible";
        if (countEl) gsap.set(countEl, { opacity: 0, y: 10 });
        measure();
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", onEnter: () => rule.classList.add("draw") },
        });
        tl.to(split.lines, { yPercent: 0, duration: 0.85, ease: "power3.out", stagger: 0.1 });
        if (countEl) tl.to(countEl, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");
        cleanup = () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          split.revert();
        };
      });
    });

    window.addEventListener("resize", measure);
    return () => {
      killed = true;
      cleanup();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} className="sec-head">
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
