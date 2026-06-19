import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'Studio' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navBase =
    'rounded-full px-3 py-2 text-sm font-medium transition'

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_82%,white)] shadow-sm backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-900 text-sm font-bold tracking-tight text-amber-100 shadow-lg shadow-amber-900/15 ring-1 ring-white/10 transition group-hover:scale-[1.03]">
            L
          </span>
          <span className="flex flex-col leading-tight">
            <span className="display text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
              Luxe Interiors
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500">
              Design Atelier
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? `${navBase} bg-stone-900 text-amber-50 shadow-inner`
                  : `${navBase} text-stone-700 hover:bg-stone-900/5 hover:text-stone-900`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-amber-50 shadow-lg shadow-stone-900/20 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-stone-800"
          >
            Book a consult
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-white/80 text-stone-800 shadow-sm backdrop-blur md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-stone-900 transition ${
                open ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-stone-900 transition ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-stone-900 transition ${
                open ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_92%,white)] backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile primary">
              {nav.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-base font-medium ${
                      isActive ? 'bg-stone-900 text-amber-50' : 'text-stone-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-2xl bg-stone-900 px-4 py-3 text-center text-base font-semibold text-amber-50"
              >
                Book a consult
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
