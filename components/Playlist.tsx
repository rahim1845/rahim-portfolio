import Link from "next/link";
import Reveal from "@/components/Reveal";
import { playlist } from "@/lib/projects";

export default function Playlist() {
  return (
    <div className="playlist">
      {playlist.map((p, i) => {
        const href = p.href ?? (p.slug ? `/playground/${p.slug}` : undefined);
        const external = !!href && /^https?:/.test(href);
        const inner = (
          <>
            <span className="pl-num mono" aria-hidden="true">
              <span className="pl-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="pl-play">&#9654;</span>
            </span>
            <span className="pl-main">
              <span className="pl-title">
                {p.title}
                <span className="pl-open mono" aria-hidden="true">open</span>
              </span>
              <span className="pl-tools mono">
                {p.tools.map((t) => (
                  <span className="pl-tag" key={t}>{t}</span>
                ))}
              </span>
              <span className="pl-desc">{p.desc}</span>
            </span>
            <span className="pl-thumb">
              {p.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.thumb} alt="" loading="lazy" />
              ) : (
                <span className="pl-thumb-ph" aria-hidden="true">
                  <span className="pl-thumb-play">&#9654;</span>
                </span>
              )}
              <span className="pl-dur mono">{p.format}</span>
            </span>
          </>
        );
        return (
          <Reveal key={p.title}>
            {external ? (
              <a className="pl-row" href={href} target="_blank" rel="noreferrer">{inner}</a>
            ) : href ? (
              <Link className="pl-row" href={href}>{inner}</Link>
            ) : (
              <div className="pl-row">{inner}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
