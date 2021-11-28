import React from 'react'
import { motion } from 'framer-motion'

const Loader = () => {
  let easing = [0.6, 0.01, -0.05, 0.9]

  return (
    <>
      <motion.div
        className='slide-in'
        initial={{ left: '-100vw' }}
        animate={{ left: '0' }}
        exit={{ left: '100vw' }}
        transition={{ duration: 1.4, ease: easing }}
      >
        <div className="computer">
          <div className="screen">
            <div className="front square"></div>
            <div className="back square"></div>
            <div className="top square"></div>
            <div className="left square">
              <div className="progressbar"></div>
            </div>
            <div className="left1 square"></div>
            <div className="back1 square"></div>
            <div className="bottom1 square"></div>
          </div>
          <div className="screenbottom">
            <div className="front2 square"></div>
            <div className="top2 square"></div>
            <div className="left2 square">
              <div className="brownpart">
                <div className="disc"></div>
              </div>
            </div>
          </div>
          <div className="screenbottombottom">
            <div className="front3 square"></div>
            <div className="left3 square"></div>
            <div className="bottom3 square"></div>
          </div>
          <div className="keyboard">
            <div className="front4 square"></div>
            <div className="top4 square"></div>
            <div className="left4 square"></div>
            <div className="bottom4 square"></div>
          </div>
          <div className="keyboardkeys">
            <div className="front5 square"></div>
            <div className="top5 square"></div>
            <div className="left5 square"></div>
            <div className="bottom5 square"></div>
          </div>
          <div className="numpad">
            <div className="front6 square"></div>
            <div className="top6 square"></div>
            <div className="left6 square"></div>
            <div className="bottom6 square"></div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Loader
