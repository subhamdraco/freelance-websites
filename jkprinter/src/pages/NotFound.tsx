import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-violet-600">404</p>
      <h1 className="display mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">Page not found</h1>
      <p className="mt-4 text-slate-600">
        That link is not in our site map. Head back home or reach the studio from contact.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Home
      </Link>
    </div>
  )
}
