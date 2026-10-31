import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Loader2, RotateCcw } from 'lucide-react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useScrollVideo } from '../hooks/useScrollVideo'

const SCROLL_LENGTH_VH = 320 // scrollable distance driving the scrub, in vh
const FRAME_COUNT = 94
const FRAME_W = 800
const FRAME_H = 450
const frameUrl = (i: number) => `/frames/f_${String(i + 1).padStart(3, '0')}.webp`

// Phones: mobile browsers throttle video preload and seek unreliably, so use a canvas frame sequence.
const useFrameMode = () =>
  useState(() => window.matchMedia('(max-width: 767px), (pointer: coarse)').matches)[0]

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const titleRef = useRef<HTMLDivElement | null>(null)
  const kickerRef = useRef<HTMLDivElement | null>(null)
  const finalRef = useRef<HTMLDivElement | null>(null)
  const scrollHintRef = useRef<HTMLDivElement | null>(null)
  const scrimTopRef = useRef<HTMLDivElement | null>(null)
  const scrimBottomRef = useRef<HTMLDivElement | null>(null)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const frameMode = useFrameMode()
  const { loadState: videoState, reducedMotion } = useScrollVideo(videoRef)
  const [frameState, setFrameState] = useState<'loading' | 'ready' | 'error'>('loading')
  const loadState = frameMode ? frameState : videoState
  const errored = loadState === 'error'
  const framesRef = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    if (!frameMode) return
    let cancelled = false
    const frames = framesRef.current
    frames.length = FRAME_COUNT
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          frames[i] = img
          resolve()
        }
        img.onerror = () => resolve()
        img.src = frameUrl(i)
      })
    load(0).then(() => {
      if (cancelled) return
      if (!frames[0]) return setFrameState('error')
      setFrameState('ready')
      let next = 1
      const worker = async () => {
        while (!cancelled && next < FRAME_COUNT) await load(next++)
      }
      for (let w = 0; w < 4; w++) worker()
    })
    return () => {
      cancelled = true
    }
  }, [frameMode])

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!section || loadState !== 'ready' || (frameMode ? !canvas : !video)) return

    const ctx2d = canvas?.getContext('2d') ?? null
    let lastDrawn = -1
    const drawFrame = (p: number) => {
      const frames = framesRef.current
      const target = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))))
      let idx = target
      while (idx >= 0 && !frames[idx]) idx--
      if (idx < 0 || idx === lastDrawn || !ctx2d) return
      lastDrawn = idx
      ctx2d.drawImage(frames[idx]!, 0, 0, FRAME_W, FRAME_H)
    }
    const seek = (p: number) => {
      if (frameMode) drawFrame(p)
      else if (video && video.duration) video.currentTime = p * video.duration
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        // Honor reduced motion: play the clip once, normally, no scroll hijack.
        if (frameMode) {
          seek(1)
        } else if (video) {
          video.muted = true
          video.currentTime = 0
          video.play().catch(() => {})
        }
        gsap.set([titleRef.current, scrollHintRef.current], { opacity: 1 })
        gsap.set([kickerRef.current, finalRef.current], { opacity: 0 })
        return
      }

      video?.pause()
      seek(0)
      gsap.set(kickerRef.current, { opacity: 0, y: 16 })
      gsap.set(finalRef.current, { opacity: 0, y: 16 })
      gsap.set(titleRef.current, { opacity: 1, y: 0 })

      const scrubTarget = { t: 0 }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${SCROLL_LENGTH_VH}%`,
          scrub: 0.45,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Discreet scroll hint only relevant before anything has moved.
            gsap.to(scrollHintRef.current, {
              opacity: self.progress > 0.02 ? 0 : 1,
              duration: 0.25,
              overwrite: 'auto',
            })
          },
        },
        defaults: { ease: 'none' },
      })

      // Drive the video frame-by-frame across the whole scrub range.
      tl.to(
        scrubTarget,
        {
          t: 1,
          duration: 1,
          onUpdate: () => seek(scrubTarget.t),
        },
        0,
      )

      // Opening title: visible at rest, dissolves as the bull begins to stir.
      tl.to(titleRef.current, { opacity: 0, y: -24, duration: 0.12 }, 0.03)

      // Mid-sequence kicker: appears while the mouth opens, gone before the can lands.
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.3,
      )
      tl.to(kickerRef.current, { opacity: 0, y: -16, duration: 0.08 }, 0.5)

      // Closing line: settles in once the can is fully revealed.
      tl.fromTo(
        finalRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.14 },
        0.82,
      )

      // Scrim breathes slightly darker as the can arrives, for label legibility.
      tl.to([scrimTopRef.current, scrimBottomRef.current], { opacity: 0.85, duration: 0.3 }, 0.6)
    }, section)

    return () => ctx.revert()
  }, [loadState, reducedMotion, frameMode])

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-rb-black"
      aria-label="Red Bull — abertura cinematográfica controlada pelo scroll"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-rb-black">
        {!errored && frameMode ? (
          <canvas
            ref={canvasRef}
            width={FRAME_W}
            height={FRAME_H}
            className="h-full w-full object-contain"
            aria-hidden="true"
          />
        ) : !errored ? (
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            muted
            playsInline
            preload="auto"
            poster="/video/poster.jpg"
            aria-hidden="true"
          >
            <source src="/video/bull-reveal-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
            <source src="/video/bull-reveal.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            <img
              src="/video/poster.jpg"
              alt="Touro Red Bull revelando a lata de energético"
              className="max-h-[70vh] w-auto object-contain opacity-90"
            />
            <p className="flex items-center gap-2 text-sm text-white/60">
              <RotateCcw className="h-4 w-4" /> Não foi possível carregar o vídeo. Exibindo imagem estática.
            </p>
          </div>
        )}
      </div>

      {loadState === 'loading' && !errored && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-rb-black">
          <Loader2 className="h-8 w-8 animate-spin text-rb-red" aria-hidden="true" />
          <span className="sr-only">Carregando experiência…</span>
        </div>
      )}

      {/* Cinematic scrims for text legibility, independent of video content */}
      <div
        ref={scrimTopRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 via-black/20 to-transparent opacity-60"
      />
      <div
        ref={scrimBottomRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60"
      />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-between px-6 py-[max(2rem,env(safe-area-inset-top))] text-center sm:px-10">
        <div ref={titleRef} className="mt-6 flex max-w-4xl flex-col items-center gap-4 sm:mt-10">
          <h1 className="text-4xl font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl lg:text-8xl">
            GIVES YOU <span className="text-rb-red">WIIINGS.</span>
          </h1>
          <p className="max-w-xl text-balance text-sm font-medium text-white/80 sm:text-lg">
            A energia que transforma movimento em possibilidades.
          </p>
        </div>

        <div ref={kickerRef} className="absolute left-1/2 top-[18%] -translate-x-1/2">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-sm">
            Desperte a fera
          </span>
        </div>

        <div ref={finalRef} className="absolute left-1/2 top-[14%] -translate-x-1/2">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-rb-red sm:text-sm">
            A energia está servida.
          </span>
        </div>

        <div ref={scrollHintRef} className="mb-4 flex flex-col items-center gap-2 text-white/70 sm:mb-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] sm:text-xs">Role para continuar</span>
          <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
