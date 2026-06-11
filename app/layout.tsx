import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rahim Rangrez \u2014 Senior Product Designer",
  description:
    "Senior product designer across customer apps, operations tooling, and AI products. Founding designer of TingTing, a quick-commerce ecosystem (40k+ orders, 30 stores). Based in Mumbai.",
  openGraph: {
    title: "Rahim Rangrez \u2014 Senior Product Designer",
    description: "I design the whole system, not just the screen.",
    type: "website",
  },
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
        <Providers>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
