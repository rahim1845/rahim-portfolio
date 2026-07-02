import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Boldify from "@/components/Boldify";
import TeardownDemo from "@/components/TeardownDemo";
import TokenStreamDemo from "@/components/demos/TokenStreamDemo";
import SkeletonsDemo from "@/components/demos/SkeletonsDemo";
import DsBuilderDemo from "@/components/demos/DsBuilderDemo";
import AutowireDemo from "@/components/demos/AutowireDemo";
import TouchlessDemo from "@/components/demos/TouchlessDemo";
import { playlist } from "@/lib/projects";

const items = playlist.filter((p) => p.slug);

const DEMOS: Record<string, React.ReactNode> = {
  teardown: <TeardownDemo />,
  tokenstream: <TokenStreamDemo />,
  skeletons: <SkeletonsDemo />,
  dsbuilder: <DsBuilderDemo />,
  autowire: <AutowireDemo />,
  touchless: <TouchlessDemo />,
};

export function generateStaticParams() {
  return items.map((p) => ({ slug: p.slug as string }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = items.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.desc,
    alternates: { canonical: `/playground/${p.slug}` },
    openGraph: { title: p.title, description: p.desc, type: "article" },
  };
}

export default function VibeProject({ params }: { params: { slug: string } }) {
  const idx = items.findIndex((x) => x.slug === params.slug);
  if (idx === -1) notFound();
  const p = items[idx];
  const prev = items[(idx - 1 + items.length) % items.length];
  const next = items[(idx + 1) % items.length];
  const external = !!p.href && /^https?:/.test(p.href);
  const demo = p.demo ? DEMOS[p.demo] : null;

  return (
    <article className="cs-hero vibe-detail">
      <div className="wrap">
        <Reveal>
          <Link className="vd-back mono" href="/playground">&larr; playground</Link>
          <div className="p-tags mono">
            <span className="tag side-product">vibe-coded</span>
            <span className="tag">{p.format}</span>
            {p.tools.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          <h1>{p.title}</h1>
          <p className="vd-lead">{p.long}</p>
        </Reveal>

        <Reveal>
          {demo ? (
            demo
          ) : (
            <figure className="vd-media">
              {p.thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.thumb} alt={p.title} />
              ) : (
                <div className="vd-media-ph" aria-hidden="true">
                  <span className="pl-thumb-play">&#9654;</span>
                  <span className="vd-media-label mono">preview coming soon</span>
                </div>
              )}
              <span className="pl-dur mono">{p.format}</span>
            </figure>
          )}
          {external && (
            <a className="cs-ext" href={p.href} target="_blank" rel="noreferrer">
              Open the project <span>&#8599;</span>
            </a>
          )}
        </Reveal>

        {p.sections && (
          <div className="vd-body">
            {p.sections.map((s) => (
              <Reveal as="section" className="cs-section" key={s.h}>
                <h2>{s.h}</h2>
                {s.body.map((para, i) => (
                  <p key={i}>
                    <Boldify text={para} />
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        )}

        <div className="cs-nav">
          <Link href={`/playground/${prev.slug}`}>
            <small className="mono">&larr; previous</small>
            {prev.title}
          </Link>
          <Link href={`/playground/${next.slug}`} style={{ textAlign: "right" }}>
            <small className="mono">next &rarr;</small>
            {next.title}
          </Link>
        </div>
      </div>
    </article>
  );
}
