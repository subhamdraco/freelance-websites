const icons = {
  spark: (
    <path
      fill="currentColor"
      d="M12 1.5l1.8 5.5h5.7l-4.6 3.4 1.8 5.6-4.7-3.4-4.6 3.4 1.7-5.6-4.6-3.4h5.7L12 1.5z"
    />
  ),
  plan: (
    <path
      fill="currentColor"
      d="M4 5h16v2H4V5zm0 4h10v2H4V9zm0 4h16v2H4v-2zm0 4h7v2H4v-2z"
    />
  ),
  layers: (
    <>
      <path fill="currentColor" d="M4 8l8-4 8 4-8 4-8-4z" opacity="0.35" />
      <path fill="currentColor" d="M4 12l8 4 8-4" />
      <path fill="currentColor" d="M4 16l8 4 8-4" opacity="0.65" />
    </>
  ),
  truck: (
    <path
      fill="currentColor"
      d="M2 7h12v10H2V7zm12 2h2l4 4v4h-2v-2h-2v-2h-2V9zm-6 8a2 2 0 11-.001 3.001A2 2 0 0112 17zm8 0a2 2 0 11-.001 3.001A2 2 0 0120 17z"
    />
  ),
} as const

export type ServiceIconName = keyof typeof icons

export default function ServiceGlyph({ name }: { name: ServiceIconName }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-amber-700" aria-hidden>
      {icons[name]}
    </svg>
  )
}
