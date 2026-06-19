import { type FormEvent, useState } from 'react'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('company_web')?.toString()) return
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      setSent(true)
      e.currentTarget.reset()
    }, 800)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <SectionHeading
            kicker="Contact"
            title="Tell us what needs to ship — we will map the fastest safe path."
            subtitle="For same-day or overnight requests, call first so we can lock substrate and cutter availability."
          />
          <ul className="mt-8 space-y-4 text-sm text-slate-600">
            <li>
              <span className="font-semibold text-slate-900">Phone</span>
              <br />
              <a className="text-violet-600 hover:underline" href="tel:+15035550123">
                +1 (503) 555-0123
              </a>
            </li>
            <li>
              <span className="font-semibold text-slate-900">Email</span>
              <br />
              <a className="hover:text-violet-600" href="mailto:hello@jskprinter.com">
                hello@jskprinter.com
              </a>
            </li>
            <li>
              <span className="font-semibold text-slate-900">Uploads</span>
              <br />
              Secure link issued after first reply.
            </li>
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={0.06}>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            {sent ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
                  ✓
                </div>
                <h2 className="mt-4 text-xl font-bold text-slate-900">Message received</h2>
                <p className="mt-2 max-w-sm text-sm text-slate-600">
                  Demo only — connect this form to your backend or form provider before launch.
                </p>
                <button
                  type="button"
                  className="mt-6 text-sm font-semibold text-violet-600 hover:underline"
                  onClick={() => setSent(false)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <input
                  type="text"
                  name="company_web"
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-800">
                    Name
                    <input
                      required
                      name="name"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none ring-violet-500/0 transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15"
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-800">
                    Email
                    <input
                      required
                      name="email"
                      type="email"
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15"
                    />
                  </label>
                </div>
                <label className="block text-sm font-medium text-slate-800">
                  Company
                  <input
                    name="company"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15"
                  />
                </label>
                <label className="block text-sm font-medium text-slate-800">
                  Project type
                  <select
                    name="type"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15"
                    defaultValue="wide"
                  >
                    <option value="wide">Wide format / signage</option>
                    <option value="marketing">Marketing print</option>
                    <option value="finish">Finishing / kitting</option>
                    <option value="rush">Rush timeline</option>
                  </select>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="checkbox" name="rush" className="rounded border-slate-300 text-violet-600" />
                  This is time-sensitive
                </label>
                <label className="block text-sm font-medium text-slate-800">
                  Notes
                  <textarea
                    required
                    name="notes"
                    rows={4}
                    className="mt-1 w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15"
                    placeholder="Sizes, quantities, in-hands date, Pantone refs, ship-to…"
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {busy ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
