"use client";

import { useState } from "react";

const CARDS = [
  { t: "TingTing", s: "quick commerce · 4 surfaces" },
  { t: "Assessment platform", s: "b2b admin · hiring" },
  { t: "ThemeForge", s: "ai design tokens" },
];

export default function TouchlessDemo() {
  const [i, setI] = useState(0);
  const [pinch, setPinch] = useState(false);

  const advance = () => {
    setPinch(true);
    setI((n) => (n + 1) % CARDS.length);
    window.setTimeout(() => setPinch(false), 260);
  };
  const back = () => setI((n) => (n - 1 + CARDS.length) % CARDS.length);

  return (
    <figure className="cs-widget demo tl">
      <div className="demo-head">
        <span className="mono">touchless nav &middot; pinch to advance</span>
        <span className="tl-sim mono">simulated</span>
      </div>

      <div className="tl-stage">
        <div className="tl-screen">
          <span className="tl-idx mono">{String(i + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}</span>
          <span className="tl-title">{CARDS[i].t}</span>
          <span className="tl-sub mono">{CARDS[i].s}</span>
        </div>
        <div className={"tl-hand" + (pinch ? " pinch" : "")} aria-hidden="true">
          <i className="tl-dot a" />
          <i className="tl-dot b" />
        </div>
      </div>

      <div className="demo-foot">
        <div className="tl-controls">
          <button className="demo-btn" onClick={back} aria-label="open palm — previous">&#9995; back</button>
          <button className="demo-btn primary" onClick={advance} aria-label="pinch — next">&#129292; pinch &rarr;</button>
        </div>
        <span className="mono demo-hint">the real build reads your webcam via MediaPipe Hands</span>
      </div>
    </figure>
  );
}
