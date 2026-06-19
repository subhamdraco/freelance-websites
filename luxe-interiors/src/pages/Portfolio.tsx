import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { portfolioItems } from '../data/site'

const categories = ['All', 'Residential', 'Commercial', 'Hospitality'] as const

export default function Portfolio() {
  const [cat, setCat] = useState<(typeof categories)[number]>('All')
  const reduce = useReducedMotion()

  const filtered = useMemo(
    () =>
      cat === 'All' ? [...portfolioItems] : portfolioItems.filter((p) => p.category === cat),
    [cat],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Portfolio"
          title="Spaces that feel considered in person and luminous on camera."
          subtitle="Each project links strategy, materiality, and light. Tap a category to filter — full case studies available on request after an intro call."
          align="center"
        />
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              c === cat
                ? 'bg-stone-900 text-amber-50 shadow-md'
                : 'border border-stone-200 bg-white/80 text-stone-700 hover:border-stone-300'
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <motion.ul
        layout
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p, i) => (
          <motion.li
            layout
            key={p.id}
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.04 }}
            className="group overflow-hidden rounded-3xl border border-stone-200/80 bg-white/80 shadow-sm ring-1 ring-black/[0.03] backdrop-blur"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                layout
                src={p.img}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                whileHover={reduce ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-700 shadow-sm backdrop-blur">
                {p.category}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 p-5">
              <h2 className="text-lg font-semibold text-stone-900">{p.title}</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800/90">
                View
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}
