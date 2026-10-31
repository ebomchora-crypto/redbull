import { useEffect, useState } from 'react'
import type { RefObject } from 'react'

export type VideoLoadState = 'loading' | 'ready' | 'error'

/**
 * Tracks readiness of a <video> element (metadata loaded / errored) and
 * whether the visitor prefers reduced motion, without taking ownership of
 * scroll or playback — that orchestration lives with the caller (Hero),
 * which has the context to build the right GSAP timeline.
 */
export function useScrollVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  const [loadState, setLoadState] = useState<VideoLoadState>('loading')
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handle = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', handle)
    return () => mql.removeEventListener('change', handle)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    const onReady = () => {
      if (!cancelled && video.duration && !Number.isNaN(video.duration)) {
        setLoadState('ready')
      }
    }
    const onError = () => {
      if (!cancelled) setLoadState('error')
    }

    if (video.readyState >= 1) {
      onReady()
    } else {
      video.addEventListener('loadedmetadata', onReady)
      video.addEventListener('error', onError)
    }

    return () => {
      cancelled = true
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('error', onError)
    }
  }, [videoRef])

  return { loadState, reducedMotion }
}
