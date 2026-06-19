import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import { workItems } from '../data/site'

const cats = ['All', 'Signage', 'Marketing', 'Large format', 'Stationery'] as const

export default function Work() {
  const [cat, setCat] = useState<(typeof cats)[number]>('All')
  const reduce = useReducedMotion()

  const filtered = useMemo(() => {
    if (cat === 'All') return [...workItems]
    return workItems.filter((w) => w.cat === cat)
  }, [cat])

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <SectionHeading
          kicker="Work"
          title="A clean grid for your installs and campaigns."
          subtitle="Replace placeholders with your own photography before client review."
          align="center"
        />
      </Reveal>

      <Reveal className="mt-8 flex flex-wrap justify-center gap-2" delay={0.05}>
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              c === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:ring-slate-300'
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((w, i) => (
          <motion.li
            key={w.id}
            layout
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.04 }}
          >
            <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition hover:shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={w.img}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                  whileHover={reduce ? undefined : { scale: 1.03 }}
                  transition={{ duration: 0.45 }}
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                  {w.cat}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-slate-900">{w.title}</h2>
                <p className="mt-1 text-xs text-slate-500">JSK Printer archive</p>
              </div>
            </article>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
