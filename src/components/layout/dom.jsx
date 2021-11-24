import useStore from '@/helpers/store'
import { useEffect, useRef } from 'react'
import { AnimateSharedLayout, motion } from 'framer-motion'

let easing = [0.6, -0.05, 0.01, 0.99]

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
}

const Dom = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])
  return (
    <AnimateSharedLayout type='crossfade'>
      <div
        className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'
        ref={ref}
      >
        {children}
      </div>
    </AnimateSharedLayout>
  )
}

export default Dom
