import { motion } from "framer-motion";

const STATS = [
  { value: "450+", label: "DSA algorithms", accent: "text-[var(--color-ink)]" },
  { value: "100%", label: "Learner-first & free", accent: "text-lime-400" },
  { value: "65k+", label: "Active learners", accent: "text-cyan-300" },
  { value: "8", label: "Core data structures", accent: "text-violet-300" },
];

const STEPS = [
  {
    number: "01",
    title: "Pick a structure",
    desc: "Choose from arrays, linked lists, stacks, queues, hash maps, trees, graphs, or sorting.",
  },
  {
    number: "02",
    title: "Play with it live",
    desc: "Drive the interactive playground yourself, or ask the AI assistant to dry-run your code.",
  },
  {
    number: "03",
    title: "Track your growth",
    desc: "Daily challenges, streaks, and an activity feed keep your practice consistent.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-lime-400">About AlgoMinds</h2>
        <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Built for people who learn by seeing
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[var(--color-ink-dim)]">
          Reading about a hash map collision and watching one happen in front of you are two
          different kinds of learning. AlgoMinds.AI exists to give every core data structure a
          visual, interactive form — paired with an AI assistant that explains what you're looking at.
        </p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="glass-panel grid grid-cols-2 gap-8 rounded-2xl p-8 text-center sm:grid-cols-4"
      >
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className={`mb-1 text-3xl font-extrabold sm:text-4xl ${stat.accent}`}>{stat.value}</div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-faint)]">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* How it works */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6"
          >
            <span className="font-mono text-xs font-semibold text-lime-400">{step.number}</span>
            <h3 className="mt-2 text-[15px] font-semibold text-[var(--color-ink)]">{step.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-ink-dim)]">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
