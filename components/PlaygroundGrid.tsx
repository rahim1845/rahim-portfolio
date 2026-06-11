"use client";

import { useEffect, useState } from "react";

const STREAM_WORDS = "the words arrive one by one and your brain fills the silence between them and that's the trick".split(" ");

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s * 100, l * 100];
}

export default function PlaygroundGrid() {
  const [seed, setSeed] = useState("#33597f");
  const [items, setItems] = useState(4);
  const [streamKey, setStreamKey] = useState(0);
  const [vote, setVote] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStreamKey((k) => k + 1), Math.max(4000, STREAM_WORDS.length * 130 + 1800));
    return () => clearInterval(id);
  }, []);

  const [h, s] = hexToHsl(seed);
  const ramp = [92, 74, 52, 34, 18].map((l) => `hsl(${h.toFixed(0)}, ${Math.min(s, 70).toFixed(0)}%, ${l}%)`);
  const ghosts = (3 - (items % 3)) % 3;

  return (
    <div className="pg-grid">
      <div className="pg-card">
        <div>
          <h3>ThemeForge, miniature</h3>
          <p>Pick a seed colour, get a usable ramp. The full tool generates the whole token set with Claude.</p>
        </div>
        <div className="pg-stage">
          <div className="ramp">
            <input type="color" value={seed} onChange={(e) => setSeed(e.target.value)} aria-label="seed colour" />
            <div className="sw">
              {ramp.map((c, i) => (
                <i key={i} style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
        <span className="mono">live demo &middot; the real one is a case study</span>
      </div>

      <div className="pg-card">
        <div>
          <h3>The rule that holds</h3>
          <p>TingTing&apos;s CMS layout rule: bundles always render in multiples of three. Try to break it.</p>
        </div>
        <div className="pg-stage">
          <div className="dukan">
            <div className="dgrid">
              {Array.from({ length: items }).map((_, i) => (
                <span className="cell" key={i} />
              ))}
              {Array.from({ length: ghosts }).map((_, i) => (
                <span className="cell ghost" key={"g" + i} />
              ))}
            </div>
            <div className="dukan-controls">
              <button onClick={() => setItems((n) => Math.max(1, n - 1))} aria-label="remove item">&minus;</button>
              <span className="mono">{items} items &middot; grid holds</span>
              <button onClick={() => setItems((n) => Math.min(9, n + 1))} aria-label="add item">+</button>
            </div>
          </div>
        </div>
        <span className="mono">shipped rule &middot; from the dukan cms</span>
      </div>

      <div className="pg-card pinch-card">
        <div>
          <h3>Hands as input</h3>
          <p>MediaPipe hand tracking for touchless case-study navigation. Pinch to advance. In progress.</p>
        </div>
        <div className="pg-stage">
          <div className="pinch"><i /><i /></div>
        </div>
        <span className="mono">prototype &middot; mediapipe hands</span>
      </div>

      <div className="pg-card">
        <div>
          <h3>Token stream</h3>
          <p>Why streaming text feels alive, recreated and slowed down. The same trick ThemeForge uses.</p>
        </div>
        <div className="pg-stage">
          <div className="tstream" key={streamKey}>
            {STREAM_WORDS.map((w, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.13}s` }}>{w} </span>
            ))}
          </div>
        </div>
        <span className="mono">perception study &middot; js</span>
      </div>

      <div className="pg-card">
        <div>
          <h3>Honest skeletons</h3>
          <p>Loading states shaped like the answer, not like a lie.</p>
        </div>
        <div className="pg-stage"><div className="skel"><i /><i /><i /></div></div>
        <span className="mono">motion study &middot; css</span>
      </div>

      <div className="pg-card">
        <div>
          <h3>The feedback we never give</h3>
          <p>A thumbs-up that feels good enough to actually press.</p>
        </div>
        <div className="pg-stage">
          <div className="vote">
            <button className={vote === "up" ? "hit" : ""} aria-label="thumbs up" onClick={() => setVote("up")}>&#128077;</button>
            <button className={vote === "down" ? "hit" : ""} aria-label="thumbs down" onClick={() => setVote("down")}>&#128078;</button>
          </div>
        </div>
        <span className="mono">microinteraction &middot; js</span>
      </div>
    </div>
  );
}
