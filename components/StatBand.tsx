import CountUp from "@/components/CountUp";
import SecHead from "@/components/SecHead";

type Stat = { to: number; suffix?: string; decimals?: number; label: string; sub: string };

const STATS: Stat[] = [
  { to: 40, suffix: "k+", label: "orders shipped", sub: "across 30 stores" },
  { to: 30, label: "stores survived", sub: "0 → 1 → 30" },
  { to: 12, suffix: "k+", label: "app downloads", sub: "ios + android" },
  { to: 4.5, decimals: 1, suffix: "★", label: "app-store rating", sub: "₹1cr+ transactions" },
];

export default function StatBand() {
  return (
    <section className="section statband">
      <div className="wrap" style={{ position: "relative" }}>
        <span className="sb-ghost" aria-hidden="true">PROOF</span>
        <SecHead
          title={<>By the <span className="serif-i">numbers</span></>}
          count="real products, real numbers · tingting 2022–25"
        />
        <div className="sb-grid">
          {STATS.map((s) => (
            <figure className="sb-card" key={s.label}>
              <span className="sb-num">
                <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals} />
              </span>
              <figcaption className="sb-label mono">{s.label}</figcaption>
              <span className="sb-sub mono">{s.sub}</span>
            </figure>
          ))}
        </div>
        <div className="sb-hatch" aria-hidden="true" />
      </div>
    </section>
  );
}
