"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { navigation } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function HeaderContent() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();

  // Hysteresis Scroll Listener: Shrinks at > 50px, expands only at < 20px (Zero Jitter)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > 50) {
        setIsScrolled(true);
      } else if (y < 20) {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

      {/* =========================================================================
          STATE 1: HOMEPAGE SPENCER GABOR CORNER DOCK vs PANORAMIC SUBPAGE MASTHEAD
          On Homepage: 100% clean canvas with discreet floating corner dock (0 vertical space eaten).
          On Subpages: Full panoramic navigation bar.
          ========================================================================= */}
      <AnimatePresence>
        {!isScrolled && isHome && (
          <motion.div
            key="home-corner-dock"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full flex justify-end px-3.5 sm:px-10 pt-3 sm:pt-6 pointer-events-none select-none"
          >
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-xl border border-black/[0.08] p-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-md transition-all">
              {/* Shopping Bag Button */}
              <Link
                href="/cart"
                className="relative p-2 rounded-full text-[#1A1A1A] hover:bg-black/5 transition-colors"
                aria-label="View Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[2]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3E000C] text-[#F8DE7E] font-serif font-bold text-[9px] flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#3E000C] text-white text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                aria-label="Open Atelier Menu"
              >
                <Sparkles className="w-3 h-3 text-[#F8DE7E]" />
                <span>Menu</span>
              </button>
            </div>
          </motion.div>
        )}

        {!isScrolled && !isHome && (
          <motion.div
            key="panoramic-masthead"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.22, ease: "easeOut" } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full pointer-events-auto"
          >
            {/* Top Whisper Announcement Ticker (Full Width) */}
            <div className="w-full bg-[#3E000C] text-[#F8DE7E] border-b border-[#D4A853]/25 select-none">
              <div className="max-w-7xl mx-auto py-1.5 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-center">
                <p className="text-[10px] sm:text-[10.5px] font-semibold tracking-[0.24em] uppercase text-[#F8DE7E]/95 truncate flex items-center gap-2">
                  <span className="text-[#D4A853]">✦</span>
                  <span>Complimentary Insured Pan-India Shipping on Orders ₹5,000+ &bull; Bespoke Commissions Open</span>
                  <span className="text-[#D4A853]">✦</span>
                </p>
              </div>
            </div>

            {/* Edge-to-Edge Navigation Bar (Background extends 100vw, no side borders) */}
            <nav className="w-full bg-[#FAF7F2]/95 backdrop-blur-xl border-b border-[#EBB4BF]/35 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between min-h-[66px] py-2">
                  
                  {/* Left Links: Workshops, Events, Shop */}
                  <div className="hidden lg:flex items-center gap-7 xl:gap-9 shrink-0">
                    {navigation.slice(1, 4).map((item) => (
                      <div
                        key={item.label}
                        className="relative group"
                        onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <Link
                          href={item.href}
                          className="py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#4C1513]/85 hover:text-[#4C1513] transition-colors flex items-center gap-1.5 relative whitespace-nowrap"
                        >
                          <span>{item.label}</span>
                          {item.children && (
                            <ChevronDown className="w-3 h-3 text-[#4C1513]/50 group-hover:rotate-180 transition-transform duration-300" />
                          )}
                          <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#4C1513] group-hover:w-full transition-all duration-300" />
                        </Link>

                        {/* Dropdown Menu */}
                        <AnimatePresence>
                          {item.children && activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.98 }}
                              transition={{ duration: 0.18 }}
                              className="absolute top-full left-0 mt-3 w-64 rounded-2xl bg-[#FAF7F2]/98 backdrop-blur-2xl border border-[#D4A853]/40 p-2.5 shadow-2xl z-50"
                            >
                              <div className="space-y-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    className="px-3.5 py-2 rounded-xl text-xs font-medium text-[#4C1513] hover:bg-white hover:text-[#702026] transition-all flex items-center justify-between group/link"
                                  >
                                    <span>{child.label}</span>
                                    <ArrowRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all text-[#D4A853]" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* Center: Brand Identity Masthead (Crisp, High-Fashion, No Blobs) */}
                  <div className="flex-1 lg:flex-none flex items-center justify-center">
                    <Link
                      href="/"
                      className="group select-none flex items-center gap-3 sm:gap-3.5 py-1 text-center"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[1.5px] bg-gradient-to-tr from-[#D4A853] via-[#F8DE7E] to-[#4C1513] shrink-0 shadow-sm">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white ring-1 ring-white/70">
                          <Image
                            src="/images/logo.jpg"
                            alt="Iconic Art Global Official Logo"
                            width={44}
                            height={44}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                            priority
                          />
                        </div>
                      </div>

                      <div className="flex flex-col text-left">
                        <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.15em] uppercase text-[#4C1513] group-hover:text-[#702026] transition-colors leading-tight">
                          Iconic Art Global
                        </span>
                        <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.25em] font-medium text-[#D4A853] leading-tight">
                          L&apos;Atelier d&apos;Art &bull; Est. 2020
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Right Links: Gallery, About, Bespoke, Contact, Bag (Always Fully Visible) */}
                  <div className="hidden lg:flex items-center gap-7 xl:gap-8 shrink-0">
                    <Link
                      href="/gallery"
                      className="py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#4C1513]/85 hover:text-[#4C1513] transition-colors relative group whitespace-nowrap"
                    >
                      <span>Gallery</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#4C1513] group-hover:w-full transition-all duration-300" />
                    </Link>

                    <Link
                      href="/about"
                      className="py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#4C1513]/85 hover:text-[#4C1513] transition-colors relative group whitespace-nowrap"
                    >
                      <span>About</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#4C1513] group-hover:w-full transition-all duration-300" />
                    </Link>

                    <Link
                      href="/custom-order"
                      className="py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#4C1513]/85 hover:text-[#4C1513] transition-colors relative group whitespace-nowrap"
                    >
                      <span>Bespoke</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#4C1513] group-hover:w-full transition-all duration-300" />
                    </Link>

                    <Link
                      href="/contact"
                      className="py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#4C1513]/85 hover:text-[#4C1513] transition-colors relative group whitespace-nowrap"
                    >
                      <span>Contact</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#4C1513] group-hover:w-full transition-all duration-300" />
                    </Link>

                    {/* Shopping Bag Icon with Gold Badge */}
                    <Link
                      href="/cart"
                      className="relative p-2 text-[#4C1513] hover:text-[#702026] hover:scale-105 transition-all"
                      aria-label="View Shopping Bag"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
                      {totalItems > 0 && (
                        <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#3E000C] text-[#F8DE7E] font-serif font-bold text-[9px] flex items-center justify-center shadow">
                          {totalItems}
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Mobile Controls (Top state) */}
                  <div className="flex items-center gap-2 lg:hidden shrink-0">
                    <Link
                      href="/cart"
                      className="relative p-2 text-[#4C1513]"
                      aria-label="Shopping bag"
                    >
                      <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
                      {totalItems > 0 && (
                        <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#3E000C] text-[#F8DE7E] font-serif font-bold text-[9px] flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Link>

                    <button
                      onClick={() => setMobileOpen(true)}
                      className="p-2 text-[#4C1513] hover:text-[#702026] transition-colors cursor-pointer"
                      aria-label="Open navigation menu"
                    >
                      <Menu className="w-6 h-6 stroke-[1.8]" />
                    </button>
                  </div>

                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          STATE 2: SCULPTED HAUTE MEDALLION FLOATING ISLAND (When Scrolled: scrollY > 50)
          All links have faded. The brand logo transforms into a glowing, radiant jewel dock.
          ========================================================================= */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="sculpted-floating-medallion"
            initial={{ opacity: 0, y: -25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center px-4 pt-3 sm:pt-4 pointer-events-none"
          >
            <div className="pointer-events-auto rounded-full bg-white/55 backdrop-blur-xl saturate-150 border border-white/70 shadow-[0_8px_32px_rgba(40,10,15,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_12px_40px_rgba(40,10,15,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:scale-[1.01] transition-all duration-300 px-4 sm:px-6 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-4 select-none">
              
              {/* Clickable Floating Brand Emblem */}
              <Link
                href="/"
                onClick={scrollToTop}
                className="group select-none flex items-center gap-2.5 sm:gap-3"
                title="Iconic Art Global • Click to scroll to top"
              >
                {/* Radiant Dual-Ring Gold Bezel with Candlelight Breathing Aura */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#D4A853] via-[#F8DE7E] to-[#702026] shadow-[0_0_20px_rgba(212,168,83,0.5)] group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white ring-1 ring-white/70">
                      <Image
                        src="/images/logo.jpg"
                        alt="Iconic Art Global Official Logo"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        unoptimized
                        priority
                      />
                    </div>
                  </div>
                  {/* Candlelight ambient breathing glow (Only active when scrolled) */}
                  <span className="absolute -inset-1 rounded-full bg-[#D4A853]/20 blur-[6px] -z-10 animate-pulse pointer-events-none" />
                </div>

                {/* Shimmering Metallic Gradient Typography */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-base sm:text-lg font-bold tracking-[0.16em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#3E000C] via-[#702026] via-[#D4A853] to-[#4C1513] drop-shadow-xs whitespace-nowrap">
                      Iconic Art Global
                    </span>
                    <span className="text-[#D4A853] text-xs hidden sm:inline select-none" title="L'Atelier d'Art">
                      ⚜️
                    </span>
                  </div>
                  <span className="text-[8px] sm:text-[8.5px] uppercase tracking-[0.28em] font-semibold text-[#D4A853] whitespace-nowrap">
                    L&apos;Atelier d&apos;Art &bull; Est. 2020
                  </span>
                </div>
              </Link>

              {/* Gold Hairline Vertical Divider */}
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-[#4C1513]/20 to-transparent shrink-0 mx-1" />

              {/* Floating Island Micro-Controls (Bag + Menu) */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Shopping Bag Button */}
                <Link
                  href="/cart"
                  className="relative p-2 rounded-full text-[#4C1513] hover:text-[#702026] hover:bg-white/60 transition-all hover:scale-110"
                  aria-label="View Shopping Bag"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3E000C] text-[#F8DE7E] font-serif font-bold text-[9px] flex items-center justify-center shadow-sm">
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* Minimalist Glass Menu Trigger Pill */}
                <button
                  onClick={() => setMobileOpen(true)}
                  className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/70 hover:bg-[#3E000C] text-[#4C1513] hover:text-[#F8DE7E] border border-white/90 hover:border-transparent backdrop-blur-md shadow-xs text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 transition-all duration-300 hover:scale-105 cursor-pointer"
                  aria-label="Open Atelier Directory"
                >
                  <Menu className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Menu</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          STATE 3: FULL ATELIER DIRECTORY DRAWER (Opens when clicking Menu anywhere)
          ========================================================================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-auto bg-[#F3ECE0]/98 backdrop-blur-3xl pt-16 sm:pt-20 pb-12 px-6 overflow-y-auto flex flex-col justify-between"
          >
            {/* Top Bar with Brand Badge & Close Button */}
            <div className="max-w-md mx-auto w-full flex items-center justify-between pb-5 border-b border-[#EBB4BF]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#D4A853]">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                <span className="font-serif text-sm font-bold tracking-[0.18em] uppercase text-[#4C1513]">
                  Iconic Art Global
                </span>
              </div>

              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-full bg-white/90 border border-[#D4A853]/50 text-[#4C1513] flex items-center justify-center shadow-sm hover:scale-105 hover:bg-[#3E000C] hover:text-white transition-all cursor-pointer"
                aria-label="Close directory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Atelier Navigation Directory */}
            <div className="flex flex-col gap-5 max-w-sm mx-auto w-full text-center py-6">
              <span className="editorial-tag text-[#4C1513]/60 tracking-[0.3em] text-[10px]">
                L&apos;Atelier Navigation Directory
              </span>

              {navigation.map((item) => (
                <div key={item.label} className="border-b border-[#EBB4BF]/25 pb-3">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl font-bold text-[#4C1513] hover:text-[#702026] transition-colors"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-2.5 flex flex-wrap justify-center gap-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full bg-white text-[#4C1513] font-medium border border-[#EBB4BF]/50 shadow-sm hover:border-[#D4A853] transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/custom-order"
                onClick={() => setMobileOpen(false)}
                className="w-full py-4 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-xl mt-3 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-4 h-4 text-[#F8DE7E]" />
                <span>Bespoke Commission Studio</span>
              </Link>
            </div>

            {/* Drawer Footer */}
            <div className="text-center space-y-1">
              <p className="text-[10px] text-[#525050] uppercase tracking-widest">
                &copy; 2026 Iconic Art Global &bull; Curated by Rinki Verma
              </p>
              <p className="text-[9px] text-[#D4A853] tracking-wider uppercase font-semibold">
                @iconic.art.global &bull; iconicartglobal@gmail.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={null}>
      <HeaderContent />
    </Suspense>
  );
}
