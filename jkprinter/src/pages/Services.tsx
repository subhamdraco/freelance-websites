import { Link } from 'react-router-dom'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceIcon from '../components/ui/ServiceIcon'
import { services } from '../data/site'

const detail: Record<string, string[]> = {
  wide: ['Mesh & vinyl rolls', 'Rigid boards & ACM', 'Contour & kiss cutting', 'Site-ready packing'],
  brand: ['Catalogs & booklets', 'Direct mail & inserts', 'Retail kits', 'Spot & metallic options'],
  finish: ['Mount & lamination', 'Wire-O & perfect bind', 'Hand kitting', 'White-glove drops'],
}

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <Reveal>
        <SectionHeading
          kicker="Services"
          title="Built for marketing, retail, and field teams."
          subtitle="Mix and match lanes — finishing and logistics stay on the same ticket so approvals stay fast."
          align="center"
        />
      </Reveal>

      <div className="mt-14 space-y-8">
        {services.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.06}>
            <article className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-10 md:p-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-50 ring-1 ring-violet-100">
                <ServiceIcon name={s.icon as 'wide' | 'brand' | 'finish'} />
              </div>
              <div>
                <h2 className="display text-2xl font-bold text-slate-900">{s.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{s.body}</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                {(detail[s.key] ?? []).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 rounded-3xl border border-violet-200 bg-violet-50/60 p-8 text-center sm:p-10">
          <p className="text-base font-medium text-slate-800">
            Need vendor codes, split POs, or scheduled releases? We plug into your procurement flow.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Talk to production
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
