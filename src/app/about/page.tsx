"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  Heart,
  Award,
  Users,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Target,
  Eye,
  MessageCircle,
  ShieldCheck,
  Feather,
} from "lucide-react";
import { brandInfo, stats } from "@/lib/constants";

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const pillars = [
  {
    icon: <Palette className="w-7 h-7 text-[#4C1513]" />,
    title: "100% Handcrafted Intention",
    description:
      "Every mandala geometry, Lippan mirror placement, and watercolor wash is executed purely by human hands with patient devotion.",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-[#D4A853]" />,
    title: "Bespoke Personalization",
    description:
      "Your cherished memories and aesthetic spaces take center stage. From custom palettes to personalized quotes, every commission is unique.",
  },
  {
    icon: <Award className="w-7 h-7 text-[#4C1513]" />,
    title: "40+ Masterclasses Milestone",
    description:
      "Having hosted 40+ physical and virtual workshops, Rinki Verma brings patient, joyful, step-by-step instruction for both beginners and connoisseurs.",
  },
  {
    icon: <Users className="w-7 h-7 text-[#D4A853]" />,
    title: "17.1K+ Connoisseurs",
    description:
      "A growing global family of art lovers, corporate leaders, and collectors united by the love of authentic craftsmanship.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F3ECE0] text-[#2A1817]">
      {/* 1. Haute Atelier About Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden border-b border-[#EBB4BF]/40">
        <div className="absolute inset-0">
          <Image
            src="/images/instagram/upits_exhibition.jpg"
            alt="Iconic Art Global Atelier & Exhibition"
            fill
            className="object-cover scale-105"
            unoptimized
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-[#3E000C]/90 to-[#3E000C]/75" />
        <div className="absolute inset-0 bg-pattern opacity-20 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4A853]/60 backdrop-blur-md text-[10px] uppercase font-bold tracking-[0.25em] text-[#F3ECE0] mb-6"
            >
              <span className="text-[#F8DE7E]">⚜️</span>
              The Artisanal Story &bull; Founded by Rinki Verma
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-bold text-[#F3ECE0] tracking-tight mb-6 leading-[1.08]"
            >
              Where Sacred Geometry,
              <br />
              <span className="font-serif italic font-normal text-[#F8DE7E]">
                Meets Modern Atelier Luxury.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[#EBB4BF] text-base sm:text-lg max-w-2xl leading-relaxed font-light"
            >
              From intimate home studio masterclasses to 40+ curated workshops, live international
              exhibitions, and a 17,000+ member connoisseur community — discover the journey of Iconic Art Global.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Provenance Stats Ribbon */}
      <section className="bg-[#FAF7F2] border-b border-[#EBB4BF]/40 py-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="p-2">
                <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4C1513] mb-1">
                  {stat.value}
                  <span className="text-[#D4A853]">{stat.suffix}</span>
                </p>
                <p className="editorial-tag text-[10px] text-[#525050] tracking-[0.22em] uppercase mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Founder Editorial Feature */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait in Museum Mat-Board Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#D4A853]/25 via-[#EBB4BF]/30 to-[#4C1513]/15 blur-xl pointer-events-none" />

              <div className="relative bg-[#FAF7F2] p-4 rounded-[36px] border border-[#D4A853]/40 shadow-2xl">
                <div className="relative h-[480px] sm:h-[540px] w-full rounded-[28px] overflow-hidden bg-[#E6DCCB]">
                  <Image
                    src="/images/artist.webp"
                    alt="Rinki Verma - Founder & Lead Artist of Iconic Art Global"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#3E000C]/90 via-[#3E000C]/40 to-transparent pointer-events-none" />

                  <div className="absolute bottom-5 left-5 right-5 text-white text-left">
                    <span className="candy-badge px-3 py-1 rounded-full text-[9px] shadow mb-2 inline-block">
                      Founder &amp; Art Educator
                    </span>
                    <h3 className="font-serif text-2xl font-bold drop-shadow">
                      {brandInfo.founder}
                    </h3>
                    <p className="text-xs text-[#F3ECE0]/90 font-light mt-0.5">
                      {brandInfo.founderTitle}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4A853]/30 flex items-center justify-between text-xs text-[#525050]">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-[#4C1513]">
                    <ShieldCheck className="w-4 h-4 text-[#D4A853]" />
                    Atelier Provenance Certified
                  </span>
                  <span className="font-mono text-[10px] text-[#525050]">
                    Atelier N° 01
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="editorial-tag text-[10px] text-[#4C1513] font-bold tracking-[0.28em] uppercase block mb-1">
                Meet The Founder
              </span>
              <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4C1513] leading-tight">
                Art is Not Mere Decoration,
                <span className="block font-serif italic font-normal text-[#702026]">
                  It is What We Feel &amp; Leave Behind.
                </span>
              </h2>
            </div>

            {brandInfo.story.map((paragraph, index) => (
              <p
                key={index}
                className="text-[#525050] text-base sm:text-lg leading-relaxed font-normal"
              >
                {paragraph}
              </p>
            ))}

            {/* Founder Quote Card */}
            <div className="p-8 rounded-3xl bg-white border border-[#EBB4BF] relative overflow-hidden shadow-md">
              <span className="absolute top-2 left-6 text-7xl font-serif text-[#D4A853]/20 select-none pointer-events-none">
                “
              </span>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#4C1513] italic leading-snug relative z-10">
                &ldquo;Every individual holds an artist waiting to be awakened. An art masterclass isn&apos;t just about technique; it is a quiet sanctuary to discover parts of yourself you didn&apos;t know existed.&rdquo;
              </p>

              <div className="mt-5 pt-4 border-t border-[#EBB4BF]/30 flex items-center justify-between">
                <div>
                  <span className="font-cursive text-2xl font-bold text-[#4C1513] block">
                    Rinki Verma
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#525050]">
                    Founder &bull; Iconic Art Global
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#3E000C] text-[#F8DE7E] flex items-center justify-center">
                  <Feather className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/workshops"
                className="px-8 py-3.5 rounded-full bg-[#4C1513] hover:bg-[#3E000C] text-white border border-[#D4A853]/40 shadow-lg text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 group hover:scale-[1.02]"
              >
                <span>Explore Her Workshops</span>
                <ArrowRight className="w-4 h-4 text-[#EBB4BF] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/custom-order"
                className="px-8 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#4C1513] border border-[#EBB4BF] text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-[#D4A853]" />
                <span>Commission Custom Piece</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Atelier Pillars Grid */}
      <section className="py-24 bg-[#FAF7F2] border-t border-[#EBB4BF]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-tag text-[10px] text-[#4C1513] tracking-[0.3em] font-bold uppercase">
              The Atelier Standard
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#4C1513] mt-2">
              Why Iconic Art Global Stands Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#D4A853]/30 shadow-sm relative text-left group hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#EBB4BF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#4C1513] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#525050] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Milestones Timeline */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="editorial-tag text-[10px] text-[#4C1513] tracking-[0.3em] font-bold uppercase">
            Provenance Timeline
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl font-bold text-[#4C1513] mt-2">
            The Journey to 40+ Masterclasses
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandInfo.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#EBB4BF] shadow-sm text-left relative"
            >
              <span className="font-serif text-4xl font-bold text-[#4C1513] block mb-2">
                {m.year}
              </span>
              <h4 className="font-serif text-lg font-bold text-[#4C1513] mb-2">
                {m.title}
              </h4>
              <p className="text-xs text-[#525050] leading-relaxed">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
