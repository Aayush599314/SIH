import { motion } from "framer-motion";
import { Bot, Code2, Activity, Boxes, Map, Award } from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "AI DSA Tutor",
    desc: "Conversational, step-by-step code guidance that adapts to whatever you're stuck on.",
  },
  {
    icon: Code2,
    title: "Intelligent Code Explainer",
    desc: "Break down any problem line-by-line with dynamic mental models and memory diagrams.",
  },
  {
    icon: Activity,
    title: "Complexity Analyzer",
    desc: "Instant Big-O calculations for time and space, with best, average, and worst case.",
  },
  {
    icon: Boxes,
    title: "Interactive Visualizers",
    desc: "Step through pointers, list reversals, graph traversals, and DP tables — visually.",
  },
  {
    icon: Map,
    title: "Personalized Roadmaps",
    desc: "A syllabus tailored to your target companies, timeline, and current skill level.",
  },
  {
    icon: Award,
    title: "Mock Interview Simulator",
    desc: "Real-time review that scores your approach, edge cases, and communication.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-lime-400">
          Everything you need
        </h2>
        <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          One workspace for the whole DSA journey
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass-panel rounded-2xl p-6 transition hover:border-lime-400/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
              <feature.icon className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <h3 className="mt-4 text-[15px] font-semibold text-[var(--color-ink)]">{feature.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-ink-dim)]">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
