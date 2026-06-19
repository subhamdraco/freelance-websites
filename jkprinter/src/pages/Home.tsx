import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceIcon from '../components/ui/ServiceIcon'
import { capabilities, processSteps, services, stats, workItems } from '../data/site'

export default function Home() {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col">
      <section className="relative px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-800"
              >
                Calibrated color · Clear timelines
              </motion.p>
              <motion.h1
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                className="display mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
              >
                Print production
                <span className="block bg-gradient-to-r from-violet-600 to-orange-500 bg-clip-text text-transparent">
                  your team can trust.
                </span>
              </motion.h1>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
              >
                JSK Printer handles signage, marketing runs, and finishing — with proofs that match
                what ships, and updates you can forward to ops without translation.
              </motion.p>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-7 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
                >
                  Start a quote
                </Link>
                <Link
                  to="/work"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300"
                >
                  Browse work
                </Link>
              </motion.div>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-slate-200 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs font-medium text-slate-500">{s.label}</dt>
                    <dd className="display mt-1 text-2xl font-bold text-slate-900">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-200/60 via-white to-orange-100/60 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-white">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-500">Live job</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Spring retail rollout</p>
                    <p className="mt-2 text-xs text-slate-500">Due Thu · UV + lamination</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-violet-50 to-white p-4">
                    <p className="text-xs font-medium text-violet-700">Proof status</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">Approved v3</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-100">
                      <div className="h-full w-[88%] rounded-full bg-violet-600" />
                    </div>
                  </div>
                  <div className="sm:col-span-2 overflow-hidden rounded-2xl border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1000&q=80"
                      alt="Print production environment"
                      className="h-44 w-full object-cover sm:h-52"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-y border-slate-200/80 bg-white/70 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 text-sm font-medium text-slate-500 sm:px-6">
          {capabilities.map((c) => (
            <span key={c} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-orange-500" />
              {c}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            kicker="Services"
            title="Everything from wide format to final kitting."
            subtitle="One studio partner — fewer handoffs, fewer surprises on install day."
            align="center"
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-200/40 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 ring-1 ring-violet-100">
                  <ServiceIcon name={s.icon as 'wide' | 'brand' | 'finish'} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{s.body}</p>
                <Link
                  to="/services"
                  className="mt-6 text-sm font-semibold text-violet-600 hover:text-violet-700"
                >
                  Learn more →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-white px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              kicker="Process"
              title="Simple phases. Real operators."
              align="center"
            />
          </Reveal>
          <ol className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {processSteps.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <li className="relative rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-center">
                  <span className="display text-4xl font-bold text-violet-200">{p.step}</span>
                  <h3 className="mt-2 text-base font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal>
          <SectionHeading
            kicker="Gallery"
            title="Recent work — swap in your photography."
            subtitle="Placeholder imagery for layout only."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workItems.slice(0, 3).map((w, i) => (
            <Reveal key={w.id} delay={i * 0.06}>
              <Link
                to="/work"
                className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={w.img}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    whileHover={reduce ? undefined : { scale: 1.04 }}
                    transition={{ duration: 0.45 }}
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                    {w.cat}
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-slate-900">{w.title}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-900 to-violet-900 px-8 py-14 text-center text-white shadow-2xl sm:px-12">
            <h2 className="display text-3xl font-bold sm:text-4xl">Ready when your files are.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Tell us what installs, where it ships, and when it has to land — we will respond with
              options, pricing bands, and a clear proof plan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-orange-50"
              >
                Contact JSK
              </Link>
              <a
                href="tel:+15035550123"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-8 text-sm font-semibold text-white hover:bg-white/10"
              >
                Call studio
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
