import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  const reduce = useReducedMotion()
  const still = { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={reduce ? still : { opacity: 0, y }}
      whileInView={still}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{
        duration: reduce ? 0 : 0.75,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
