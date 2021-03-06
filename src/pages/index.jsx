import dynamic from 'next/dynamic'
import Landing from '@/components/dom/Landing'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/dom/Loader'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

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

const Zustand = dynamic(() => import('@/components/canvas/Zustand/Zustand'), {
  ssr: false,
})

// dom components goes here
const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    <>
      <Landing />
    </>
  )
}

// canvas components goes here
const R3F = () => {
  return (
    <>
      <Zustand />
    </>
  )
}

const Page = () => {
  const [Loading, setLoading] = useState(true)

  const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: easing,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: easing,
      },
    },
  }
  const itemLeft = {
    hidden: { opacity: 0, x: '-100%' },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: 'easeInOut',
        duration: 2,
      },
    },
    exit: { opacity: 0, x: '-100%' },
  }
  const itemRight = {
    hidden: { opacity: 0, x: '100%' },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: 'easeInOut',
        duration: 2,
      },
    },
    exit: { opacity: 0, x: '100%' },
  }
  const itemBottom = {
    hidden: { opacity: 0, y: 200, x: '-50%' },
    enter: {
      opacity: 1,
      x: '-50%',
      y: 0,
      transition: {
        staggerChildren: 0.5,
        ease: 'easeInOut',
        duration: 2,
      },
    },
    exit: { opacity: 0, y: 200, x: '-50%' },
  }

  const controls = useAnimation()
  useEffect(() => {
    if (!Loading) {
      controls.start('enter')
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 5000)
      controls.start('hidden')
    }
  }, [Loading, controls])

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {Loading ? <Loader /> : null}
      </AnimatePresence>

      <R3F r3f />
      <div
        className='w-full opacity-1 transition duration-2000'
      >
        <DOM />
      </div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
