import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { Children } from 'react'
import Header from '@/config'
import dynamic from 'next/dynamic'
import Dom from '@/components/layout/dom'
import { AnimatePresence } from 'framer-motion'

import '@/styles/main.scss'

let LCanvas = null
if (process.env.NODE_ENV === 'production') {
  LCanvas = dynamic(() => import('@/components/layout/canvas'), {
    ssr: false,
  })
} else {
  LCanvas = require('@/components/layout/canvas').default
}

function Layout({ dom }) {
  return <>{dom && <Dom>{dom}</Dom>}</>
}

const ForwardPropsToR3fComponent = ({ comp, pageProps }) => {
  let r3fArr = []
  let compArr = []

  try {
    Children.forEach(comp(pageProps).props.children, (child) => {
      if (child?.props && child.props.r3f) {
        r3fArr.push(child)
      } else {
        compArr.push(child)
      }
    })

    return (
      <>
        {compArr && <Layout dom={compArr} />}
        {r3fArr && <LCanvas>{r3fArr}</LCanvas>}
      </>
    )
  } catch (error) {
    // fallback security for SSG
    // @ts-ignore
    return <comp {...pageProps} />
  }
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()
  return (
    <AnimatePresence exitBeforeEnter>
      <Header title={pageProps.title} />
      <ForwardPropsToR3fComponent
        comp={Component}
        pageProps={pageProps}
        key={router.route}
      />
    </AnimatePresence>
  )
}

export default App
