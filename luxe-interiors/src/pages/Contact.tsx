import { type FormEvent, useState } from 'react'
import Reveal from '../components/motion/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('company')?.toString()) {
      return
    }
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      setSent(true)
      e.currentTarget.reset()
    }, 900)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Tell us about the space you are dreaming up."
            subtitle="We respond within two business days with available studio capacity and suggested next steps. For press or collaborations, note it in your message."
          />
          <dl className="mt-10 space-y-6 text-sm text-stone-600">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Studio
              </dt>
              <dd className="mt-1 font-medium text-stone-900">128 Atelier Row, Design District</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Phone
              </dt>
              <dd className="mt-1">
                <a className="font-medium text-amber-800 hover:underline" href="tel:+15551234567">
                  +1 (555) 123-4567
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Email
              </dt>
              <dd className="mt-1">
                <a className="font-medium text-amber-800 hover:underline" href="mailto:hello@luxeinteriors.studio">
                  hello@luxeinteriors.studio
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Hours
              </dt>
              <dd className="mt-1">Mon–Fri · 9:00–18:00 · visits by appointment</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="rounded-[2rem] border border-stone-200/80 bg-white/90 p-6 shadow-xl ring-1 ring-black/[0.04] backdrop-blur sm:p-8">
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-700 ring-1 ring-emerald-100">
                  ✓
                </span>
                <h2 className="display mt-6 text-2xl font-semibold text-stone-900">Thank you</h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-600">
                  Your note is in our inbox. A designer will follow up shortly with availability and a
                  link to book an intro call.
                </p>
                <button
                  type="button"
                  className="mt-8 text-sm font-semibold text-amber-800 hover:underline"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <input
                  type="text"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-stone-800">
                    Name
                    <input
                      required
                      name="name"
                      className="mt-1.5 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-0 transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block text-sm font-medium text-stone-800">
                    Email
                    <input
                      required
                      name="email"
                      type="email"
                      className="mt-1.5 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="block text-sm font-medium text-stone-800">
                  Phone <span className="font-normal text-stone-500">(optional)</span>
                  <input
                    name="phone"
                    type="tel"
                    className="mt-1.5 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    placeholder="+1 …"
                  />
                </label>
                <label className="block text-sm font-medium text-stone-800">
                  Project type
                  <select
                    name="type"
                    className="mt-1.5 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    defaultValue="residential"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label className="block text-sm font-medium text-stone-800">
                  Message
                  <textarea
                    required
                    name="message"
                    rows={5}
                    className="mt-1.5 w-full resize-y rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    placeholder="Location, timeline, scope, Pinterest links — anything helps."
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-amber-50 shadow-lg transition hover:bg-stone-800 disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:px-10"
                >
                  {busy ? 'Sending…' : 'Submit inquiry'}
                </button>
                <p className="text-xs leading-relaxed text-stone-500">
                  This demo form does not connect to a live API — wire your endpoint or form service
                  (Formspree, Basin, etc.) before launch.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
