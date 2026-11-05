"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, Mail, X, PhoneCall, ArrowUpRight } from "lucide-react";
import { brandInfo } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Atelier Concierge" className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-[#3E000C] text-[#F3ECE0] border border-[#D4A853]/40 shadow-2xl p-6 backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Background filigree glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4A853]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#EBB4BF]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-[#D4A853]/30 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#4C1513] border border-[#F8DE7E] flex items-center justify-center">
                  <span className="text-[#F8DE7E] text-xs">⚜️</span>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#F8DE7E] tracking-wide">
                    Atelier Concierge
                  </h4>
                  <p className="text-[10px] text-[#EBB4BF] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Rinki Verma • Private Art Advisor
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#F3ECE0] flex items-center justify-center transition-colors"
                aria-label="Close Concierge"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content text */}
            <p className="relative text-xs text-[#F3ECE0]/80 leading-relaxed mb-4">
              Seeking a commissioned masterpiece, private workshop booking, or corporate retreat styling? Connect directly with founder Rinki Verma.
            </p>

            {/* Actions */}
            <div className="relative space-y-2.5">
              <a
                href="https://wa.me/?text=Hello%20Rinki!%20I'm%20admiring%20Iconic%20Art%20Global%20and%20would%20love%20to%20consult%20with%20you%20regarding%20a%20bespoke%20creation%20or%20workshop."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D4A853] to-[#F8DE7E] hover:from-[#C5A059] hover:to-[#E6C85E] text-[#3E000C] font-bold text-xs uppercase tracking-[0.18em] transition-all flex items-center justify-between shadow-lg hover:shadow-xl group"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 fill-[#3E000C]" />
                  <span>VIP WhatsApp Consultation</span>
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <Link
                href="/custom-order"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-[#F3ECE0] border border-[#EBB4BF]/30 font-medium text-xs tracking-wider transition-all flex items-center justify-between group"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#EBB4BF]" />
                  <span>Configure Bespoke Commission</span>
                </span>
                <span className="text-[10px] text-[#F8DE7E] font-mono">04 STEPS &rarr;</span>
              </Link>

              <a
                href={`mailto:${brandInfo.email}?subject=Private%20Atelier%20Inquiry%20-%20Iconic%20Art%20Global`}
                className="w-full py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[#F3ECE0]/80 font-medium text-xs tracking-wider transition-all flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#A2C0DD]" />
                  <span>{brandInfo.email}</span>
                </span>
                <span className="text-[10px] text-[#A2C0DD] uppercase">Email</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Pill */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#3E000C] text-[#F3ECE0] border border-[#D4A853]/60 shadow-[0_15px_35px_rgba(62,0,12,0.35)] hover:shadow-[0_20px_45px_rgba(212,168,83,0.3)] transition-all overflow-hidden"
        aria-label="Open Atelier Concierge"
      >
        {/* Shimmer line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Monogram Crest */}
        <div className="w-7 h-7 rounded-full bg-[#4C1513] border border-[#F8DE7E] flex items-center justify-center shrink-0">
          <span className="text-xs text-[#F8DE7E]">⚜️</span>
        </div>

        <div className="text-left hidden sm:block pr-1">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F8DE7E] leading-tight">
            Atelier Concierge
          </p>
          <p className="text-[9px] text-[#EBB4BF] font-medium leading-tight">
            Bespoke Inquiries &bull; Live
          </p>
        </div>

        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
      </motion.button>
    </aside>
  );
}
