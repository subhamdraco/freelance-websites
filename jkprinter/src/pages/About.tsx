import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

const values = [
  {
    title: 'Proofs you can forward',
    body: 'ICC-managed color, annotated PDFs, and optional hard proofs when brand teams demand them.',
  },
  {
    title: 'One ticket owner',
    body: 'From file check to pack-out photos — the same operator answers Slack and signs the QC sheet.',
  },
  {
    title: 'Install-aware thinking',
    body: 'We ask how it ships, who handles hardware, and what the site tolerates — before we cut anything.',
  },
]

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading
            kicker="About"
            title="JSK Printer is built for teams under launch pressure."
            subtitle="We started as a wide-format rescue desk and grew into a full finishing studio — keeping the same urgency, clearer communication, and zero mystery pricing on rush lanes."
          />
          <p className="mt-6 text-base leading-relaxed text-slate-600">
            Today we support retailers, agencies, and field marketing groups with dependable color,
            tight nesting, and kitting that arrives labeled the way your installers expect.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-7 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Schedule a intro call
          </Link>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80"
              alt="Print production"
              className="aspect-[5/4] w-full object-cover"
              loading="lazy"
            />
            <div className="border-t border-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">Humidity-controlled floor</p>
              <p className="mt-1 text-sm text-slate-600">
                Latex, UV, and precision cutters under one roof — QC photos included on request.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-12">
        <Reveal>
          <SectionHeading kicker="Principles" title="How we work with your team." align="center" />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-6">
                <h3 className="text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
