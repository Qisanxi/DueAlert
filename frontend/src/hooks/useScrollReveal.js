import { useEffect, useRef } from 'react'

/**
 * useScrollReveal
 * Adds an `in` class to the element when it scrolls into view (once).
 * Pair with the `.reveal` / `.reveal.in` Tailwind utilities defined in index.css.
 *
 * Usage:
 *   const ref = useScrollReveal()
 *   <div ref={ref} className="reveal">...</div>
 *
 * Options:
 *   threshold  - IntersectionObserver threshold (default 0.12)
 *   rootMargin - rootMargin (default '0px 0px -60px 0px')
 */
export function useScrollReveal({ threshold = 0.12, rootMargin = '0px 0px -60px 0px' } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion: reveal immediately without observing.
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [threshold, rootMargin])

  return ref
}

export default useScrollReveal
