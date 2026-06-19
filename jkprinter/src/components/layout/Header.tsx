import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
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

  const linkBase =
    'rounded-full px-3.5 py-2 text-sm font-medium transition-colors'

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background,box-shadow] duration-300 ${
        scrolled
          ? 'border-slate-200/80 bg-white/80 shadow-sm shadow-slate-200/50 backdrop-blur-xl'
          : 'border-transparent bg-white/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-orange-500 text-sm font-bold tracking-tight text-white shadow-md shadow-violet-500/25 ring-1 ring-white/60 transition group-hover:scale-[1.03]">
            JSK
          </span>
          <span className="leading-tight">
            <span className="display block text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              JSK Printer
            </span>
            <span className="text-[11px] font-medium text-slate-500">Digital print studio</span>
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
                  ? `${linkBase} bg-violet-600 text-white shadow-md shadow-violet-500/25`
                  : `${linkBase} text-slate-600 hover:bg-slate-100 hover:text-slate-900`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="ml-1 inline-flex min-h-10 items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800"
          >
            Get a quote
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm md:hidden"
          aria-expanded={open}
          aria-controls="jsk-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-slate-800 transition ${
                open ? 'translate-y-1.5 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-slate-800 transition ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-slate-800 transition ${
                open ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="jsk-mobile-nav"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="border-t border-slate-200 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-3 py-3" aria-label="Mobile primary">
              {nav.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-semibold ${
                      isActive ? 'bg-violet-600 text-white' : 'text-slate-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-slate-900 py-3 text-center text-base font-semibold text-white"
              >
                Get a quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
