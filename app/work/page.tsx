import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { projects, smallerThings } from "@/lib/projects";

export const metadata: Metadata = { title: "Work \u2014 Rahim Rangrez" };

export default function WorkIndex() {
  return (
    <section className="section" style={{ paddingTop: 150 }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <h2 className="sec-title">
            All <span className="serif-i">work</span>
          </h2>
          <span className="sec-count mono">3 case studies &middot; 4 smaller things &middot; all real</span>
        </Reveal>

        {projects.map((p) => (
          <Reveal key={p.slug}>
            <Link href={`/work/${p.slug}`} className="work-row">
              <span className="mono" style={{ color: "var(--muted)" }}>{p.year}</span>
              <div>
                <h3>
                  {p.titlePre}
                  <span className="serif-i">{p.titleItalic}</span>
                  {p.titlePost}
                </h3>
                <p>{p.summary}</p>
              </div>
              <div className="meta-col mono">
                <span className={"tag " + p.status}>{p.status}</span>
                <span className="tag">{p.tags[0]}</span>
              </div>
            </Link>
          </Reveal>
        ))}

        <Reveal className="smaller">
          <h3 className="mono">smaller things, no pages</h3>
          <ul>
            {smallerThings.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
