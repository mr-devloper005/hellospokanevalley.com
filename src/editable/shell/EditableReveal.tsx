'use client'

import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react'

type EditableRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  index?: number
}

export function EditableReveal({ children, index = 0, className = '', style, ...props }: EditableRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`editable-reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      data-mounted={mounted ? 'true' : undefined}
      style={{ transitionDelay: mounted ? `${Math.min(index, 10) * 70}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}
