import type { ReactNode } from 'react'

const paths: Record<string, ReactNode> = {
  wide: <path fill="currentColor" d="M4 7h16v10H4V7zm2 2v6h12V9H6zm2 2h8v2H8v-2z" />,
  brand: <path fill="currentColor" d="M6 5h12v14H6V5zm2 2v10h8V7H8zm2 2h4v2h-4V9zm0 4h4v2h-4v-2z" />,
  finish: <path fill="currentColor" d="M5 6l7 4 7-4v10l-7 4-7-4V6zm2 1.5v7.2l5 2.7 5-2.7V7.5l-5 2.9-5-2.9z" />,
}

export default function ServiceIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-violet-600" aria-hidden>
      {paths[name]}
    </svg>
  )
}
