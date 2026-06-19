import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
}

export default function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotion()
  const done = { opacity: 1, y: 0 }

  return (
    <motion.div
      className={className}
      initial={reduce ? done : { opacity: 0, y: 10 }}
      whileInView={done}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: reduce ? 0 : 0.5,
        delay: reduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
