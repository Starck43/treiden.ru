import { useState, useEffect } from 'react'
import { getWindowDimensions } from './utils'

/* istanbul ignore next */
export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
}

//export default useWindowDimensions
