import React, { useRef, useEffect } from 'react'
import p5 from 'p5'
import sketch from './sketch'

export default function App() {
  const refCanvas = useRef(null)
  let p5Instance

  useEffect(() => {
    p5Instance = new p5(sketch, refCanvas.current)
    return () => {
      p5Instance.remove()
    }
  }, [p5Instance])

  return <div ref={refCanvas} />
}
