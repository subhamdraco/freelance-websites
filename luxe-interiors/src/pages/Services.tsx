import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceGlyph from '../components/ui/ServiceGlyph'
import { services } from '../data/site'

const packages = [
  {
    name: 'Concept sprint',
    price: 'From $4.8k',
    detail: 'Ideal for single rooms — mood, layout options, and a shopping list you can execute.',
  },
  {
    name: 'Signature residence',
    price: 'From $38k',
    detail: 'Full home renovation with drawings, tender, procurement, install, and styling.',
    featured: true,
  },
  {
    name: 'Commercial & hospitality',
    price: 'Custom',
    detail: 'Phased rollouts, brand alignment, and on-site coordination for teams and operators.',
  },
]

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="Clarity at every scale — from a single room to a multi-floor rollout."
          subtitle="Engagements are modular: start with strategy, add documentation depth, or commission turnkey delivery. You always know what is in scope and what happens next."
          align="center"
        />
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {packages.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07}>
            <article
              className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white/85 p-8 shadow-sm ring-1 ring-black/[0.04] backdrop-blur transition hover:-translate-y-1 hover:shadow-xl ${
                p.featured
                  ? 'border-amber-300/80 shadow-amber-900/10'
                  : 'border-stone-200/80'
              }`}
            >
              {p.featured ? (
                <span className="absolute right-5 top-5 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-900">
                  Most booked
                </span>
              ) : null}
              <h3 className="display text-2xl font-semibold text-stone-900">{p.name}</h3>
              <p className="mt-3 text-2xl font-semibold text-amber-800">{p.price}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-600">{p.detail}</p>
              <Link
                to="/contact"
                className={`mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition ${
                  p.featured
                    ? 'bg-stone-900 text-amber-50 hover:bg-stone-800'
                    : 'border border-stone-300 bg-white text-stone-900 hover:border-stone-400'
                }`}
              >
                Request proposal
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Reveal>
          <SectionHeading
            eyebrow="How we collaborate"
            title="Four pillars you can mix, match, or take end-to-end."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="flex gap-4 rounded-3xl border border-stone-200/80 bg-[color-mix(in_oklab,var(--bg)_65%,white)] p-6 shadow-sm ring-1 ring-black/[0.03]">
                <div className="shrink-0 rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-100">
                  <ServiceGlyph name={s.icon} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal>
        <div className="mt-20 rounded-[2rem] border border-dashed border-stone-300 bg-white/70 p-8 text-center shadow-inner backdrop-blur sm:p-12">
          <h2 className="display text-2xl font-semibold text-stone-900 sm:text-3xl">
            Not sure where to begin?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
            Send photos, plans, or even voice notes — we will recommend the lightest-touch engagement
            that still gets you unstuck.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-8 text-sm font-semibold text-amber-50 shadow-lg transition hover:bg-stone-800"
          >
            Share your brief
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
