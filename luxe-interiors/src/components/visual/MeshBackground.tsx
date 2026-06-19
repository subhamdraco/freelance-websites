export default function MeshBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--bg)]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-[var(--bg-deep)]" />
      <div
        className="animate-luxe-float-a absolute -top-[20vmin] left-[10%] h-[min(72vmin,520px)] w-[min(72vmin,520px)] rounded-full bg-[var(--glow-amber)] blur-3xl"
      />
      <div
        className="animate-luxe-float-b absolute bottom-[-15vmin] right-[5%] h-[min(68vmin,480px)] w-[min(68vmin,480px)] rounded-full bg-[var(--glow-sage)] blur-3xl"
      />
      <div
        className="animate-luxe-float-c absolute left-1/2 top-1/3 h-[min(90vmin,640px)] w-[min(90vmin,640px)] -translate-x-1/2 rounded-full bg-orange-100/40 blur-[100px]"
      />
      <svg
        className="absolute bottom-0 left-0 right-0 h-32 w-full text-stone-900/[0.04]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
      >
        <path d="M0,80 C200,20 400,120 600,60 C800,0 1000,100 1200,40 L1200,120 L0,120 Z" fill="currentColor" />
      </svg>
    </div>
  )
}
