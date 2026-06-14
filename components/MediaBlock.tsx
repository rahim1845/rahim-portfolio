import type { Media } from "@/lib/projects";
import SystemMap from "@/components/SystemMap";
import ScalingMap from "@/components/ScalingMap";
import DukanRule from "@/components/DukanRule";
import Blueprint from "@/components/Blueprint";

const WIDGETS: Record<string, React.ReactNode> = {
  "system-map": <SystemMap />,
  "scaling-map": <ScalingMap />,
  "dukan-rule": <DukanRule />,
  "bp-tokens": <Blueprint kind="tokens" />,
  "bp-components": <Blueprint kind="components" />,
  "bp-flow": <Blueprint kind="flow" />,
  "bp-ops": <Blueprint kind="ops" />,
  "bp-pipeline": <Blueprint kind="pipeline" />,
};

export default function MediaBlock({ items }: { items: Media[] }) {
  return (
    <div className="cs-media">
      {items.map((m, i) => {
        if (m.type === "widget") {
          return <div key={i} className={"cs-widget-slot" + (m.wide ? " wide" : "")}>{WIDGETS[m.name] ?? null}</div>;
        }
        if (m.type === "placeholder") {
          return (
            <figure key={i} className={"media-ph" + (m.wide ? " wide" : "")}>
              <div className="media-ph-inner">
                <span className="media-ph-label mono">{m.label}</span>
                {m.hint && <span className="media-ph-hint">{m.hint}</span>}
              </div>
              <figcaption className="mono">screenshot pending</figcaption>
            </figure>
          );
        }
        if (m.type === "video") {
          return (
            <figure key={i} className={m.wide ? "wide" : ""}>
              <video src={m.src} poster={m.poster} autoPlay muted loop playsInline preload="metadata" />
              {m.caption && <figcaption className="mono">{m.caption}</figcaption>}
            </figure>
          );
        }
        return (
          <figure key={i} className={m.wide ? "wide" : ""}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={m.alt ?? ""} loading="lazy" />
            {m.caption && <figcaption className="mono">{m.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
}
