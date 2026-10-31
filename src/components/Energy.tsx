import { useEffect, useRef } from 'react'
import { Zap } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useReveal } from '../hooks/useReveal'

export default function Energy() {
  const sectionRef = useReveal<HTMLElement>()
  const linesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = linesRef.current
    if (!el) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="energia"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-rb-black via-rb-navy to-rb-navy-light py-28 sm:py-40"
    >
      <div
        ref={linesRef}
        className="pointer-events-none absolute -right-1/4 top-0 h-[140%] w-3/4 opacity-20"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 800" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={i}
              x1={-100 + i * 40}
              y1="0"
              x2={0 + i * 40}
              y2="800"
              stroke={i % 3 === 0 ? '#E31B35' : '#ffffff'}
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-2xl">
          <div data-reveal className="mb-6 flex items-center gap-3 text-rb-red">
            <Zap className="h-5 w-5" fill="currentColor" />
            <span className="text-xs font-semibold uppercase tracking-[0.35em]">Seção 02 — A energia</span>
          </div>
          <h2 data-reveal className="text-4xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            ENERGIA PARA
            <br />
            IR ALÉM.
          </h2>
          <p data-reveal className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            Cada desafio é uma oportunidade. Cada movimento, uma nova possibilidade.
            Descubra o que acontece quando você ultrapassa seus limites.
          </p>
        </div>

        <div data-reveal data-reveal-delay="0.25" className="select-none text-right font-display text-[7rem] leading-none text-white/10 sm:text-[11rem] lg:text-[14rem]">
          02
        </div>
      </div>
    </section>
  )
}
