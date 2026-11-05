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
  href: string;
  image: string;
  cardBg: string;
  defaultRotate: number;
  defaultX: number;
  defaultY: number;
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
    href: "/gallery",
    image: "/images/hero_cards/hero_mandala_art.webp",
    cardBg: "bg-[#480B15]", // 1. Luxury Atelier Burgundy Wine Frame
    defaultRotate: -12,
    defaultX: -140,
    defaultY: 8,
  },
  {
    id: "workshops",
    label: "WORKSHOPS",
    sublabel: "Join Masterclass ↗",
    href: "/workshops",
    image: "/images/workshops/lippan_workshop.webp",
    cardBg: "bg-[#FAF3EC] border border-[#E4D5C7]", // 2. Warm Atelier Linen Ivory Frame
    defaultRotate: -4,
    defaultX: -45,
    defaultY: -6,
  },
  {
    id: "atelier",
    label: "ATELIER",
    sublabel: "Original Creations ↗",
    href: "/shop",
    image: "/images/hero_cards/hero_atelier_framed.webp",
    cardBg: "bg-[#480B15]", // 3. Luxury Atelier Burgundy Wine Frame
    defaultRotate: 4,
    defaultX: 45,
    defaultY: -4,
  },
  {
    id: "artist",
    label: "THE ARTIST",
    sublabel: "Meet Rinki Verma ↗",
    href: "/about",
    image: "/images/artist.webp",
    cardBg: "bg-[#FAF3EC] border border-[#E4D5C7]", // 4. Warm Atelier Linen Ivory Frame
    defaultRotate: 12,
    defaultX: 140,
    defaultY: 10,
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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

  // Latch protection to prevent card jumping during the slide animation
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

  // 1000% Jitter-Free Spatial Hit-Testing with Active Slide Latch
  const handleDeckPointerMove = (clientX: number, clientY: number) => {
    if (!deckRef.current) return;

    const now = Date.now();
    const deltaX = Math.abs(clientX - lastPointerPosRef.current.x);
    const deltaY = Math.abs(clientY - lastPointerPosRef.current.y);

    // During slide transition (340ms), keep active card locked unless user intentionally moves pointer >25px
    if (now < hoverLockUntilRef.current && deltaX < 25 && deltaY < 25) {
      return;
    }

    const rect = deckRef.current.getBoundingClientRect();
    const relX = clientX - (rect.left + rect.width / 2);
    const relY = clientY - (rect.top + rect.height / 2);

    // Generous boundary check around card bounds
    const maxHalfHeight = Math.max(rect.height / 2, 140) + 40;
    const maxHalfWidth = Math.max(rect.width / 2, 240) + 40;

    if (Math.abs(relY) > maxHalfHeight || Math.abs(relX) > maxHalfWidth) {
      if (hoveredCard !== null) {
        setHoveredCard(null);
        lastHoveredCardRef.current = null;
      }
      return;
    }

    // Mathematical midpoints between card centers (-140, -45, +45, +140)
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
      hoverLockUntilRef.current = now + 340; // Lock for duration of slide animation
      lastPointerPosRef.current = { x: clientX, y: clientY };
    }
  };

  const handleDeckMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDeckPointerMove(e.clientX, e.clientY);
  };

  const handleDeckTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    handleDeckPointerMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredCard(null);
    lastHoveredCardRef.current = null;
  };

  const activeCard = heroCards.find((c) => c.id === hoveredCard);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-screen min-h-[620px] max-h-[940px] w-full flex flex-col justify-between items-center bg-[#FAF6F0] pt-6 sm:pt-8 pb-5 px-4 sm:px-6 lg:px-8 select-none border-b border-black/[0.06] overflow-hidden"
    >
      {/* =========================================================================
          BACKGROUND ARTWORK: "BURGUNDY CURVED PAINT STROKE" (TOP-LEFT ONLY)
          Tucked elegantly into the corner to frame the canvas without colliding
          ========================================================================= */}
      <div className="absolute -top-3 -left-8 sm:-top-5 sm:-left-10 md:-top-7 md:-left-12 lg:-top-8 lg:-left-14 w-[250px] sm:w-[330px] md:w-[410px] lg:w-[470px] xl:w-[510px] h-auto aspect-[1536/1024] pointer-events-none select-none z-0">
        <Image
          src="/images/burgundy_paint_stroke.webp"
          alt="Burgundy Curved Paint Stroke"
          fill
          className="object-contain object-top-left pointer-events-none drop-shadow-[0_12px_28px_rgba(72,11,21,0.10)]"
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
          className="animate-fade-delayed flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11.5px] font-mono tracking-[0.20em] uppercase text-[#786C65] font-semibold"
        >
          <span className="inline-flex items-center gap-1.5 text-[#480B15]">
            <MapPin className="w-3.5 h-3.5 text-[#480B15]" />
            <span>GREATER NOIDA • NCR, INDIA</span>
          </span>
          <span className="text-[#8B7D76]/40">|</span>
          <span className="inline-flex items-center gap-1.5 text-[#786C65]">
            <Mail className="w-3.5 h-3.5 text-[#786C65]" />
            <span className="lowercase">iconicartglobal@gmail.com</span>
          </span>
        </div>

        {/* Monumental Brand Display Title - Instant GPU-Composited Kinetic Intro (Zero Lag / Zero Stick) */}
        <div
          className="animate-kinetic-shrink text-center mt-3 sm:mt-4 md:mt-4 mb-0 origin-center will-change-transform z-30 select-none"
        >
          <h1 className="font-spencer font-black text-4xl sm:text-6xl md:text-7xl lg:text-[94px] xl:text-[108px] uppercase text-[#2B0810] leading-[0.90] sm:leading-[0.88] tracking-[-0.02em]">
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
          className="animate-fade-delayed flex items-center justify-center gap-3 mt-2 sm:mt-3"
        >
          <span className="h-px w-8 sm:w-16 bg-[#8B7D76]/40" />
          <p className="font-serif italic text-xs sm:text-sm md:text-base tracking-[0.22em] uppercase text-[#786C65] font-medium">
            Art That Connects People &amp; Ideas
          </p>
          <span className="h-px w-8 sm:w-16 bg-[#8B7D76]/40" />
        </div>

      </div>

      {/* =========================================================================
          2. CENTER 3D STAGE: CARDS SLIDE LEFT ON HOVER + MONUMENTAL TYPOGRAPHY ON RIGHT
          Butter-smooth, zero-jitter slide latch mechanism with true 3D Z-separation.
          ========================================================================= */}
      <div className="relative w-full max-w-7xl flex-1 flex items-center justify-center my-auto z-30 perspective-[1400px]">
        
        {/* The 3D Card Deck Container (Slides left smoothly on hover on desktop) */}
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
          onTouchMove={handleDeckTouchMove}
          onTouchStart={handleDeckTouchMove}
          onMouseLeave={() => setHoveredCard(null)}
          className="relative w-[320px] sm:w-[460px] md:w-[520px] h-[230px] sm:h-[280px] md:h-[310px] scale-[0.84] xs:scale-[0.90] sm:scale-95 md:scale-100 origin-center flex items-center justify-center z-20 cursor-pointer"
        >
          {/* Ambient Depth Blur Shadow Underneath Cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] h-[90px] rounded-full bg-[#480B15]/10 blur-2xl pointer-events-none z-10" />

          {/* 4 Minimalist Squircle Cards with Luxury Alternating Frames */}
          {heroCards.map((card, idx) => {
            const isHovered = hoveredCard === card.id;

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
                  x: card.defaultX,
                  y: isHovered ? card.defaultY - 26 : card.defaultY,
                  z: isHovered ? 120 : idx * 14,
                  rotate: isHovered ? card.defaultRotate * 0.2 : card.defaultRotate,
                  scale: isHovered ? 1.07 : 1,
                  opacity: hoveredCard && !isHovered ? 0.88 : 1,
                }}
                transition={{
                  x: { duration: 1.1, delay: 1.2 + idx * 0.07, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 1.1, delay: 1.2 + idx * 0.07, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: isHovered ? 0.28 : 1.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                }}
                style={{
                  transformOrigin: "bottom center",
                  transformStyle: "preserve-3d",
                  zIndex: isHovered ? 60 : idx + 1,
                }}
                className={`absolute w-[165px] sm:w-[205px] md:w-[235px] h-[190px] sm:h-[235px] md:h-[270px] rounded-[24px] sm:rounded-[32px] overflow-visible ${card.cardBg} cursor-pointer block p-2 sm:p-2.5 select-none transition-shadow duration-300 ${
                  isHovered
                    ? "shadow-[0_28px_65px_rgba(72,11,21,0.26)]"
                    : "shadow-[0_16px_36px_rgba(72,11,21,0.11)]"
                }`}
              >
                <Link
                  href={card.href}
                  className="relative w-full h-full block rounded-[18px] sm:rounded-[24px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.10)] bg-black/5"
                >
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    className={`object-cover object-top transition-transform duration-500 pointer-events-none ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                    unoptimized
                    priority
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right-Side Editorial Typography Slot (Appears with haute couture elegance when deck slides left) */}
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
                      Pillar 0{heroCards.findIndex((c) => c.id === activeCard.id) + 1} &bull; Atelier Core
                    </span>
                  </div>

                  {/* Monumental Display Title - Haute Spencer Display Font */}
                  <h2 className="font-spencer font-black text-5xl sm:text-6xl lg:text-7xl xl:text-[84px] uppercase text-[#2B0810] leading-[0.86] tracking-[-0.02em] group-hover:text-[#480B15] transition-colors">
                    {activeCard.label}
                  </h2>

                  {/* Refined Fine-Art Editorial Subtitle */}
                  <p className="font-serif italic text-xs sm:text-sm lg:text-base text-[#786C65] mt-2 sm:mt-2.5 tracking-wide leading-snug">
                    {activeCard.id === "art" && "Intricate hand-drawn sacred mandalas & bespoke fine art"}
                    {activeCard.id === "workshops" && "40+ masterclasses & creative corporate retreats"}
                    {activeCard.id === "atelier" && "Original handcrafted decor & bespoke customized frames"}
                    {activeCard.id === "artist" && "Rinki Verma — Founder, master educator & visionary artist"}
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
        className="text-center z-20 shrink-0 pb-3 sm:pb-4 select-none pointer-events-none"
      >
        <p className="font-spencer font-bold text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.16em] text-[#C4C6D0]">
          Artist &bull; Educator &bull; Atelier
        </p>
      </motion.div>

    </section>
  );
}
