import MagneticCta from "@/components/MagneticCta";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <p className="cta-line mono">have a product that needs a systems designer?</p>
        <MagneticCta />
        <div className="foot-row mono">
          <span>&copy; 2026 rahim rangrez &middot; built by hand, annotated in red</span>
          <div className="links">
            <a href="https://www.linkedin.com/in/rahim1845/" target="_blank" rel="noreferrer">linkedin</a>
            <a href="https://x.com/rahim1845" target="_blank" rel="noreferrer">x</a>
            <a href="https://medium.com/@rahim1845" target="_blank" rel="noreferrer">medium</a>
            <a href="https://dribbble.com/Rahim1845" target="_blank" rel="noreferrer">dribbble</a>
            <a href="https://contra.com/rahim1845" target="_blank" rel="noreferrer">contra</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
