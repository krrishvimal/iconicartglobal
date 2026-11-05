"use client";

import { motion } from "framer-motion";
import { Palette, Users, Heart, Sparkles } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { stats } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  palette: <Palette className="h-6 w-6 text-[#EBB4BF]" />,
  users: <Users className="h-6 w-6 text-[#A2C0DD]" />,
  heart: <Heart className="h-6 w-6 text-[#EBB4BF]" />,
  sparkles: <Sparkles className="h-6 w-6 text-[#F8DE7E]" />,
};

function StatItem({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const numericValue = parseInt(stat.value);
  const { count, ref } = useCountUp(numericValue, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="flex flex-col items-center gap-3 p-6 text-center border-r last:border-r-0 border-[#EBB4BF]/15"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3E000C] border border-[#D4A853]/40 shadow-inner">
        {iconMap[stat.icon]}
      </div>
      <div className="font-serif text-4xl sm:text-5xl font-extrabold text-[#F3ECE0] tracking-tight">
        {count}
        <span className="text-[#F8DE7E] font-normal">{stat.suffix}</span>
      </div>
      <p className="editorial-tag text-[10px] text-[#EBB4BF] font-bold tracking-[0.25em] uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function AchievementCounter() {
  return (
    <section className="relative overflow-hidden bg-[#4C1513] border-y border-[#D4A853]/30 py-8">
      {/* Editorial Decorative blur spots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-full w-1/2 bg-gradient-to-r from-[#EBB4BF]/10 via-[#F8DE7E]/10 to-[#A2C0DD]/10 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
