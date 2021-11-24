import Instructions from '@/components/dom/Instructions'
import dynamic from 'next/dynamic'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import Loader from '@/components/dom/Loader'

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

const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    <Instructions />
  )
}

const R3F = () => {
  return <></>
}

const Page = ({ isComponent = false }) => {
  const [Loading, setLoading] = useState(true)
  const controls = useAnimation()
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
      y: -100,
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

  useEffect(() => {
    if (!Loading) {
      controls.start('enter')
    } else {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
      controls.start('hidden')
    }
  })

  return (
    <>
      {isComponent ? null : (
        <AnimatePresence exitBeforeEnter initial={false}>
          {Loading ? <Loader /> : null}
        </AnimatePresence>
      )}
      <motion.div
        variants={variants}
        initial='hidden'
        animate={controls}
        exit='exit'
        className='w-full opacity-1 transition duration-2000'
      >
        <DOM />
      </motion.div>
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Home',
    },
  }
}
