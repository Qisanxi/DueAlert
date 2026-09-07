import { useEffect, useRef } from 'react'

/**
 * useMouseParallax
 * Tracks mouse position relative to an element and exposes it as CSS vars
 * (--mx, --my) on that element. Pairs with `.aurora-parallax` in index.css.
 *
 * - No React re-renders (writes CSS vars directly to the DOM via ref)
 * - Disabled when prefers-reduced-motion is set
 * - Only listens while window width >= 1024 (desktop)
 *
 * Usage:
 *   const ref = useMouseParallax()
 *   <section ref={ref} className="aurora-bg aurora-parallax">...</section>
 *
 * The multiplier scales raw pointer offset (px) down so the parallax shift
 * stays subtle. Tweak in CSS (.aurora-parallax::before/::after) if needed.
 */
export function useMouseParallax({ strength = 0.04 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip on reduced motion or touch devices
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia?.('(pointer: coarse)').matches) return

    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) * strength
        const dy = (e.clientY - cy) * strength
        el.style.setProperty('--mx', `${dx}px`)
        el.style.setProperty('--my', `${dy}px`)
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength])

  return ref
}

export default useMouseParallax
