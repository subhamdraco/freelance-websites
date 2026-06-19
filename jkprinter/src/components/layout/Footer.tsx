import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="display text-xl font-bold text-white">JSK Printer</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
            Dependable digital printing for teams that need proofs, packaging, and signage without
            the drama.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link className="text-slate-300 hover:text-white" to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="text-slate-300 hover:text-white" to="/work">
                Work
              </Link>
            </li>
            <li>
              <Link className="text-slate-300 hover:text-white" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-slate-300 hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Studio</p>
          <p className="mt-4 text-sm leading-relaxed">
            210 Maker Boulevard
            <br />
            Suite 4B
            <br />
            Portland, OR 97209
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Say hello</p>
          <p className="mt-4 text-sm">
            <a className="font-medium text-orange-400 hover:text-orange-300" href="tel:+15035550123">
              +1 (503) 555-0123
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a className="hover:text-white" href="mailto:hello@jskprinter.com">
              hello@jskprinter.com
            </a>
          </p>
          <p className="mt-8 text-xs text-slate-500">
            © {new Date().getFullYear()} JSK Printer. Demo content.
          </p>
        </div>
      </div>
    </footer>
  )
}
