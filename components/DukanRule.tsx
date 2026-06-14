"use client";

import { useState } from "react";

type Mode = "carousel" | "block";

export default function DukanRule() {
  const [mode, setMode] = useState<Mode>("carousel");
  const [items, setItems] = useState(5);

  const cols = mode === "carousel" ? 3 : 4;
  const ghosts = (cols - (items % cols)) % cols;

  return (
    <figure className="cs-widget dukan-rule" aria-label="Interactive demo of TingTing's CMS layout rule: the operator picks a layout mode and the homepage grid always renders cleanly.">
      <div className="dr-modes mono">
        <button className={mode === "carousel" ? "on" : ""} onClick={() => setMode("carousel")} aria-pressed={mode === "carousel"}>
          3-col carousel &middot; 4:3
        </button>
        <button className={mode === "block" ? "on" : ""} onClick={() => setMode("block")} aria-pressed={mode === "block"}>
          4-col block &middot; 1:1
        </button>
      </div>

      <div className={"dr-grid " + mode} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: items }).map((_, i) => (
          <span className="dr-cell" key={i}>
            <i />
            <i className="t" />
          </span>
        ))}
        {Array.from({ length: ghosts }).map((_, i) => (
          <span className="dr-cell ghost" key={"g" + i} />
        ))}
      </div>

      <div className="dr-foot">
        <div className="dr-steppers">
          <button onClick={() => setItems((n) => Math.max(1, n - 1))} aria-label="remove a bundle item">&minus;</button>
          <span className="mono">{items} items</span>
          <button onClick={() => setItems((n) => Math.min(12, n + 1))} aria-label="add a bundle item">+</button>
        </div>
        <span className="dr-holds mono">
          <span className="ck">&#10003;</span> grid holds &mdash; {ghosts === 0 ? "row complete" : `${ghosts} slot${ghosts > 1 ? "s" : ""} auto-filled`}
        </span>
      </div>
      <figcaption className="mono">live rule &middot; the operator can&apos;t break the homepage</figcaption>
    </figure>
  );
}
