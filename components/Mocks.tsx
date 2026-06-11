type MockKind = "tingting" | "assessment" | "themeforge";

export default function Mock({ kind }: { kind: MockKind }) {
  if (kind === "tingting") {
    return (
      <div className="p-visual" aria-hidden="true">
        <div className="win-bar"><i /><i /><i /></div>
        <div className="order-head">
          <span>Order #4D21 &middot; Royal-Mart HSR</span>
          <span className="src">deliver in 18 min</span>
        </div>
        <div className="order-step done"><span className="st">&#10003;</span>Order confirmed</div>
        <div className="order-step done">
          <span className="st">&#10003;</span>Packing &middot; 12 of 14 items
          <span className="sub-chip">1 substituted</span>
        </div>
        <div className="order-step done"><span className="st">&#10003;</span>Rider assigned &middot; 1.2 km away</div>
        <div className="order-step"><span className="st">4</span>Delivered</div>
        <div className="src-row">
          <span className="src">customer app</span>
          <span className="src">store panel</span>
          <span className="src">admin ops</span>
        </div>
      </div>
    );
  }
  if (kind === "assessment") {
    return (
      <div className="p-visual" aria-hidden="true">
        <div className="win-bar"><i /><i /><i /></div>
        <div className="order-head">
          <span>Frontend hiring &middot; June cohort</span>
          <span className="src">14 candidates</span>
        </div>
        <div className="adm-row"><span>Priya N.</span><span className="chipst pass">evaluated &middot; 86%</span></div>
        <div className="adm-row"><span>Arjun K.</span><span className="chipst">in progress</span></div>
        <div className="adm-row"><span>Sneha R.</span><span className="chipst">invited</span></div>
        <div className="adm-row"><span>Vikram T.</span><span className="chipst pass">evaluated &middot; 74%</span></div>
      </div>
    );
  }
  return (
    <div className="p-visual" aria-hidden="true">
      <div className="win-bar"><i /><i /><i /></div>
      <div className="tf-prompt">&gt; calm fintech, trustworthy, slightly warm_</div>
      <div>
        <div className="tf-label mono">primary ramp</div>
        <div className="tf-swatches">
          <i style={{ background: "#EAF0F6" }} /><i style={{ background: "#B9CDE0" }} />
          <i style={{ background: "#6E93B8" }} /><i style={{ background: "#33597F" }} />
          <i style={{ background: "#16314C" }} />
        </div>
      </div>
      <div>
        <div className="tf-label mono">neutral ramp</div>
        <div className="tf-swatches">
          <i style={{ background: "#F6F5F2" }} /><i style={{ background: "#DDDAD3" }} />
          <i style={{ background: "#A9A49A" }} /><i style={{ background: "#6B665E" }} />
          <i style={{ background: "#2B2823" }} />
        </div>
      </div>
      <div className="src-row">
        <span className="src">type scale &#10003;</span>
        <span className="src">spacing &#10003;</span>
        <span className="src">animation&hellip; streaming</span>
      </div>
    </div>
  );
}
