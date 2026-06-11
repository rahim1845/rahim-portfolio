"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/work", label: "work" },
  { href: "/playground", label: "playground" },
  { href: "/about", label: "about" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled((prev) => {
        const y = window.scrollY;
        if (y > 90) return true;
        if (y < 70) return false;
        return prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <Link href="/" className="nav-name">
          rahim rangrez <span>/ product designer</span>
        </Link>
        <nav aria-label="primary">
          <ul className="nav-links mono">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={pathname.startsWith(l.href) && l.href !== "#contact" ? "active" : ""}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-status mono">
          <span className="dot" />
          open to senior roles
        </div>
        <button className={"nav-burger" + (open ? " open" : "")} aria-label="menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <i /><i /><i />
        </button>
      </header>
      <div className={"nav-overlay" + (open ? " open" : "")}>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
