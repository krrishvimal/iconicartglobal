"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAtelierTheme, PaletteId } from "@/hooks/useAtelierTheme";
import { Palette, Check, Sparkles, X } from "lucide-react";

export default function PaletteCuratorPill() {
  const [mounted, setMounted] = useState(false);
  const { palette, setPaletteId, availablePalettes } = useAtelierTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      suppressHydrationWarning
      className="fixed bottom-6 left-16 sm:left-20 z-40 select-none"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 p-4 rounded-3xl bg-[#FAF7F2]/98 backdrop-blur-2xl border border-[#D4A853]/50 shadow-[0_20px_50px_rgba(62,0,12,0.22)] w-72"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#EBB4BF]/30">
              <div className="flex items-center gap-2">
                <span className="text-xs">⚜️</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#4C1513]">
                  Moodboard Curator
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/80 hover:bg-[#3E000C] text-[#4C1513] hover:text-white flex items-center justify-center transition-colors text-xs cursor-pointer"
                aria-label="Close curator"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-[#525050] pt-2 pb-3 font-light leading-relaxed">
              Curate your atelier ambience inspired by Rinki Verma&apos;s haute color stories:
            </p>

            <div className="space-y-2">
              {availablePalettes.map((p) => {
                const isSelected = p.id === palette.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPaletteId(p.id);
                      setIsOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-white border-[#D4A853] shadow-md scale-[1.02]"
                        : "bg-white/50 border-[#EBB4BF]/40 hover:bg-white hover:border-[#D4A853]/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Swatch preview dots */}
                      <div className="flex -space-x-1.5 shrink-0">
                        <span
                          className="w-5 h-5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: p.primary }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: p.secondary }}
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-serif font-bold text-[#4C1513] leading-tight">
                          {p.name}
                        </p>
                        <p className="text-[9px] text-[#525050]/80 tracking-wide mt-0.5">
                          {p.tagline}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#3E000C] text-[#F8DE7E] flex items-center justify-center text-[10px] shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group px-4 py-2.5 rounded-full bg-[#FAF7F2]/95 hover:bg-white backdrop-blur-2xl border border-[#D4A853]/60 shadow-[0_12px_36px_rgba(62,0,12,0.16)] flex items-center gap-2.5 cursor-pointer text-[#4C1513] transition-all"
        title="Curate Atelier Color Moodboard"
        aria-label="Toggle Moodboard Curator"
      >
        {/* Dynamic Dual-Color Jewel Swatch */}
        <div className="flex -space-x-1 shrink-0">
          <span
            className="w-4 h-4 rounded-full border border-white shadow-sm transition-colors duration-500"
            style={{ backgroundColor: palette.primary }}
          />
          <span
            className="w-4 h-4 rounded-full border border-white shadow-sm transition-colors duration-500"
            style={{ backgroundColor: palette.secondary }}
          />
        </div>

        <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden sm:inline">
          Moodboard
        </span>

        <Sparkles className="w-3.5 h-3.5 text-[#D4A853] animate-pulse" />
      </motion.button>
    </div>
  );
}
