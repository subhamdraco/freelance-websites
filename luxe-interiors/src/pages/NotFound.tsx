import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-800/90">404</p>
      <h1 className="display mt-4 text-4xl font-semibold text-stone-900 sm:text-5xl">
        This room is still under renovation.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-stone-600">
        The page you are looking for does not exist or has moved. Let us take you back somewhere
        beautiful.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-stone-900 px-8 text-sm font-semibold text-amber-50 shadow-lg transition hover:bg-stone-800"
      >
        Return home
      </Link>
    </div>
  )
}
