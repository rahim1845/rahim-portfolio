"use client";

import { useState } from "react";

type Phase = "failed" | "replaying" | "passed";

export default function GlassboxDemo() {
  const [phase, setPhase] = useState<Phase>("failed");
  const [open, setOpen] = useState<number>(3);
  const fixed = phase === "passed";
  const replaying = phase === "replaying";

  const replay = () => {
    setPhase("replaying");
    window.setTimeout(() => setPhase("passed"), 1300);
  };

  const steps = [
    {
      id: 1,
      tag: "context",
      state: "ok" as const,
      label: "read context",
      detail: "pulled: message id, customer tier, last 3 messages",
    },
    {
      id: 2,
      tag: "decide",
      state: "ok" as const,
      label: "decided · call get_order",
      detail: "reasoning: the user is asking about a delivery → needs the order status first.",
    },
    {
      id: 3,
      tag: "tool",
      state: fixed ? ("ok" as const) : ("fail" as const),
      label: fixed ? 'get_order(id: "ORD-4D21") → 14 items' : 'get_order(id: "MSG-4D21") → empty',
      detail: fixed
        ? "returned the order. context now maps order_id, not the message id."
        : "returned { items: [] }. expected an order object. evidence: the id passed was the message id, not the order id.",
    },
    {
      id: 4,
      tag: "result",
      state: fixed ? ("ok" as const) : ("blocked" as const),
      label: fixed ? 'replied · "Your order is 1.2 km away — ~18 min."' : 'replied · "I can’t find your order."',
      detail: fixed ? "correct answer shipped to the customer." : "wrong answer shipped to the customer.",
    },
  ];

  return (
    <figure className="cs-widget glassbox-demo">
      <div className="gx-head">
        <span className="mono">glassbox &middot; run trace</span>
        <span className={"gx-status " + (fixed ? "ok" : replaying ? "run" : "fail")}>
          {replaying ? "replaying…" : fixed ? "✓ passed" : "✗ failed"}
        </span>
      </div>
      <div className="gx-input mono">input: &ldquo;where is my order?&rdquo; &middot; triage-agent &middot; run #A91</div>

      <ol className="gx-steps">
        {steps.map((s) => {
          const isFail = s.state === "fail";
          const isBlocked = s.state === "blocked";
          const isOpen = open === s.id;
          return (
            <li key={s.id} className={"gx-step" + (isFail ? " fail" : "") + (isBlocked ? " blocked" : "") + (s.id === 3 && replaying ? " run" : "")}>
              <button
                type="button"
                className="gx-row"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : s.id)}
              >
                <span className={"gx-dot " + s.state} aria-hidden="true">
                  {s.state === "ok" ? "✓" : isFail ? "✗" : isBlocked ? "!" : "·"}
                </span>
                <span className="gx-label">{s.label}</span>
                {s.id === 3 && (
                  <span className={"gx-chip" + (fixed ? " ok" : "")}>{fixed ? "context · fixed" : "context"}</span>
                )}
                <span className="gx-caret mono" aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <div className="gx-detail">{s.detail}</div>}
              {s.id === 3 && !fixed && (
                <div className="gx-actions">
                  <button type="button" className="gx-replay" onClick={replay} disabled={replaying}>
                    <span className={"gx-spin" + (replaying ? " on" : "")} aria-hidden="true">&#8635;</span>
                    {replaying ? "replaying just this step…" : "scoped replay"}
                  </button>
                  <span className="gx-hint mono">re-runs one step, not the whole agent</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <figcaption className="mono">
        {fixed ? (
          <>
            fixed the context mapping &middot; one step re-run, not the whole agent &middot;{" "}
            <button type="button" className="gx-reset" onClick={() => { setPhase("failed"); setOpen(3); }}>
              &#8634; reset demo
            </button>
          </>
        ) : (
          "the agent failed — localise it, fix the right layer, replay one step"
        )}
      </figcaption>
    </figure>
  );
}
