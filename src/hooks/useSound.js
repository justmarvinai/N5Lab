/**
 * hooks/useSound.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Synthesised sound effects via Web Audio API.
 * Uses a SINGLE global AudioContext to prevent browser limit crashes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useCallback } from 'react'

// Singleton: Speichert den Context global außerhalb des Hooks
let globalAudioCtx = null

function getGlobalAudioContext() {
  if (typeof window === 'undefined') return null

  if (!globalAudioCtx) {
    try {
      // Erstelle den Context nur einmalig
      globalAudioCtx = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.error('Web Audio API not supported:', e)
      return null
    }
  }

  // Resume suspended context (browser autoplay policy)
  if (globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume().catch(e => console.error('Audio resume failed:', e))
  }

  return globalAudioCtx
}

/**
 * Play a short tone.
 */
function playTone(ctx, { frequency = 440, duration = 0.15, type = 'sine', gain = 0.3, delay = 0 } = {}) {
  if (!ctx) return
  try {
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()
    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.type = type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay)

    gainNode.gain.setValueAtTime(0, ctx.currentTime + delay)
    gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + delay + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)

    osc.start(ctx.currentTime + delay)
    osc.stop(ctx.currentTime + delay + duration + 0.05)
  } catch (e) {
    console.warn('Audio play failed:', e)
  }
}

export function useSound() {
  // Kein ctxRef mehr nötig, wir holen den globalen Context direkt
  const getCtx = useCallback(() => {
    return getGlobalAudioContext()
  }, [])

  /** Correct answer — ascending pleasant chime */
  const playCorrect = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, { frequency: 523, duration: 0.12, type: 'sine', gain: 0.25 })        // C5
    playTone(ctx, { frequency: 659, duration: 0.12, type: 'sine', gain: 0.25, delay: 0.10 }) // E5
    playTone(ctx, { frequency: 784, duration: 0.20, type: 'sine', gain: 0.20, delay: 0.20 }) // G5
  }, [getCtx])

  /** Wrong answer — low buzz */
  const playWrong = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, { frequency: 220, duration: 0.18, type: 'sawtooth', gain: 0.15 })
    playTone(ctx, { frequency: 196, duration: 0.18, type: 'sawtooth', gain: 0.12, delay: 0.12 })
  }, [getCtx])

  /** Card flip — soft click */
  const playFlip = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, { frequency: 800, duration: 0.04, type: 'triangle', gain: 0.12 })
  }, [getCtx])

  /** Level up — triumphant fanfare */
  const playLevelUp = useCallback(() => {
    const ctx = getCtx()
    const notes = [523, 659, 784, 1047]
    notes.forEach((freq, i) => {
      playTone(ctx, { frequency: freq, duration: 0.18, type: 'sine', gain: 0.25, delay: i * 0.12 })
    })
  }, [getCtx])

  /** XP gain — soft pop */
  const playXP = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, { frequency: 660, duration: 0.08, type: 'sine', gain: 0.18 })
    playTone(ctx, { frequency: 880, duration: 0.10, type: 'sine', gain: 0.15, delay: 0.06 })
  }, [getCtx])

  /** "Know it" — satisfying bright ping */
  const playKnow = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, { frequency: 698, duration: 0.08, type: 'sine', gain: 0.22 })
    playTone(ctx, { frequency: 880, duration: 0.14, type: 'sine', gain: 0.18, delay: 0.07 })
  }, [getCtx])

  /** "Don't know" — soft low thud */
  const playDontKnow = useCallback(() => {
    const ctx = getCtx()
    playTone(ctx, { frequency: 330, duration: 0.10, type: 'triangle', gain: 0.15 })
  }, [getCtx])

  return { playCorrect, playWrong, playFlip, playLevelUp, playXP, playKnow, playDontKnow }
}

export default useSound