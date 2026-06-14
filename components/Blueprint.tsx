"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type BlueprintKind = "tokens" | "components" | "flow" | "ops" | "pipeline";

type Spec = { vb: string; content: ReactNode };

const D = (i: number): CSSProperties => ({ "--d": `${0.12 + i * 0.12}s` } as CSSProperties);

function spec(kind: BlueprintKind): Spec {
  if (kind === "tokens") {
    return {
      vb: "0 0 300 206",
      content: (
        <>
          <text className="bp-t hd" x="14" y="20">design tokens</text>
          <g className="bp-g" style={D(0)}>
            <rect className="bp-sw" x="14" y="34" width="36" height="26" style={{ fill: "#EAF0F6" }} />
            <rect className="bp-sw" x="54" y="34" width="36" height="26" style={{ fill: "#B9CDE0" }} />
            <rect className="bp-sw" x="94" y="34" width="36" height="26" style={{ fill: "#6E93B8" }} />
            <rect className="bp-sw" x="134" y="34" width="36" height="26" style={{ fill: "#33597F" }} />
            <rect className="bp-sw" x="174" y="34" width="36" height="26" style={{ fill: "#16314C" }} />
            <text className="bp-t mut" x="218" y="51">color ramp</text>
          </g>
          <g className="bp-g" style={D(1)}>
            <rect className="bp-bar" x="14" y="78" width="150" height="16" />
            <rect className="bp-bar" x="14" y="100" width="104" height="11" />
            <rect className="bp-bar" x="14" y="118" width="70" height="8" />
            <text className="bp-t mut" x="178" y="100">type scale</text>
          </g>
          <g className="bp-g" style={D(2)}>
            <line className="bp-ln" x1="14" y1="150" x2="150" y2="150" />
            <line className="bp-tk" x1="14" y1="146" x2="14" y2="154" />
            <line className="bp-tk" x1="46" y1="146" x2="46" y2="154" />
            <line className="bp-tk" x1="94" y1="146" x2="94" y2="154" />
            <line className="bp-tk" x1="150" y1="146" x2="150" y2="154" />
            <text className="bp-t mut" x="178" y="154">space scale</text>
          </g>
          <g className="bp-g" style={D(3)}>
            <path className="bp-rad" d="M14 200 L14 176 Q14 168 22 168 L46 168" />
            <text className="bp-t mut" x="64" y="194">radius</text>
            <text className="bp-a" x="206" y="194">one source &#8600;</text>
          </g>
        </>
      ),
    };
  }
  if (kind === "components") {
    return {
      vb: "0 0 300 210",
      content: (
        <>
          <text className="bp-t hd" x="14" y="20">components, from the same tokens</text>
          <g className="bp-g" style={D(0)}>
            <rect className="bp-card" x="14" y="32" width="120" height="150" rx="8" />
            <rect className="bp-fill" x="26" y="44" width="96" height="56" rx="5" />
            <rect className="bp-bar" x="26" y="110" width="78" height="9" />
            <rect className="bp-bar" x="26" y="124" width="48" height="8" />
            <rect className="bp-stp" x="26" y="150" width="96" height="22" rx="6" />
            <text className="bp-t stp" x="36" y="165">&minus;</text>
            <text className="bp-t stp" x="72" y="165">1</text>
            <text className="bp-t stp" x="110" y="165">+</text>
          </g>
          <g className="bp-g" style={D(2)}>
            <rect className="bp-card" x="160" y="40" width="126" height="30" rx="7" />
            <circle className="bp-fill" cx="178" cy="55" r="9" />
            <rect className="bp-bar" x="194" y="51" width="50" height="8" />
            <text className="bp-t mut" x="160" y="86">cart row</text>
          </g>
          <g className="bp-g" style={D(3)}>
            <circle className="bp-node done" cx="170" cy="106" r="6" />
            <line className="bp-ln" x1="176" y1="106" x2="214" y2="106" />
            <circle className="bp-node done" cx="220" cy="106" r="6" />
            <line className="bp-ln" x1="226" y1="106" x2="264" y2="106" />
            <circle className="bp-node" cx="270" cy="106" r="6" />
            <text className="bp-t mut" x="160" y="128">order timeline</text>
          </g>
          <g className="bp-g" style={D(1)}>
            <line className="bp-lead" x1="122" y1="161" x2="176" y2="161" />
            <text className="bp-a" x="180" y="165">quantity stepper</text>
          </g>
        </>
      ),
    };
  }
  if (kind === "flow") {
    return {
      vb: "0 0 320 188",
      content: (
        <>
          <text className="bp-t hd" x="14" y="20">phone-first onboarding</text>
          <g className="bp-g" style={D(0)}>
            <rect className="bp-box" x="14" y="36" width="74" height="34" rx="7" />
            <text className="bp-t" x="51" y="57" textAnchor="middle">phone #</text>
          </g>
          <g className="bp-g" style={D(1)}>
            <line className="bp-arr" x1="90" y1="53" x2="120" y2="53" />
            <rect className="bp-box" x="122" y="36" width="64" height="34" rx="7" />
            <text className="bp-t" x="154" y="57" textAnchor="middle">OTP</text>
          </g>
          <g className="bp-g" style={D(2)}>
            <line className="bp-arr" x1="188" y1="53" x2="218" y2="53" />
            <rect className="bp-box hot" x="220" y="36" width="84" height="34" rx="7" />
            <text className="bp-t" x="262" y="57" textAnchor="middle">one ID</text>
          </g>
          <g className="bp-g" style={D(3)}>
            <path className="bp-arr" d="M262 70 L262 96 L70 96 L70 120" fill="none" />
            <path className="bp-arr" d="M262 70 L262 120" fill="none" />
            <path className="bp-arr" d="M262 70 L262 96 L250 96 L250 120" fill="none" />
            <rect className="bp-box sm" x="34" y="122" width="72" height="30" rx="6" />
            <text className="bp-t" x="70" y="141" textAnchor="middle">customer</text>
            <rect className="bp-box sm" x="226" y="122" width="64" height="30" rx="6" />
            <text className="bp-t" x="258" y="141" textAnchor="middle">store</text>
          </g>
          <text className="bp-a" x="14" y="180">one identifier, three apps</text>
        </>
      ),
    };
  }
  if (kind === "ops") {
    return {
      vb: "0 0 320 196",
      content: (
        <>
          <text className="bp-t hd" x="14" y="20">admin ops &middot; one geofence</text>
          <g className="bp-g" style={D(0)}>
            <rect className="bp-fence" x="14" y="32" width="292" height="134" rx="10" />
            <text className="bp-t mut" x="24" y="50">5 km geofence</text>
          </g>
          <g className="bp-g" style={D(1)}>
            <rect className="bp-row" x="28" y="62" width="130" height="22" rx="6" />
            <rect className="bp-row" x="28" y="90" width="130" height="22" rx="6" />
            <rect className="bp-row" x="28" y="118" width="130" height="22" rx="6" />
            <circle className="bp-node done" cx="42" cy="73" r="5" />
            <circle className="bp-node done" cx="42" cy="101" r="5" />
            <circle className="bp-node" cx="42" cy="129" r="5" />
            <text className="bp-t mut" x="28" y="156">stores</text>
          </g>
          <g className="bp-g" style={D(2)}>
            <rect className="bp-q" x="178" y="62" width="114" height="14" rx="4" />
            <rect className="bp-q" x="178" y="82" width="92" height="14" rx="4" />
            <rect className="bp-q" x="178" y="102" width="104" height="14" rx="4" />
            <rect className="bp-q" x="178" y="122" width="74" height="14" rx="4" />
            <text className="bp-t mut" x="178" y="156">fulfilment queue</text>
          </g>
          <text className="bp-a" x="178" y="186">one geofence, every surface</text>
        </>
      ),
    };
  }
  return {
    vb: "0 0 320 168",
    content: (
      <>
        <text className="bp-t hd" x="14" y="20">candidate pipeline</text>
        {[
          { x: 14, label: "invited", chips: 1 },
          { x: 116, label: "in progress", chips: 2 },
          { x: 218, label: "evaluated", chips: 2, pass: true },
        ].map((col, ci) => (
          <g className="bp-g" style={D(ci)} key={col.label}>
            <text className="bp-t mut" x={col.x + 44} y="40" textAnchor="middle">{col.label}</text>
            <line className="bp-ln" x1={col.x} y1="48" x2={col.x + 88} y2="48" />
            {Array.from({ length: col.chips }).map((_, i) => (
              <g key={i}>
                <rect className={"bp-row" + (col.pass ? " pass" : "")} x={col.x} y={58 + i * 32} width="88" height="24" rx="6" />
                <circle className="bp-node done" cx={col.x + 14} cy={70 + i * 32} r="5" />
                <rect className="bp-bar" x={col.x + 26} y={66 + i * 32} width="42" height="8" />
              </g>
            ))}
          </g>
        ))}
        <text className="bp-a" x="14" y="158">one state vocabulary, glanceable</text>
      </>
    ),
  };
}

export default function Blueprint({ kind }: { kind: BlueprintKind }) {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setLive(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { vb, content } = spec(kind);
  return (
    <figure ref={ref} className={"cs-widget blueprint" + (live ? " live" : "")}>
      <svg viewBox={vb} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        {content}
      </svg>
      <figcaption className="mono">blueprint &middot; drawn from the system, not a screenshot</figcaption>
    </figure>
  );
}
