import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { AtelierThemeProvider } from "@/hooks/useAtelierTheme";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Iconic Art Global | Haute Atelier d'Art • Curated by Rinki Verma",
  description:
    "An exclusive creative atelier founded by Rinki Verma. 40+ curated art workshops hosted, bespoke sacred mandala commissions, Lippan mirror masterpieces, and luxury handcrafted creations.",
  keywords: [
    "Iconic Art Global",
    "Rinki Verma",
    "luxury art atelier",
    "bespoke mandala art",
    "lippan art",
    "art workshops",
    "corporate art events",
    "bachelorette art party",
    "customized photo frames",
    "watercolor paintings",
  ],
  openGraph: {
    title: "Iconic Art Global | Where Art Meets Experience",
    description:
      "Haute atelier d'art: 40+ curated workshops, bespoke commissions & handcrafted creations by Rinki Verma.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Dancing+Script:wght@400;600;700&family=Italiana&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col font-sans bg-[#F3ECE0] text-[#2A1817]"
        suppressHydrationWarning
      >
        <AtelierThemeProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AtelierThemeProvider>
      </body>
    </html>
  );
}
