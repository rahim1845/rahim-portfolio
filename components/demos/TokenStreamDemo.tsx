"use client";

import { useEffect, useRef, useState } from "react";

const WORDS =
  "The same sentence. Revealed one word at a time, at the right cadence, your brain reads it as thinking. Dumped all at once, it reads as a wall of text. Nothing changed but the timing.".split(
    " "
  );

export default function TokenStreamDemo() {
  const [mode, setMode] = useState<"streamed" | "instant">("streamed");
  const [shown, setShown] = useState(WORDS.length);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
  };
  useEffect(() => stop, []);

  const play = (m = mode) => {
    stop();
    if (m === "instant" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRunning(false);
      setShown(WORDS.length);
      return;
    }
    setShown(0);
    setRunning(true);
    let i = 0;
    const tick = () => {
      i += 1;
      setShown(i);
      if (i < WORDS.length) timer.current = window.setTimeout(tick, 105);
      else setRunning(false);
    };
    timer.current = window.setTimeout(tick, 105);
  };

  const setModeAndPlay = (m: "streamed" | "instant") => {
    setMode(m);
    play(m);
  };

  return (
    <figure className="cs-widget demo tstreamd">
      <div className="demo-head">
        <span className="mono">token stream &middot; perception</span>
        <div className="demo-seg mono" role="group" aria-label="mode">
          <button className={mode === "streamed" ? "on" : ""} onClick={() => setModeAndPlay("streamed")} aria-pressed={mode === "streamed"}>streamed</button>
          <button className={mode === "instant" ? "on" : ""} onClick={() => setModeAndPlay("instant")} aria-pressed={mode === "instant"}>instant</button>
        </div>
      </div>
      <p className="ts-text">
        {WORDS.slice(0, shown).join(" ")}
        {mode === "streamed" && running && <span className="ts-caret" aria-hidden="true" />}
      </p>
      <div className="demo-foot">
        <button className="demo-btn" onClick={() => play()}>&#8635;&ensp;replay</button>
        <span className="mono demo-hint">{mode === "streamed" ? "~105ms / word — reads as alive" : "0ms — reads as a wall"}</span>
      </div>
    </figure>
  );
}
