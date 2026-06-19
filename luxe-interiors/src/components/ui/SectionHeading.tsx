import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: Props) {
  const wrap: ReactNode = (
    <>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.28em] text-amber-800/90 ${
          align === 'center' ? 'mx-auto w-max' : ''
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`display mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </>
  )

  if (align === 'center') {
    return <div className="mx-auto max-w-3xl text-center">{wrap}</div>
  }
  return <div>{wrap}</div>
}
