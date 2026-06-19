/** Soft gradient field — airy product aesthetic */
export default function AuraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--canvas)]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_10%_-10%,rgba(124,58,237,0.11),transparent_50%)]" />
      <div className="animate-jsk-drift absolute -right-[20%] top-[10%] h-[min(70vmin,520px)] w-[min(70vmin,520px)] rounded-full bg-gradient-to-br from-orange-200/50 via-amber-100/30 to-transparent blur-3xl" />
      <div className="absolute -left-[15%] bottom-[-10%] h-[min(60vmin,440px)] w-[min(60vmin,440px)] rounded-full bg-gradient-to-tr from-violet-200/40 to-transparent blur-3xl" />
    </div>
  )
}
