import { useState, useEffect } from 'react'
import { getWindowDimensions } from './utils'

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
  )

  useEffect(() => {
    let handleResize = function () {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}
