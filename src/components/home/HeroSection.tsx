"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { MapPin, Mail, ArrowRight } from "lucide-react";

interface HeroCard {
  id: string;
  label: string;
  sublabel: string;
  kicker: string;
  description: string;
  href: string;
  image: string;
  cardBg: string;
  defaultRotate: number;
  mobileRotate: number;
  defaultX: number;
  mobileX: number;
  defaultY: number;
  mobileY: number;
}

interface BrandLetter {
  ch: string;
  u: number;
}

const BRAND_WORDS: { word: string; letters: BrandLetter[] }[] = [
  {
    word: "ICONIC",
    letters: [
      { ch: "I", u: -1.0 },
      { ch: "C", u: -0.875 },
      { ch: "O", u: -0.75 },
      { ch: "N", u: -0.625 },
      { ch: "I", u: -0.5 },
      { ch: "C", u: -0.375 },
    ],
  },
  {
    word: "ART",
    letters: [
      { ch: "A", u: -0.125 },
      { ch: "R", u: 0.0 }, // Exact center of kinetic arch
      { ch: "T", u: 0.125 },
    ],
  },
  {
    word: "GLOBAL",
    letters: [
      { ch: "G", u: 0.375 },
      { ch: "L", u: 0.5 },
      { ch: "O", u: 0.625 },
      { ch: "B", u: 0.75 },
      { ch: "A", u: 0.875 },
      { ch: "L", u: 1.0 },
    ],
  },
];

const heroCards: HeroCard[] = [
  {
    id: "art",
    label: "ART",
    sublabel: "Explore Gallery ↗",
    kicker: "Pillar 01 • Sacred Geometry",
    description: "Intricate hand-drawn sacred mandalas & bespoke fine art canvases.",
    href: "/gallery",
    image: "/images/hero_cards/hero_mandala_art.webp",
    cardBg: "bg-[#480B15]", // 1. Luxury Atelier Burgundy Wine Frame
    defaultRotate: -12,
    mobileRotate: -9,
    defaultX: -140,
    mobileX: -80,
    defaultY: 8,
    mobileY: 4,
  },
  {
    id: "workshops",
    label: "WORKSHOPS",
    sublabel: "Join Masterclass ↗",
    kicker: "Pillar 02 • Masterclasses",
    description: "40+ corporate retreats, Lippan masterclasses & therapeutic art workshops.",
    href: "/workshops",
    image: "/images/workshops/lippan_workshop.webp",
    cardBg: "bg-[#FAF3EC] border border-[#E4D5C7]", // 2. Warm Atelier Linen Ivory Frame
    defaultRotate: -4,
    mobileRotate: -3,
    defaultX: -45,
    mobileX: -26,
    defaultY: -6,
    mobileY: -3,
  },
  {
    id: "atelier",
    label: "ATELIER",
    sublabel: "Original Creations ↗",
    kicker: "Pillar 03 • Handcrafted Decor",
    description: "Original handcrafted decor, gold leaf accents & bespoke customized frames.",
    href: "/shop",
    image: "/images/hero_cards/hero_atelier_framed.webp",
    cardBg: "bg-[#480B15]", // 3. Luxury Atelier Burgundy Wine Frame
    defaultRotate: 4,
    mobileRotate: 3,
    defaultX: 45,
    mobileX: 26,
    defaultY: -4,
    mobileY: -2,
  },
  {
    id: "artist",
    label: "THE ARTIST",
    sublabel: "Meet Rinki Verma ↗",
    kicker: "Pillar 04 • Founder & Educator",
    description: "Rinki Verma — Visionary artist, founder & master atelier mentor.",
    href: "/about",
    image: "/images/artist.webp",
    cardBg: "bg-[#FAF3EC] border border-[#E4D5C7]", // 4. Warm Atelier Linen Ivory Frame
    defaultRotate: 12,
    mobileRotate: 9,
    defaultX: 140,
    mobileX: 80,
    defaultY: 10,
    mobileY: 5,
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [activeCardId, setActiveCardId] = useState<string>("art");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  // Track desktop breakpoint for responsive slide behavior
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile Auto-Cycle: Gently showcase each pillar every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying || isDesktop) return;

    const interval = setInterval(() => {
      setActiveCardId((prev) => {
        const curIdx = heroCards.findIndex((c) => c.id === prev);
        const nextIdx = (curIdx + 1) % heroCards.length;
        return heroCards[nextIdx].id;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDesktop]);

  // Touch Swipe gestures on mobile
  const touchStartXRef = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.changedTouches.length === 0) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(diff) > 35) {
      setIsAutoPlaying(false);
      setActiveCardId((prev) => {
        const curIdx = heroCards.findIndex((c) => c.id === prev);
        if (diff < 0) {
          return heroCards[(curIdx + 1) % heroCards.length].id;
        } else {
          return heroCards[(curIdx - 1 + heroCards.length) % heroCards.length].id;
        }
      });
    }
  };

  // Latch protection to prevent card jumping during desktop slide animation
  const lastHoveredCardRef = useRef<string | null>(null);
  const hoverLockUntilRef = useRef<number>(0);
  const lastPointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 1. Mouse Position MotionValues for 3D Parallax Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Spring Damping for organic fluid motion
  const springConfig = { stiffness: 120, damping: 18, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Perspective Rotations
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-7, 7]);
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  // Spatial Hit-Testing with Active Slide Latch for Desktop
  const handleDeckPointerMove = (clientX: number, clientY: number) => {
    if (!deckRef.current || !isDesktop) return;

    const now = Date.now();
    const deltaX = Math.abs(clientX - lastPointerPosRef.current.x);
    const deltaY = Math.abs(clientY - lastPointerPosRef.current.y);

    if (now < hoverLockUntilRef.current && deltaX < 25 && deltaY < 25) {
      return;
    }

    const rect = deckRef.current.getBoundingClientRect();
    const relX = clientX - (rect.left + rect.width / 2);
    const relY = clientY - (rect.top + rect.height / 2);

    const maxHalfHeight = Math.max(rect.height / 2, 140) + 40;
    const maxHalfWidth = Math.max(rect.width / 2, 240) + 40;

    if (Math.abs(relY) > maxHalfHeight || Math.abs(relX) > maxHalfWidth) {
      if (hoveredCard !== null) {
        setHoveredCard(null);
        lastHoveredCardRef.current = null;
      }
      return;
    }

    let targetId: string;
    if (relX < -92.5) {
      targetId = "art";
    } else if (relX < 0) {
      targetId = "workshops";
    } else if (relX < 92.5) {
      targetId = "atelier";
    } else {
      targetId = "artist";
    }

    if (hoveredCard !== targetId) {
      setHoveredCard(targetId);
      lastHoveredCardRef.current = targetId;
      hoverLockUntilRef.current = now + 340;
      lastPointerPosRef.current = { x: clientX, y: clientY };
    }
  };

  const handleDeckMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDeckPointerMove(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredCard(null);
    lastHoveredCardRef.current = null;
  };

  const activeCard = heroCards.find((c) => c.id === hoveredCard);
  const currentMobileCard = heroCards.find((c) => c.id === activeCardId) || heroCards[0];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[640px] md:h-screen md:max-h-[960px] w-full flex flex-col justify-between items-center bg-[#FAF6F0] pt-12 xs:pt-14 sm:pt-8 pb-3 sm:pb-5 px-3 sm:px-6 lg:px-8 select-none border-b border-black/[0.06] overflow-hidden"
    >
      {/* =========================================================================
          BACKGROUND ARTWORK: "BURGUNDY CURVED PAINT STROKE" (TOP-LEFT ONLY)
          Tucked elegantly into the corner to frame the canvas without colliding with text
          ========================================================================= */}
      <div className="absolute -top-2 -left-6 sm:-top-5 sm:-left-10 md:-top-7 md:-left-12 lg:-top-8 lg:-left-14 w-[100px] xs:w-[120px] sm:w-[280px] md:w-[380px] lg:w-[460px] xl:w-[510px] h-auto aspect-[1536/1024] pointer-events-none select-none z-0">
        <Image
          src="/images/burgundy_paint_stroke.webp"
          alt="Burgundy Curved Paint Stroke"
          fill
          className="object-contain object-top-left pointer-events-none drop-shadow-[0_12px_28px_rgba(72,11,21,0.10)] opacity-70 sm:opacity-100"
          priority
          unoptimized
        />
      </div>

      {/* =========================================================================
          1. TOP LOCATION & CONTACT META + BRAND TITLE & ATELIER TAGLINE
          Monumental Kinetic Typographic Intro (Clara Gaggero Westaway Kinetic Arch)
          Starts wide & arched across screen, then shrinks smoothly to the top header
          ========================================================================= */}
      <div className="text-center z-20 shrink-0 relative w-full flex flex-col items-center">
        
        {/* Top Location & Email Header Pill Bar */}
        <div
          className="animate-fade-delayed flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[9px] xs:text-[10px] sm:text-[11.5px] font-mono tracking-[0.16em] sm:tracking-[0.20em] uppercase text-[#786C65] font-semibold max-w-[290px] xs:max-w-md sm:max-w-none px-2"
        >
          <span className="inline-flex items-center gap-1.5 text-[#480B15]">
            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#480B15] shrink-0" />
            <span>GREATER NOIDA • NCR, INDIA</span>
          </span>
          <span className="hidden sm:inline text-[#8B7D76]/40">|</span>
          <span className="inline-flex items-center gap-1.5 text-[#786C65]">
            <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#786C65] shrink-0" />
            <span className="lowercase">iconicartglobal@gmail.com</span>
          </span>
        </div>

        {/* Monumental Brand Display Title - Instant GPU-Composited Kinetic Intro (Zero Lag / Zero Stick) */}
        <div
          className="animate-kinetic-shrink text-center mt-2 sm:mt-4 md:mt-4 mb-0 origin-center will-change-transform z-30 select-none px-2"
        >
          <h1 className="font-spencer font-black text-[30px] xs:text-[34px] sm:text-6xl md:text-7xl lg:text-[94px] xl:text-[108px] uppercase text-[#2B0810] leading-[0.92] sm:leading-[0.88] tracking-[-0.02em]">
            {BRAND_WORDS.map((w, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap">
                {w.letters.map((l, lIdx) => (
                  <span
                    key={lIdx}
                    className="animate-letter-unwarp inline-block origin-bottom"
                    style={{
                      "--warp-y": `${(l.u * l.u) * -22 + 11}px`,
                      "--warp-sy": `${1 + (l.u * l.u) * 0.48}`,
                      "--warp-sx": `${1 + (l.u * l.u) * 0.12}`,
                      "--warp-rot": `${l.u * 10}deg`,
                    } as React.CSSProperties}
                  >
                    {l.ch}
                  </span>
                ))}
                {wIdx < BRAND_WORDS.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Elegant Editorial Subtitle Flanked with Hairlines */}
        <div
          className="animate-fade-delayed flex items-center justify-center gap-2 sm:gap-3 mt-1 sm:mt-3 px-4"
        >
          <span className="h-px w-5 xs:w-8 sm:w-16 bg-[#8B7D76]/40" />
          <p className="font-serif italic text-[10px] xs:text-xs sm:text-sm md:text-base tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#786C65] font-medium text-center">
            Art That Connects People &amp; Ideas
          </p>
          <span className="h-px w-5 xs:w-8 sm:w-16 bg-[#8B7D76]/40" />
        </div>

      </div>

      {/* =========================================================================
          2. CENTER STAGE:
             - ON MOBILE: Active Card Editorial Showcase + Interactive 4-Card Deck
             - ON DESKTOP: 3D Deck slides left on hover + Right Editorial Typography
          ========================================================================= */}
      <div className="relative w-full max-w-7xl flex-1 flex flex-col md:flex-row items-center justify-center my-auto z-30 perspective-[1400px]">
        
        {/* -----------------------------------------------------------------------
            MOBILE EDITORIAL SHOWCASE (Fills the previously empty middle space!)
            Smoothly morphs with active pillar, shows description and direct CTA button
            ----------------------------------------------------------------------- */}
        <div className="block md:hidden w-full max-w-sm px-4 text-center mt-3 mb-4 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMobileCard.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              {/* Pillar Monospace Kicker */}
              <div className="inline-flex items-center gap-1.5 mb-1">
                <span className="h-px w-3 bg-[#480B15]/40" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#786C65] font-semibold">
                  {currentMobileCard.kicker}
                </span>
                <span className="h-px w-3 bg-[#480B15]/40" />
              </div>

              {/* Pillar Display Title */}
              <h2 className="font-spencer font-black text-2xl xs:text-3xl uppercase text-[#2B0810] leading-tight tracking-[-0.01em]">
                {currentMobileCard.label}
              </h2>

              {/* Refined Fine-Art Editorial Subtitle */}
              <p className="font-serif italic text-[11.5px] text-[#786C65] mt-1 max-w-[280px] leading-snug">
                {currentMobileCard.description}
              </p>

              {/* Luxury Pill CTA Button */}
              <Link
                href={currentMobileCard.href}
                className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#480B15] text-[#FAF6F0] text-[10px] font-semibold tracking-[0.16em] uppercase shadow-sm active:scale-95 transition-all"
              >
                <span>{currentMobileCard.sublabel}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Minimalist 4-Pillar Indicator Bar */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            {heroCards.map((c) => {
              const isActive = currentMobileCard.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCardId(c.id);
                    setIsAutoPlaying(false);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "w-6 bg-[#480B15]" : "w-1.5 bg-[#480B15]/25"
                  }`}
                  aria-label={`Select ${c.label}`}
                />
              );
            })}
          </div>
        </div>

        {/* -----------------------------------------------------------------------
            THE 3D CARD DECK CONTAINER
            - Mobile: elevated active card, swipeable, tap-to-switch or tap-to-navigate
            - Desktop: slides left smoothly on hover
            ----------------------------------------------------------------------- */}
        <motion.div
          ref={deckRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: hoveredCard && isDesktop ? -140 : 0,
          }}
          transition={{
            opacity: { duration: 1.0, delay: 1.2, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 1.1, delay: 1.2, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 0.36, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleDeckMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative w-[290px] xs:w-[330px] sm:w-[460px] md:w-[520px] h-[175px] xs:h-[195px] sm:h-[280px] md:h-[310px] origin-center flex items-center justify-center z-20 cursor-pointer"
        >
          {/* Ambient Depth Blur Shadow Underneath Cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[560px] h-[70px] sm:h-[90px] rounded-full bg-[#480B15]/10 blur-2xl pointer-events-none z-10" />

          {/* 4 Minimalist Squircle Cards with Luxury Alternating Frames */}
          {heroCards.map((card, idx) => {
            const isCardActive = isDesktop ? hoveredCard === card.id : activeCardId === card.id;
            const targetX = isDesktop ? card.defaultX : card.mobileX;
            const targetY = isDesktop
              ? (isCardActive ? card.defaultY - 26 : card.defaultY)
              : (isCardActive ? card.mobileY - 14 : card.mobileY);
            const targetRotate = isDesktop
              ? (isCardActive ? card.defaultRotate * 0.2 : card.defaultRotate)
              : (isCardActive ? card.mobileRotate * 0.2 : card.mobileRotate);
            const targetScale = isCardActive ? (isDesktop ? 1.07 : 1.05) : (isDesktop ? 1 : 0.97);
            const targetZ = isCardActive ? 120 : idx * 14;
            const targetOpacity = isDesktop
              ? (hoveredCard && !isCardActive ? 0.88 : 1)
              : (isCardActive ? 1 : 0.82);

            return (
              <motion.div
                key={card.id}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 0.95,
                }}
                animate={{
                  x: targetX,
                  y: targetY,
                  z: targetZ,
                  rotate: targetRotate,
                  scale: targetScale,
                  opacity: targetOpacity,
                }}
                transition={{
                  x: { duration: 1.1, delay: 1.2 + idx * 0.07, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 1.1, delay: 1.2 + idx * 0.07, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: isCardActive ? 0.28 : 1.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                  zIndex: isCardActive ? 60 : idx + 1,
                }}
                onClick={(e) => {
                  if (!isDesktop) {
                    if (activeCardId !== card.id) {
                      e.preventDefault();
                      setActiveCardId(card.id);
                      setIsAutoPlaying(false);
                    }
                  }
                }}
                className={`absolute w-[120px] xs:w-[138px] sm:w-[205px] md:w-[235px] h-[152px] xs:h-[176px] sm:h-[235px] md:h-[270px] rounded-[18px] sm:rounded-[32px] overflow-visible ${card.cardBg} cursor-pointer block p-1.5 sm:p-2.5 select-none transition-shadow duration-300 ${
                  isCardActive
                    ? "shadow-[0_24px_55px_rgba(72,11,21,0.28)]"
                    : "shadow-[0_12px_28px_rgba(72,11,21,0.11)]"
                }`}
              >
                <Link
                  href={card.href}
                  className="relative w-full h-full block rounded-[14px] sm:rounded-[24px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.10)] bg-black/5"
                >
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className={`object-cover object-top transition-transform duration-500 pointer-events-none ${
                      isCardActive ? "scale-105" : "scale-100"
                    }`}
                    unoptimized
                    priority
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* -----------------------------------------------------------------------
            DESKTOP RIGHT-SIDE EDITORIAL TYPOGRAPHY SLOT
            Appears with haute couture elegance when deck slides left on hover
            ----------------------------------------------------------------------- */}
        <div className="hidden md:block absolute left-[calc(50%+190px)] lg:left-[calc(50%+205px)] top-1/2 -translate-y-1/2 w-[280px] lg:w-[340px] xl:w-[380px] z-30 pointer-events-auto">
          <AnimatePresence mode="wait">
            {activeCard && (
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, x: 28, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 18, filter: "blur(3px)" }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="text-left select-none"
              >
                <Link
                  href={activeCard.href}
                  onMouseEnter={() => setHoveredCard(activeCard.id)}
                  className="block group cursor-pointer"
                >
                  {/* Pillar / Collection Monospace Kicker */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-px w-6 bg-[#480B15]/40" />
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.24em] text-[#786C65] font-semibold">
                      {activeCard.kicker}
                    </span>
                  </div>

                  {/* Monumental Display Title - Haute Spencer Display Font */}
                  <h2 className="font-spencer font-black text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] uppercase text-[#2B0810] leading-[0.86] tracking-[-0.02em] group-hover:text-[#480B15] transition-colors">
                    {activeCard.label}
                  </h2>

                  {/* Refined Fine-Art Editorial Subtitle */}
                  <p className="font-serif italic text-xs sm:text-sm lg:text-base text-[#786C65] mt-2 sm:mt-2.5 tracking-wide leading-snug">
                    {activeCard.description}
                  </p>

                  {/* Luxury Pill CTA Button */}
                  <div className="mt-4 sm:mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#480B15] text-[#FAF6F0] text-xs font-semibold tracking-[0.16em] uppercase group-hover:bg-[#32060E] transition-all shadow-md group-hover:translate-x-1 duration-300">
                    <span>{activeCard.sublabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* =========================================================================
          3. BOTTOM ELEGANT ATELIER DESCRIPTOR (In Normal Flow, Zero Clipping)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-20 shrink-0 pb-2 sm:pb-4 select-none pointer-events-none"
      >
        <p className="font-spencer font-bold text-sm xs:text-base sm:text-2xl md:text-3xl uppercase tracking-[0.16em] text-[#C4C6D0]">
          Artist &bull; Educator &bull; Atelier
        </p>
      </motion.div>

    </section>
  );
}
