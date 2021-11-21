import Instructions from '@/components/dom/Instructions'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

let easing = [0.6, -0.05, 0.01, 0.99]

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
}

const DOM = () => {
  return (
    // Step 5 - delete Instructions components
    <Instructions />
  )
}

const R3F = () => {
  return (
    <>
    </>
  )
}

const Page = () => {
  return (
    <div>
      <DOM />
    </div>
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
