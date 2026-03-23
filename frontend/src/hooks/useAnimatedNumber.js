import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 → target with an ease-out cubic curve.
 * @param {number} target   – The final numeric value
 * @param {number} duration – Animation duration in ms (default: 900)
 * @returns {number}         – The current animated value (integer)
 */
export function useAnimatedNumber(target, duration = 900) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    // Reset to 0 on target change, then animate
    setDisplay(0)
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return display
}
