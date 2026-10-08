import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, PlayCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const HERO_BADGES = ["NeetCode 150 mapped", "No API key required", "Visual step debugger"];

export function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-20 pt-16 text-center sm:pt-24">
      <motion.span
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2.5 rounded-full border border-lime-400/25 bg-[var(--color-surface)] px-4 py-1.5 font-mono text-[11px] tracking-[0.08em] text-[var(--color-ink-dim)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
        </span>
        An AI-powered DSA learning laboratory
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-[var(--color-ink)] sm:text-6xl md:text-7xl"
      >
        Master DSA with{" "}
        <span className="text-lime-400 text-glow-lime">AI-powered</span>
        <br className="hidden sm:inline" />
        step-by-step learning
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-ink-dim)] sm:text-lg"
      >
        Learn data structures and algorithms through interactive visualizers, AI explanations, and
        hands-on playgrounds — no setup, no cost, no cloud latency.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-8 py-3.5 text-sm font-semibold text-[#06070a] shadow-xl shadow-lime-400/20 transition hover:brightness-110 sm:w-auto"
        >
          <span>{isAuthenticated ? "Open dashboard" : "Start learning free"}</span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
        <a
          href="#features"
          className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:border-lime-400/40 sm:w-auto"
        >
          <PlayCircle className="h-4 w-4 text-lime-400" />
          <span>See how it works</span>
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-[var(--color-ink-dim)]"
      >
        {HERO_BADGES.map((badge) => (
          <span key={badge} className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-lime-400" /> {badge}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
