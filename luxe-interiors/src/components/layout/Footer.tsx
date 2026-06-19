import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--bg)_88%,white)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="display text-2xl font-semibold text-stone-900">Luxe Interiors</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-600">
            Residential and commercial interiors — concept to installation — crafted with warmth,
            precision, and quiet luxury.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-700">
            <li>
              <Link className="hover:text-stone-950" to="/services">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-stone-950" to="/portfolio">
                Portfolio
              </Link>
            </li>
            <li>
              <Link className="hover:text-stone-950" to="/about">
                Studio
              </Link>
            </li>
            <li>
              <Link className="hover:text-stone-950" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-stone-600">
            128 Atelier Row
            <br />
            Design District
            <br />
            Metro 400001
          </p>
          <p className="mt-3 text-sm text-stone-600">
            <a className="font-medium text-stone-900 hover:underline" href="tel:+15551234567">
              +1 (555) 123-4567
            </a>
            <br />
            <a className="hover:underline" href="mailto:hello@luxeinteriors.studio">
              hello@luxeinteriors.studio
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">Social</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Instagram', 'Pinterest', 'LinkedIn'].map((label) => (
              <a
                key={label}
                href="#"
                className="rounded-full border border-stone-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm backdrop-blur hover:border-stone-300"
              >
                {label}
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-stone-500">
            © {new Date().getFullYear()} Luxe Interiors. Demo content for presentation.
          </p>
        </div>
      </div>
    </footer>
  )
}
