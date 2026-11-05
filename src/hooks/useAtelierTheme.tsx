"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PaletteId = "cabernet" | "sky" | "butter";

export interface PaletteConfig {
  id: PaletteId;
  name: string;
  tagline: string;
  primary: string; // Background / deep tone
  secondary: string; // Accent tone (pink, sky, butter)
  accentGold: string;
  badgeBg: string;
  badgeText: string;
  heroGlow: string;
}

export const palettes: Record<PaletteId, PaletteConfig> = {
  cabernet: {
    id: "cabernet",
    name: "Velvet Cabernet & Candy Silk",
    tagline: "Signature Haute Atelier Moodboard",
    primary: "#3E000C",
    secondary: "#EBB4BF",
    accentGold: "#D4A853",
    badgeBg: "rgba(235, 180, 191, 0.2)",
    badgeText: "#4C1513",
    heroGlow: "from-[#D4A853]/25 via-[#EBB4BF]/30 to-[#3E000C]/20",
  },
  sky: {
    id: "sky",
    name: "Aubergine & Sky Blue",
    tagline: "Serene Mediterranean Atelier Moodboard",
    primary: "#3E000C",
    secondary: "#A2C0DD",
    accentGold: "#D4A853",
    badgeBg: "rgba(162, 192, 221, 0.25)",
    badgeText: "#3E000C",
    heroGlow: "from-[#A2C0DD]/30 via-[#C9FBFF]/25 to-[#3E000C]/20",
  },
  butter: {
    id: "butter",
    name: "Cobalt Blue & Butter Yellow",
    tagline: "High-Fashion Lékora Campaign Moodboard",
    primary: "#1B3B6F",
    secondary: "#F8DE7E",
    accentGold: "#F8DE7E",
    badgeBg: "rgba(248, 222, 126, 0.25)",
    badgeText: "#1B3B6F",
    heroGlow: "from-[#F8DE7E]/30 via-[#FFF4D0]/30 to-[#1B3B6F]/20",
  },
};

interface AtelierThemeContextType {
  palette: PaletteConfig;
  setPaletteId: (id: PaletteId) => void;
  availablePalettes: PaletteConfig[];
}

const AtelierThemeContext = createContext<AtelierThemeContextType | undefined>(undefined);

export function AtelierThemeProvider({ children }: { children: React.ReactNode }) {
  const [paletteId, setPaletteIdState] = useState<PaletteId>("cabernet");

  useEffect(() => {
    const saved = localStorage.getItem("iconic_atelier_palette") as PaletteId;
    if (saved && palettes[saved]) {
      setPaletteIdState(saved);
    }
  }, []);

  const setPaletteId = (id: PaletteId) => {
    setPaletteIdState(id);
    localStorage.setItem("iconic_atelier_palette", id);
  };

  return (
    <AtelierThemeContext.Provider
      value={{
        palette: palettes[paletteId],
        setPaletteId,
        availablePalettes: Object.values(palettes),
      }}
    >
      {children}
    </AtelierThemeContext.Provider>
  );
}

export function useAtelierTheme() {
  const context = useContext(AtelierThemeContext);
  if (!context) {
    // Graceful fallback if used outside provider
    return {
      palette: palettes.cabernet,
      setPaletteId: () => {},
      availablePalettes: Object.values(palettes),
    };
  }
  return context;
}
