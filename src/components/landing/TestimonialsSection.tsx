import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "AlgoMinds visualized dynamic programming transitions for me in minutes. The step debugger made the pattern finally click.",
    author: "Alex Rivera",
    role: "Software Engineer",
  },
  {
    quote:
      "Being able to run through problems without any setup changed my interview prep entirely. Fully free, no friction.",
    author: "Siddharth Verma",
    role: "Incoming SWE grad",
  },
  {
    quote:
      "The interactive tree and graph visualizations gave me the exact mental model I needed. Miles ahead of static tutorials.",
    author: "Elena Rostova",
    role: "Staff Engineer",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="mx-auto max-w-7xl px-6 py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-lime-400">
          Learner success
        </h2>
        <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Loved by engineers leveling up
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass-panel flex flex-col justify-between rounded-2xl p-6"
          >
            <div>
              <div className="mb-4 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-[13.5px] leading-relaxed text-[var(--color-ink-dim)]">&quot;{t.quote}&quot;</p>
            </div>
            <div className="mt-6">
              <div className="text-[13.5px] font-semibold text-[var(--color-ink)]">{t.author}</div>
              <div className="text-xs text-lime-400">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
