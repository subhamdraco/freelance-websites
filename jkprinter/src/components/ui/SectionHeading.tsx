type Props = {
  kicker: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ kicker, title, subtitle, align = 'left' }: Props) {
  const wrap = (
    <>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 ${
          align === 'center' ? 'mx-auto w-max' : ''
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`display mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl ${
          align === 'center' ? 'mx-auto text-center' : ''
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg ${
            align === 'center' ? 'mx-auto text-center' : ''
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
