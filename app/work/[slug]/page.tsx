import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Mock from "@/components/Mocks";
import Boldify from "@/components/Boldify";
import MarginNote from "@/components/MarginNote";
import MediaBlock from "@/components/MediaBlock";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.titlePre}${p.titleItalic}${p.titlePost} \u2014 Rahim Rangrez` };
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function CaseStudy({ params }: { params: { slug: string } }) {
  const idx = projects.findIndex((x) => x.slug === params.slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <article className="cs-hero">
      <div className="wrap">
        <Reveal>
          <div className="p-tags mono">
            <span className={"tag " + p.status}>{p.status}</span>
            {p.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          <h1>
            {p.titlePre}
            <span className="serif-i">{p.titleItalic}</span>
            {p.titlePost}
          </h1>
          <div className="cs-meta">
            {p.meta.map((m) => (
              <div key={m.k}>
                <span className="k mono">{m.k}</span>
                <span className="v">{m.v}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          {p.external && (
            <a className="cs-ext" href={p.external.url} target="_blank" rel="noreferrer">
              {p.external.label} <span>&#8599;</span>
            </a>
          )}
          <Mock kind={p.mock} />
          {p.images && (
            <div className="cs-images">
              {p.images.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={img.src} src={img.src} alt="" loading="lazy" className={img.wide ? "wide" : ""} />
              ))}
            </div>
          )}
        </Reveal>

        <div className="cs-body" style={{ marginTop: "clamp(44px, 6vw, 70px)" }}>
          <nav className="cs-toc mono" aria-label="contents">
            {p.sections.map((s) => (
              <a key={s.h} href={`#${slugify(s.h)}`}>{s.h}</a>
            ))}
            <a href="#reflection">reflection</a>
          </nav>

          <div style={{ position: "relative" }}>
            {p.sections.map((s) => (
              <Reveal as="section" key={s.h} className="cs-section">
                <h2 id={slugify(s.h)}>{s.h}</h2>
                {s.body.map((para, i) => (
                  <p key={i}>
                    <Boldify text={para} />
                  </p>
                ))}
                {s.media && <MediaBlock items={s.media} />}
              </Reveal>
            ))}

            <Reveal as="section" className="cs-section" >
              <div className="cs-reflection" id="reflection">
                <p>{p.reflection}</p>
              </div>
            </Reveal>

            {p.marginNote && <MarginNote style={{ top: "30%", right: "-10px" }}>{p.marginNote}</MarginNote>}
          </div>
        </div>

        <div className="cs-nav">
          <Link href={`/work/${prev.slug}`}>
            <small className="mono">&larr; previous</small>
            {prev.titlePre}{prev.titleItalic}{prev.titlePost}
          </Link>
          <Link href={`/work/${next.slug}`} style={{ textAlign: "right" }}>
            <small className="mono">next &rarr;</small>
            {next.titlePre}{next.titleItalic}{next.titlePost}
          </Link>
        </div>
      </div>
    </article>
  );
}
