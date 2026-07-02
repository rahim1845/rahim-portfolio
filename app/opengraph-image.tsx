import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rahim Rangrez — I design the whole system, not just the screen.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f3f5f7",
          backgroundImage: "radial-gradient(circle, rgba(21,27,33,0.10) 2px, transparent 3px)",
          backgroundSize: "36px 36px",
          color: "#151b21",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#5c6671", textTransform: "uppercase" }}>
          rahim rangrez · senior product designer
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28, fontSize: 84, fontWeight: 800, lineHeight: 1.08, letterSpacing: -3 }}>
          <span>I design the whole</span>
          <span style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ textDecoration: "line-through", textDecorationColor: "#e5484d" }}>screen.</span>
            <span style={{ color: "#e5484d", fontStyle: "italic", fontWeight: 600 }}>system.</span>
          </span>
        </div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 28, color: "#5c6671" }}>
          customer apps · ops tooling · ai products — mumbai, india
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            right: 80,
            height: 4,
            background: "#ffe34d",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
