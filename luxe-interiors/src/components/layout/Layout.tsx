import { Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import MeshBackground from '../visual/MeshBackground'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <MeshBackground />
      <div className="luxe-grain pointer-events-none fixed inset-0 z-[5]" aria-hidden />
      <Header />
      <motion.div
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex min-h-0 w-full flex-1 flex-col"
      >
        <Outlet />
      </motion.div>
      <Footer />
    </div>
  )
}
