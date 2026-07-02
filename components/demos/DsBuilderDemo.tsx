"use client";

import { useState } from "react";

type Preset = { ramp: string[]; accent: string; radius: number; font: string };

const PRESETS: Record<string, Preset> = {
  "calm fintech": { ramp: ["#EAF0F6", "#B9CDE0", "#6E93B8", "#33597F", "#16314C"], accent: "#33597F", radius: 8, font: "Inter" },
  "playful edtech": { ramp: ["#FFF1E0", "#FFD59E", "#FFB04D", "#F2820F", "#9A4F06"], accent: "#F2820F", radius: 18, font: "Poppins" },
  "bold devtool": { ramp: ["#EDEDF2", "#C7C7D1", "#8A8A99", "#3D3D47", "#141418"], accent: "#5B5BFF", radius: 4, font: "Geist Mono" },
};

export default function DsBuilderDemo() {
  const [prompt, setPrompt] = useState<keyof typeof PRESETS>("calm fintech");
  const [built, setBuilt] = useState(false);
  const p = PRESETS[prompt];

  const choose = (k: keyof typeof PRESETS) => {
    setPrompt(k);
    setBuilt(false);
  };

  return (
    <figure className="cs-widget demo dsb">
      <div className="demo-head">
        <span className="mono">figma plugin &middot; prompt → system</span>
      </div>
      <div className="dsb-prompt">
        <span className="dsb-caret mono">&gt;</span>
        <div className="dsb-chips mono">
          {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map((k) => (
            <button key={k} className={"dsb-chip" + (prompt === k ? " on" : "")} onClick={() => choose(k)} aria-pressed={prompt === k}>{k}</button>
          ))}
        </div>
      </div>

      {!built ? (
        <button className="demo-btn dsb-gen" onClick={() => setBuilt(true)}>generate the kit &rarr;</button>
      ) : (
        <div className="dsb-out" style={{ ["--accent" as string]: p.accent, ["--rad" as string]: `${p.radius}px` } as React.CSSProperties}>
          <div className="dsb-block">
            <span className="demo-label mono">tokens · colour</span>
            <div className="dsb-ramp">
              {p.ramp.map((c, i) => (
                <i key={i} style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="dsb-block">
            <span className="demo-label mono">components · from those tokens</span>
            <div className="dsb-comps">
              <button className="dsb-c-btn" type="button" tabIndex={-1} style={{ background: p.accent, borderRadius: p.radius }}>Primary</button>
              <button className="dsb-c-btn ghost" type="button" tabIndex={-1} style={{ borderRadius: p.radius, borderColor: p.accent, color: p.accent }}>Ghost</button>
              <span className="dsb-c-input" style={{ borderRadius: p.radius }}>Email…</span>
              <span className="dsb-c-chip" style={{ borderRadius: p.radius, background: p.ramp[0], color: p.ramp[4] }}>badge</span>
            </div>
          </div>
        </div>
      )}
      <figcaption className="mono">{built ? `“${prompt}” → tokens + base components, one pass.` : "pick a brief — the plugin scaffolds a starter system on the canvas."}</figcaption>
    </figure>
  );
}
