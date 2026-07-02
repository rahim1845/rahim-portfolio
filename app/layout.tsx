import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollGear from "@/components/ScrollGear";

export const metadata: Metadata = {
  metadataBase: new URL("https://rahim1845.vercel.app"),
  title: {
    default: "Rahim Rangrez \u2014 Senior Product Designer",
    template: "%s \u2014 Rahim Rangrez",
  },
  description:
    "Senior product designer across customer apps, operations tooling, and AI products. Founding designer of TingTing, a quick-commerce ecosystem (40k+ orders, 30 stores). Based in Mumbai.",
  keywords: ["product designer", "design systems", "AI product design", "ops tooling", "Mumbai", "portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Rahim Rangrez \u2014 Senior Product Designer",
    description: "I design the whole system, not just the screen.",
    url: "https://rahim1845.vercel.app",
    siteName: "Rahim Rangrez",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahim Rangrez \u2014 Senior Product Designer",
    description: "I design the whole system, not just the screen.",
    creator: "@rahim1845",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rahim Rangrez",
  jobTitle: "Senior Product Designer",
  url: "https://rahim1845.vercel.app",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  sameAs: [
    "https://www.linkedin.com/in/rahim1845/",
    "https://x.com/rahim1845",
    "https://medium.com/@rahim1845",
    "https://dribbble.com/Rahim1845",
    "https://contra.com/rahim1845",
  ],
  knowsAbout: ["Product design", "Design systems", "AI product design", "Operations tooling"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,800;1,400&family=Instrument+Serif:ital@0;1&family=Caveat:wght@500;600&family=Fragment+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
          <ScrollGear />
        </Providers>
      </body>
    </html>
  );
}
