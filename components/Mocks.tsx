"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MockKind = "tingting" | "assessment" | "themeforge" | "glassbox";

export default function Mock({ kind }: { kind: MockKind }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const sel = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
    const rows = sel(".order-head, .order-step, .adm-row, .src-row, .tf-prompt, .tf-label, .gb-head, .gb-row");
    const checks = sel(".order-step.done .st, .chipst.pass, .gb-row.done .gb-tick, .gb-row.fail .gb-x");
    const swatches = sel(".tf-swatches i");
    const subs = sel(".sub-chip, .gb-chip, .gb-replay");

    if (rows.length) gsap.set(rows, { opacity: 0, y: 12 });
    if (checks.length) gsap.set(checks, { scale: 0, transformOrigin: "center" });
    if (swatches.length) gsap.set(swatches, { scaleX: 0, transformOrigin: "left center" });
    if (subs.length) gsap.set(subs, { opacity: 0 });

    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 85%" } });
    if (rows.length) tl.to(rows, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power3.out" });
    if (swatches.length) tl.to(swatches, { scaleX: 1, duration: 0.45, stagger: 0.07, ease: "power2.out" }, "-=0.3");
    if (checks.length) tl.to(checks, { scale: 1, duration: 0.4, stagger: 0.14, ease: "back.out(2.5)" }, "-=0.35");
    if (subs.length) tl.to(subs, { opacity: 1, duration: 0.3 }, "-=0.2");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      gsap.set([...rows, ...checks, ...swatches, ...subs], { clearProps: "all" });
    };
  }, []);

  if (kind === "tingting") {
    return (
      <div className="p-visual" ref={ref} aria-hidden="true">
        <div className="win-bar"><i /><i /><i /></div>
        <div className="order-head">
          <span>Order #4D21 &middot; Royal-Mart HSR</span>
          <span className="src">deliver in 18 min</span>
        </div>
        <div className="order-step done"><span className="st">&#10003;</span>Order confirmed</div>
        <div className="order-step done">
          <span className="st">&#10003;</span>Packing &middot; 12 of 14 items
          <span className="sub-chip">1 substituted</span>
        </div>
        <div className="order-step done"><span className="st">&#10003;</span>Rider assigned &middot; 1.2 km away</div>
        <div className="order-step"><span className="st">4</span>Delivered</div>
        <div className="src-row">
          <span className="src">customer app</span>
          <span className="src">store panel</span>
          <span className="src">admin ops</span>
        </div>
      </div>
    );
  }
  if (kind === "assessment") {
    return (
      <div className="p-visual" ref={ref} aria-hidden="true">
        <div className="win-bar"><i /><i /><i /></div>
        <div className="order-head">
          <span>Frontend hiring &middot; June cohort</span>
          <span className="src">14 candidates</span>
        </div>
        <div className="adm-row"><span>Priya N.</span><span className="chipst pass">evaluated &middot; 86%</span></div>
        <div className="adm-row"><span>Arjun K.</span><span className="chipst">in progress</span></div>
        <div className="adm-row"><span>Sneha R.</span><span className="chipst">invited</span></div>
        <div className="adm-row"><span>Vikram T.</span><span className="chipst pass">evaluated &middot; 74%</span></div>
      </div>
    );
  }
  if (kind === "glassbox") {
    return (
      <div className="p-visual" ref={ref} aria-hidden="true">
        <div className="win-bar"><i /><i /><i /></div>
        <div className="gb-head">
          <span>run &middot; triage-agent &middot; #A91</span>
          <span className="gb-status fail">failed</span>
        </div>
        <div className="gb-row done"><span className="gb-tick">&#10003;</span>read context</div>
        <div className="gb-row done"><span className="gb-tick">&#10003;</span>decided &middot; call get_order</div>
        <div className="gb-row fail">
          <span className="gb-x">&#10007;</span>tool &middot; get_order(id) &rarr; empty
          <span className="gb-chip">context</span>
        </div>
        <div className="gb-replay mono">&#8635; replay this step</div>
      </div>
    );
  }
  return (
    <div className="p-visual" ref={ref} aria-hidden="true">
      <div className="win-bar"><i /><i /><i /></div>
      <div className="tf-prompt">&gt; calm fintech, trustworthy, slightly warm_</div>
      <div>
        <div className="tf-label mono">primary ramp</div>
        <div className="tf-swatches">
          <i style={{ background: "#EAF0F6" }} /><i style={{ background: "#B9CDE0" }} />
          <i style={{ background: "#6E93B8" }} /><i style={{ background: "#33597F" }} />
          <i style={{ background: "#16314C" }} />
        </div>
      </div>
      <div>
        <div className="tf-label mono">neutral ramp</div>
        <div className="tf-swatches">
          <i style={{ background: "#F6F5F2" }} /><i style={{ background: "#DDDAD3" }} />
          <i style={{ background: "#A9A49A" }} /><i style={{ background: "#6B665E" }} />
          <i style={{ background: "#2B2823" }} />
        </div>
      </div>
      <div className="src-row">
        <span className="src">type scale &#10003;</span>
        <span className="src">spacing &#10003;</span>
        <span className="src">animation&hellip; streaming</span>
      </div>
    </div>
  );
}
