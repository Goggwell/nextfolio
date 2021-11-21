import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Landing() {
  const line1 = "samuel yusuf."
  const line2 = "enter"
  const line3 = "こんにちは"

  let easing = [0.6, -0.05, 0.01, 0.99]

  const stagger = {
    animate: {
      transition: {
        delay: 0.5,
        staggerChildren: 0.05
      }
    }
  }

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  }
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      ease: easing,
    },
  }

  return (
    <motion.div className="main" variants={stagger}>
      <div className="header">
        <div className="header--subheading">
          <motion.span
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {line3.split("").map((char, index) => {
              return (
                <motion.span key={char + "-"  + index} variants={letter}>
                  {char}
                </motion.span>
              )
            })}
          </motion.span>
        </div>
        <div className="header--title">
          <motion.h3
            variants={sentence}
            initial="hidden"
            animate="visible"
          >
            {line1.split("").map((char, index) => {
              return (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              )
            })}
          </motion.h3>
        </div>
        <div className="header--cta">
            <Link href='/home'>
              <motion.div variants={sentence} initial='hidden' animate='visible'>
                {line2.split("").map((char, index) => {
                  return (
                    <motion.a key={char + '-' + index} variants={letter}>
                      {char}
                    </motion.a>
                  )
                })}
              </motion.div>
            </Link>
        </div>
      </div>
    </motion.div>
  )
}
