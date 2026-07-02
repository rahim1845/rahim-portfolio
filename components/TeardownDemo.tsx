"use client";

import { useState } from "react";

const PRIMITIVES = [
  { hex: "#F4F5F7", name: "grey/50" },
  { hex: "#D6DCE2", name: "grey/200" },
  { hex: "#5C6671", name: "grey/600" },
  { hex: "#16314C", name: "ink/900" },
  { hex: "#33597F", name: "blue/600" },
];

const JSON_OUT = `{
  "color": {
    "grey": { "50": "#F4F5F7", "200": "#D6DCE2", "600": "#5C6671" },
    "ink":  { "900": "#16314C" },
    "blue": { "600": "#33597F" }
  },
  "semantic": {
    "surface": "{color.grey.50}",
    "text":    "{color.ink.900}",
    "accent":  "{color.blue.600}"
  }
}`;

export default function TeardownDemo() {
  const [torn, setTorn] = useState(false);

  return (
    <figure className="cs-widget teardown">
      <div className="td-head">
        <span className="mono">teardown &middot; found system</span>
        {torn && <span className="td-flag mono">2 greys within ~3% → collapsed to one</span>}
      </div>

      <div className="td-grid">
        <div className="td-source">
          <span className="td-cap mono">found in the wild</span>
          <div className="td-ui">
            <div className="td-ui-row">
              <button type="button" tabIndex={-1} style={{ background: "#F4F5F7" }}>Cancel</button>
              <button type="button" tabIndex={-1} style={{ background: "#F1F3F5" }}>Back</button>
              <button type="button" tabIndex={-1} style={{ background: "#33597F", color: "#fff", borderColor: "#33597F" }}>Continue</button>
            </div>
            <div className="td-ui-card">
              <div className="td-ui-title">Account settings</div>
              <div className="td-ui-text">Manage your profile and preferences.</div>
              <div className="td-ui-text sm">Last updated 2 days ago</div>
            </div>
          </div>
        </div>

        <div className="td-out">
          {!torn ? (
            <button type="button" className="td-btn" onClick={() => setTorn(true)}>
              &#8595;&ensp;tear it down
            </button>
          ) : (
            <div className="td-result">
              <div className="td-block">
                <span className="td-label mono">primitives &middot; colour</span>
                <div className="td-swatches">
                  {PRIMITIVES.map((s) => (
                    <span className="td-sw" key={s.name}>
                      <i style={{ background: s.hex }} />
                      <span className="mono">{s.name}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="td-block">
                <span className="td-label mono">semantics</span>
                <div className="td-sem mono">
                  <span>surface = <b>{"{color.grey.50}"}</b></span>
                  <span>text = <b>{"{color.ink.900}"}</b></span>
                  <span>accent = <b>{"{color.blue.600}"}</b></span>
                </div>
              </div>
              <div className="td-block">
                <span className="td-label mono">tokens studio &middot; json</span>
                <pre className="td-json mono">{JSON_OUT}</pre>
              </div>
              <button type="button" className="td-reset mono" onClick={() => setTorn(false)}>&#8634; reset</button>
            </div>
          )}
        </div>
      </div>
      <figcaption className="mono">{torn ? "extracted → normalised → exported. portable, and the duplicate grey is gone." : "a real teardown: click to extract the structure underneath."}</figcaption>
    </figure>
  );
}
