import Link from "next/link";
import HeroHeadline from "@/components/HeroHeadline";
import DraftingTable from "@/components/DraftingTable";
import Reveal from "@/components/Reveal";
import SecHead from "@/components/SecHead";
import MarginNote from "@/components/MarginNote";
import Mock from "@/components/Mocks";
import Highlight from "@/components/Highlight";
import { projects, articles } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-eyebrow mono">
          <span>portfolio &middot; 2026</span>
          <span>&middot;</span>
          <span>currently: senior product designer @ diamond atelier</span>
        </div>
        <HeroHeadline />
        <p className="hero-sub" id="heroSub" style={{ opacity: 0 }}>
          Product designer with 5 years across customer apps, operations tooling, and AI products.
          Founding designer of <b>TingTing</b>, a quick-commerce ecosystem that survived 30 stores and
          40k+ orders. I build my own <b>AI design tools</b> to understand the material I design with.
        </p>
        <div className="hero-meta mono" id="heroMeta" style={{ opacity: 0 }}>
          <span>&#8627; founding designer &middot; 0 &rarr; 30 stores &middot; &#8377;1cr+ transactions</span>
          <span>&#8627; design systems &middot; ops tooling &middot; ai products</span>
          <span>&#8627; mumbai, india &middot; open to senior roles</span>
        </div>
        <div className="hero-scroll mono" id="heroScroll" style={{ opacity: 0 }}>
          <span className="ln" /> scroll, the work explains it better
        </div>
        <MarginNote style={{ top: "26%", right: "6%" }}>
          trained as a mechanical engineer. it shows (in a good way)
          <span className="arrow">&#8600;</span>
        </MarginNote>
      </section>

      <DraftingTable />

      <section className="section" id="work">
        <div className="wrap">
          <SecHead
            title={<>Selected <span className="serif-i">work</span></>}
            count="03 case studies · real products, real numbers"
          />

          {projects.map((p, i) => (
            <Reveal as="article" key={p.slug} className={"project" + (i % 2 === 1 ? " flip" : "")}>
              <div>
                <div className="p-tags mono">
                  <span className={"tag " + p.status.replace(" ", "-")}>{p.status}</span>
                  {p.tags.slice(0, 2).map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <h3 className="p-title">
                  {p.titlePre}
                  <span className="serif-i">{p.titleItalic}</span>
                  {p.titlePost}
                </h3>
                <p className="p-desc">{p.summary}</p>
                <p className="p-outcome mono">{p.outcomeLine}</p>
                <Link className="p-link" href={`/work/${p.slug}`}>
                  Read the case study <span>&rarr;</span>
                </Link>
              </div>
              <Mock kind={p.mock} />
              {p.marginNote && (
                <MarginNote style={i === 0 ? { top: "4%", left: "-2%" } : { bottom: "4%", right: "-1%" }}>
                  {p.marginNote}
                </MarginNote>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section deep">
        <div className="wrap">
          <SecHead
            title={<>The <span className="serif-i">playground</span></>}
            count="tools i actually built, rules i actually shipped"
          />
          <Reveal>
            <p style={{ color: "var(--muted)", maxWidth: "52ch", marginBottom: 28, fontSize: "1.1rem" }}>
              Working experiments: an AI theme generator, Figma automation, gesture tracking, and the
              layout rule from TingTing&apos;s CMS that operators <Highlight>couldn&apos;t break</Highlight>.
            </p>
            <Link className="p-link" href="/playground">
              Open the playground <span>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SecHead
            title={<>Writing, <span className="serif-i">occasionally</span></>}
            count="less polished, more honest than this page"
          />
          {articles.map((a) => (
            <Reveal key={a.url}>
              <a className="work-row" href={a.url} target="_blank" rel="noreferrer">
                <span className="mono" style={{ color: "var(--muted)" }}>{a.where}</span>
                <div>
                  <h3 style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>{a.title}</h3>
                </div>
                <div className="meta-col mono">
                  <span className="tag">read &#8599;</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section deep">
        <div className="wrap">
          <SecHead
            title={<>About, <span className="serif-i">briefly</span></>}
            count="engineer first, designer by conviction"
          />
          <Reveal>
            <p style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", maxWidth: "46ch", marginBottom: 28 }}>
              I came to design from mechanical engineering, which is why I can&apos;t treat an interface
              as a picture. Everything is a system with <Highlight>loads and failure modes</Highlight>.
            </p>
            <Link className="p-link" href="/about">
              More about me <span>&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
