import { useRef, useEffect } from 'react'

export function useAnimateOnScroll() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const elements = ref.current.querySelectorAll('.animate-on-scroll')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return { ref }
}
