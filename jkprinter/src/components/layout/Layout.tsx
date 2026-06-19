import { Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import AuraBackground from '../visual/AuraBackground'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden text-slate-900">
      <AuraBackground />
      <Header />
      <motion.main
        key={location.pathname}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex min-h-0 w-full flex-1 flex-col"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
