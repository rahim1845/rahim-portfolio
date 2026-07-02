"use client";

import { useState } from "react";

const FRAMES = ["Home", "Search", "Results", "Detail"];
const REACTIONS = [
  'Home — on tap “search” → navigate → Search',
  "Search — on submit → navigate → Results",
  "Results — on tap row → navigate → Detail",
  "Detail — on back → navigate → Results",
];

export default function AutowireDemo() {
  const [wired, setWired] = useState(false);

  return (
    <figure className="cs-widget demo aw">
      <div className="demo-head">
        <span className="mono">figma prototype &middot; wired from data</span>
        {wired && <span className="aw-count mono">4 reactions · setReactionsAsync</span>}
      </div>

      <div className={"aw-frames" + (wired ? " wired" : "")}>
        {FRAMES.map((f, i) => (
          <div className="aw-frame" key={f}>
            <span className="aw-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="aw-bar" />
            <span className="aw-bar sm" />
            <span className="aw-name mono">{f}</span>
            {i < FRAMES.length - 1 && (
              <svg className="aw-link" viewBox="0 0 40 12" aria-hidden="true">
                <line className="aw-line" x1="1" y1="6" x2="33" y2="6" />
                <path className="aw-head" d="M33 2 L39 6 L33 10" fill="none" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {!wired ? (
        <button className="demo-btn" onClick={() => setWired(true)}>auto-wire the flow &rarr;</button>
      ) : (
        <ol className="aw-reactions mono">
          {REACTIONS.map((r, i) => (
            <li key={i} style={{ ["--d" as string]: `${i * 0.12}s` } as React.CSSProperties}>{r}</li>
          ))}
        </ol>
      )}
      <figcaption className="mono">{wired ? "the whole flow, connected from a description — not dragged by hand." : "four frames, no connections. wire them programmatically."}</figcaption>
    </figure>
  );
}
