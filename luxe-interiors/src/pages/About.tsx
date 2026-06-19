import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

const milestones = [
  {
    year: '2014',
    title: 'Studio founded',
    body: 'Started as a two-person practice focused on warm, tactile residential work.',
  },
  {
    year: '2017',
    title: 'Commercial wing',
    body: 'Expanded to boutique offices and retail with a dedicated technical team.',
  },
  {
    year: '2021',
    title: 'Hospitality',
    body: 'Partnered on lobbies, suites, and F&B concepts across three continents.',
  },
  {
    year: 'Today',
    title: 'Integrated delivery',
    body: 'End-to-end procurement, install, and styling with vetted craftspeople worldwide.',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Studio"
          title="We design for longevity, light, and the rituals of everyday life."
          subtitle="Luxe Interiors is an independent atelier led by principals who still draw by hand, walk every site, and believe the smallest junction deserves intention."
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal className="space-y-6 text-base leading-relaxed text-stone-600">
          <p>
            Our work sits at the intersection of architecture and styling — we think in plans,
            sections, and sightlines first, then layer textiles, art, and objects that feel
            collected rather than decorated.
          </p>
          <p>
            Every project receives a dedicated lead designer, a technical coordinator, and a
            procurement specialist. Weekly visual updates keep decisions tangible, and our site
            teams treat your space with the same care as our own homes.
          </p>
          <p>
            Sustainability shows up quietly: durable specifications, local makers where possible,
            and lighting schemes that reduce energy without sacrificing atmosphere.
          </p>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-7 text-sm font-semibold text-amber-50 shadow-lg transition hover:bg-stone-800"
          >
            Meet the team
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white/80 shadow-xl ring-1 ring-black/[0.04] backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
              alt="Design studio moodboard and samples"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-800/90">
                In the studio
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Material libraries, full-scale mockups, and bespoke lighting tests before anything
                reaches your site.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 border-t border-[var(--line)] pt-16">
        <Reveal>
          <SectionHeading eyebrow="Timeline" title="A steady evolution, never a rebrand for hype." />
        </Reveal>
        <ol className="relative mt-12 space-y-10 before:absolute before:left-[0.65rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-amber-400 before:via-stone-300 before:to-transparent sm:before:left-3">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.06}>
              <li className="relative grid gap-2 pl-10 sm:grid-cols-[7rem_1fr] sm:gap-8 sm:pl-14">
                <span className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[11px] font-bold text-amber-900 shadow-sm sm:left-1">
                  ●
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800/90">
                  {m.year}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{m.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </div>
  )
}
