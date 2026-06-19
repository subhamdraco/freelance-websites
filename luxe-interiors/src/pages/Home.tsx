import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceGlyph from '../components/ui/ServiceGlyph'
import {
  featuredProjects,
  heroImages,
  processSteps,
  services,
  testimonials,
} from '../data/site'

const marqueeItems = [
  'Residential',
  'Commercial',
  'Hospitality',
  'Styling',
  'Turnkey delivery',
  'Lighting design',
  'Custom joinery',
  'Art curation',
]

export default function Home() {
  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const parallax = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56])
  const fadeHero = useTransform(scrollYProgress, [0, 0.55], [1, reduce ? 1 : 0.35])

  const [tIndex, setTIndex] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(
      () => setTIndex((i) => (i + 1) % testimonials.length),
      6200,
    )
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <div className="flex flex-col">
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden px-4 pb-20 pt-6 sm:px-6 sm:pb-28 sm:pt-10"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-20%] top-[-30%] h-[min(80vmin,560px)] w-[min(80vmin,560px)] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-stone-600 shadow-sm backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.18)]" />
              Now booking Q3
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="display mt-6 text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-stone-900"
            >
              Interiors that breathe with you.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600"
            >
              Full-service interior design for homes, workplaces, and boutique hospitality —
              from first sketch to final styling, with obsessive craft and calm communication.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-sm font-semibold text-amber-50 shadow-xl shadow-stone-900/25 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Start a project
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white/80 px-7 text-sm font-semibold text-stone-900 shadow-sm backdrop-blur transition hover:border-stone-400"
              >
                View portfolio
              </Link>
            </motion.div>

            <motion.dl
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-[var(--line)] pt-8 text-left"
            >
              {[
                { k: 'Projects delivered', v: '180+' },
                { k: 'Cities', v: '12' },
                { k: 'Awards', v: '24' },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                    {row.k}
                  </dt>
                  <dd className="display mt-1 text-2xl font-semibold text-stone-900">{row.v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            style={{ opacity: fadeHero }}
            className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
          >
            <motion.div
              style={{ y: parallax }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-stone-900/20 ring-1 ring-black/5"
            >
              <img
                src={heroImages.primary}
                alt="Warm minimalist living room with sculptural furniture"
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    Featured space
                  </p>
                  <p className="display text-lg font-semibold">Palm Residence</p>
                </div>
                <Link
                  to="/portfolio"
                  className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-semibold text-stone-900 shadow-sm transition hover:bg-amber-50"
                >
                  Explore
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -left-4 -top-4 hidden w-[42%] overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-xl shadow-stone-900/15 ring-1 ring-black/5 backdrop-blur-md sm:block lg:-left-10 lg:-top-8"
            >
              <img
                src={heroImages.secondary}
                alt="Interior vignette with curated decor"
                className="h-40 w-full object-cover"
                loading="lazy"
              />
            </motion.div>

            <div
              className="pointer-events-none absolute -bottom-6 -right-2 h-28 w-28 rounded-full border border-dashed border-amber-500/35 motion-safe:animate-luxe-spin sm:right-4"
              aria-hidden
            />
          </motion.div>
        </div>
      </section>

      <div className="border-y border-[var(--line)] bg-stone-900 py-3 text-amber-50">
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-luxe-marquee flex min-w-full shrink-0 items-center gap-10 pr-10 text-xs font-semibold uppercase tracking-[0.35em]">
            {[...marqueeItems, ...marqueeItems].map((label, i) => (
              <span key={`${label}-${i}`} className="flex items-center gap-10">
                <span>{label}</span>
                <span className="h-1 w-1 rounded-full bg-amber-200/70" />
              </span>
            ))}
          </div>
          <div
            className="animate-luxe-marquee flex min-w-full shrink-0 items-center gap-10 pr-10 text-xs font-semibold uppercase tracking-[0.35em]"
            aria-hidden
          >
            {[...marqueeItems, ...marqueeItems].map((label, i) => (
              <span key={`dup-${label}-${i}`} className="flex items-center gap-10">
                <span>{label}</span>
                <span className="h-1 w-1 rounded-full bg-amber-200/70" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Quietly bold spaces with enduring materials."
            subtitle="A snapshot of recent collaborations — each brief unique, each outcome deeply considered."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="group">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white/80 shadow-sm ring-1 ring-black/[0.03] backdrop-blur transition duration-500 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt=""
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-700 shadow-sm backdrop-blur">
                    {p.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display text-xl font-semibold text-stone-900">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{p.blurb}</p>
                  <Link
                    to="/portfolio"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
                  >
                    View case study
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[color-mix(in_oklab,var(--bg-deep)_70%,white)] px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything under one studio roof."
              subtitle="Whether you are renovating a family home or launching a flagship, we choreograph specialists, timelines, and budgets with clarity."
              align="center"
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-stone-200/80 bg-white/85 p-6 shadow-sm ring-1 ring-black/[0.03] backdrop-blur transition hover:border-amber-200/80 hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-100 transition group-hover:scale-105">
                    <ServiceGlyph name={s.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-7 text-sm font-semibold text-stone-900 shadow-sm transition hover:border-stone-400"
            >
              Full services overview
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="A calm cadence from first meeting to reveal."
          />
        </Reveal>
        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 0.07}>
              <li className="relative h-full overflow-hidden rounded-3xl border border-dashed border-stone-300/90 bg-white/70 p-6 backdrop-blur">
                <span className="display text-4xl font-semibold text-amber-700/90">{step.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-[var(--line)] bg-stone-950 px-4 py-20 text-amber-50 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Voices"
              title="Clients remember how we made them feel."
              subtitle="Transparent updates, meticulous site etiquette, and design decisions you can defend for years."
              align="center"
            />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative min-h-[200px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-8 shadow-inner shadow-black/40 backdrop-blur-md sm:p-10">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={t.name}
                  initial={false}
                  animate={{
                    opacity: i === tIndex ? 1 : 0,
                    y: i === tIndex ? 0 : 14,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-8 flex flex-col justify-center sm:inset-10 ${
                    i === tIndex ? 'z-10' : 'z-0 pointer-events-none'
                  }`}
                >
                  <p className="display text-xl leading-snug text-white sm:text-2xl">“{t.quote}”</p>
                  <footer className="mt-6 text-sm text-amber-100/80">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="mx-2 text-white/40">·</span>
                    <span>{t.role}</span>
                  </footer>
                </motion.blockquote>
              ))}
              <div className="flex justify-center gap-2 pt-[11rem] sm:pt-[10.5rem]">
                {testimonials.map((_, i) => (
                  <button
                    key={String(i)}
                    type="button"
                    onClick={() => setTIndex(i)}
                    className={`h-2 rounded-full transition ${
                      i === tIndex ? 'w-8 bg-amber-200' : 'w-2 bg-white/25 hover:bg-white/40'
                    }`}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-stone-900 via-stone-900 to-amber-900 px-8 py-14 text-center text-amber-50 shadow-2xl ring-1 ring-white/10 sm:px-14">
            <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-amber-400/25 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />
            <h2 className="display relative text-3xl font-semibold sm:text-4xl">
              Ready to shape your next chapter?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-amber-100/85 sm:text-base">
              Share your timeline, location, and ambitions — we will reply within two business days
              with next steps and a tailored studio intro call.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-amber-50 px-8 text-sm font-semibold text-stone-900 shadow-lg transition hover:bg-white"
              >
                Book a consult
              </Link>
              <a
                href="tel:+15551234567"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur transition hover:border-white/40"
              >
                Call the studio
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
