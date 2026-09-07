import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * Reveal — wraps children in a scroll-triggered fade-up.
 * Renders a <div> with the `reveal` class; the hook adds `in` when in view.
 *
 * Usage:
 *   <Reveal><h2>...</h2></Reveal>
 *   <Reveal as="section">...</Reveal>   // optional tag via `as`
 */
export default function Reveal({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useScrollReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
