"use client";

import { useEffect, useRef, useState } from "react";

export default function SkeletonsDemo() {
  const [mode, setMode] = useState<"honest" | "generic">("honest");
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
  };
  useEffect(() => stop, []);

  const reload = (m = mode) => {
    stop();
    setMode(m);
    setLoading(true);
    timer.current = window.setTimeout(() => setLoading(false), 1300);
  };

  const Content = (
    <div className="sk-card">
      <div className="sk-row">
        <span className="sk-avatar" />
        <div>
          <div className="sk-name">Priya Nair</div>
          <div className="sk-sub mono">evaluated · 86%</div>
        </div>
      </div>
      <p className="sk-body">Strong on systems thinking; flagged the inventory edge case unprompted. Recommend advancing to the on-site round.</p>
      <div className="sk-stats">
        <span className="sk-stat"><b>86%</b><i className="mono">score</i></span>
        <span className="sk-stat"><b>0:42</b><i className="mono">avg / q</i></span>
        <span className="sk-stat"><b>14</b><i className="mono">of 14</i></span>
      </div>
    </div>
  );

  const Honest = (
    <div className="sk-card sk-skel" aria-hidden="true">
      <div className="sk-row">
        <span className="sk-avatar sh" />
        <div>
          <span className="sh sk-b" style={{ width: 96 }} />
          <span className="sh sk-b" style={{ width: 70, marginTop: 6 }} />
        </div>
      </div>
      <span className="sh sk-b" style={{ width: "100%", marginTop: 14 }} />
      <span className="sh sk-b" style={{ width: "82%", marginTop: 7 }} />
      <div className="sk-stats">
        <span className="sh sk-b" style={{ width: 54, height: 30 }} />
        <span className="sh sk-b" style={{ width: 54, height: 30 }} />
        <span className="sh sk-b" style={{ width: 54, height: 30 }} />
      </div>
    </div>
  );

  const Generic = (
    <div className="sk-card sk-skel sk-generic" aria-hidden="true">
      <span className="sh sk-b" style={{ width: "100%" }} />
      <span className="sh sk-b" style={{ width: "100%" }} />
      <span className="sh sk-b" style={{ width: "100%" }} />
    </div>
  );

  return (
    <figure className="cs-widget demo skd">
      <div className="demo-head">
        <span className="mono">loading state &middot; {mode}</span>
        <div className="demo-seg mono" role="group" aria-label="skeleton type">
          <button className={mode === "honest" ? "on" : ""} onClick={() => reload("honest")} aria-pressed={mode === "honest"}>honest</button>
          <button className={mode === "generic" ? "on" : ""} onClick={() => reload("generic")} aria-pressed={mode === "generic"}>generic</button>
        </div>
      </div>
      <div className="sk-stage">{loading ? (mode === "honest" ? Honest : Generic) : Content}</div>
      <div className="demo-foot">
        <button className="demo-btn" onClick={() => reload()}>&#8635;&ensp;reload</button>
        <span className="mono demo-hint">{mode === "honest" ? "shaped like the answer — no jump on load" : "generic shimmer — layout lurches when real content lands"}</span>
      </div>
    </figure>
  );
}
