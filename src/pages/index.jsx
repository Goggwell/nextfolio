import dynamic from 'next/dynamic'
import Landing from '@/components/dom/Landing'
import { motion } from 'framer-motion'

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

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
  return (
    <div>
      <DOM />
      <R3F r3f />
    </div>
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
