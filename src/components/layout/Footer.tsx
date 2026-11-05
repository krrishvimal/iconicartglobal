"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Heart, ArrowUp, ArrowUpRight } from "lucide-react";
import { Instagram, Youtube } from "@/components/ui/Icons";
import { brandInfo } from "@/lib/constants";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF7F2] text-[#3E000C] border-t border-black/[0.08] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        
        {/* =========================================================================
            1. MONUMENTAL SPENCER GABOR-STYLE GET IN TOUCH MASTHEAD
            ========================================================================= */}
        <div className="text-left pb-16 border-b border-black/[0.08] space-y-4">
          <p className="text-[10.5px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4A853] font-bold">
            LET&apos;S CREATE ART TOGETHER &bull; COMMISSIONS &bull; MASTERCLASSES &bull; EVENTS
          </p>

          <h2 className="font-sans font-black tracking-[-0.04em] text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase text-[#3E000C] leading-none">
            Get In Touch
          </h2>

          <div className="pt-2">
            <a
              href="mailto:iconicartglobal@gmail.com"
              className="group inline-flex items-center gap-3 text-2xl sm:text-4xl md:text-5xl font-sans font-black tracking-tight text-[#3E000C] hover:text-[#D4A853] transition-colors"
            >
              <span className="underline underline-offset-8">iconicartglobal@gmail.com</span>
              <ArrowUpRight className="w-7 h-7 sm:w-10 sm:h-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* =========================================================================
            2. SPENCER GABOR-STYLE CLEAN NAVIGATION & ATELIER INFO
            ========================================================================= */}
        <div className="pt-12 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          
          {/* Col 1: Studio Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-black/[0.1] shadow-xs bg-white shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="Iconic Art Global Official Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-serif font-bold text-lg text-[#3E000C] leading-none">
                  Iconic Art Global
                </p>
                <p className="text-[9.5px] font-mono tracking-widest uppercase text-[#D4A853] font-bold mt-0.5">
                  Curated by Rinki Verma
                </p>
              </div>
            </div>

            <p className="text-xs text-[#525050] font-normal leading-relaxed pt-1">
              Independent creative atelier for sacred geometry mandalas, authentic Lippan mirror art, and hands-on masterclasses.
            </p>
          </div>

          {/* Col 2: Studio Navigation */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#D4A853] font-bold">
              Navigation
            </p>
            <ul className="space-y-1.5 text-xs font-semibold text-[#3E000C]">
              <li>
                <Link href="/workshops" className="hover:text-[#D4A853] transition-colors">
                  Workshops &amp; Masterclasses
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#D4A853] transition-colors">
                  Permanent Art Shop
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#D4A853] transition-colors">
                  Private Soirées &amp; Galas
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#D4A853] transition-colors">
                  Atelier Salon Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Coordinates */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#D4A853] font-bold">
              Coordinates
            </p>
            <p className="text-xs text-[#525050] leading-relaxed">
              Greater Noida, New Delhi NCR<br />
              India &bull; Worldwide Wooden Delivery
            </p>
            <p className="text-xs font-mono font-bold text-[#3E000C] pt-1">
              +91 99999 XXXXX
            </p>
          </div>

          {/* Col 4: Social Channels */}
          <div className="space-y-2.5">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[#D4A853] font-bold">
              Channels
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href={brandInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#3E000C] border border-black/[0.08] flex items-center justify-center hover:bg-[#3E000C] hover:text-[#F8DE7E] transition-all shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={brandInfo.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#3E000C] border border-black/[0.08] flex items-center justify-center hover:bg-[#3E000C] hover:text-[#F8DE7E] transition-all shadow-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={brandInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white text-[#3E000C] border border-black/[0.08] flex items-center justify-center hover:bg-[#3E000C] hover:text-[#F8DE7E] transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* =========================================================================
            3. BOTTOM STATUS & BACK TO TOP BAR
            ========================================================================= */}
        <div className="pt-8 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#525050]">
          <p className="font-mono text-[10.5px] uppercase tracking-wider">
            &copy; 2026 ICONIC ART GLOBAL &bull; CURATED BY RINKI VERMA. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[10.5px] font-mono uppercase tracking-widest text-[#3E000C] font-bold hover:text-[#D4A853] transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}