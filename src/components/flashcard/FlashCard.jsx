/**
 * components/flashcard/FlashCard.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Animated 3D flip flashcard with spaced-repetition buttons.
 *
 * Props:
 *   card        {Flashcard}   — { front, back, reading, hint }
 *   onKnow      {Function}    — called when user taps "Know it"
 *   onDontKnow  {Function}    — called when user taps "Don't know"
 *   cardIndex   {number}      — current card number (1-based)
 *   totalCards  {number}      — total cards in session
 *   srsStats    {object|null} — from useSpacedRepetition
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCw, ThumbsUp, ThumbsDown, Eye } from 'lucide-react'
import { useSound } from '../../hooks/useSound'

// ─── 3D flip spring config ────────────────────────────────────────────────────

const flipVariants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

// ─── Card face component ──────────────────────────────────────────────────────

function CardFace({ children, isBack = false }) {
  return (
    <div
      className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}
    >
      {children}
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function SessionProgress({ current, total }) {
  const pct = total > 0 ? ((current - 1) / total) * 100 : 0
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-xs font-mono text-mist shrink-0">{current} / {total}</span>
      <div className="flex-1 h-1.5 rounded-full bg-washi-warm overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-lacquer"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ─── Main FlashCard component ─────────────────────────────────────────────────

export default function FlashCard({
  card,
  onKnow,
  onDontKnow,
  cardIndex = 1,
  totalCards = 1,
  srsStats = null,
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [lastAction, setLastAction] = useState(null) // 'know' | 'dont-know' | null
  const { playFlip, playKnow, playDontKnow } = useSound()

  const handleFlip = useCallback(() => {
    playFlip()
    setIsFlipped((v) => !v)
  }, [playFlip])

  const handleKnow = useCallback(() => {
    playKnow()
    setLastAction('know')
    // Brief flash feedback then call parent
    setTimeout(() => {
      setLastAction(null)
      setIsFlipped(false)
      onKnow?.()
    }, 350)
  }, [playKnow, onKnow])

  const handleDontKnow = useCallback(() => {
    playDontKnow()
    setLastAction('dont-know')
    setTimeout(() => {
      setLastAction(null)
      setIsFlipped(false)
      onDontKnow?.()
    }, 350)
  }, [playDontKnow, onDontKnow])

  // Keyboard controls
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleFlip() }
      if (e.key === 'ArrowRight' && isFlipped) handleKnow()
      if (e.key === 'ArrowLeft' && isFlipped) handleDontKnow()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isFlipped, handleFlip, handleKnow, handleDontKnow])

  if (!card) return null

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto select-none">

      {/* Session progress */}
      <div className="w-full mb-2">
        <SessionProgress current={cardIndex} total={totalCards} />
      </div>

      {/* SRS stats pill (if returning card) */}
      {srsStats && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] font-mono text-mist px-2.5 py-1 rounded-full bg-washi-soft border border-washi-warm">
            Review №{srsStats.totalSeen ?? 1} · interval {srsStats.interval ?? 0}d
          </span>
        </div>
      )}

      {/* ── 3D card ── */}
      <motion.div
        className="w-full relative cursor-pointer"
        style={{ perspective: 1200 }}
        onClick={handleFlip}
        whileTap={{ scale: 0.97 }}
      >
        <motion.div
          variants={flipVariants}
          animate={isFlipped ? 'back' : 'front'}
          className="relative w-full"
          style={{
            transformStyle: 'preserve-3d',
            height: 260,
          }}
        >
          {/* ── Front face ── */}
          <CardFace>
            <motion.div
              className="h-full flex flex-col items-center justify-center gap-4 p-8 bg-white border border-washi-warm rounded-3xl shadow-card"
              animate={
                lastAction === 'know'
                  ? { backgroundColor: '#d8e8d4', borderColor: '#4A6741' }
                  : lastAction === 'dont-know'
                    ? { backgroundColor: '#F0D0CE', borderColor: '#C8312B' }
                    : { backgroundColor: '#ffffff', borderColor: '#E4DFD3' }
              }
              transition={{ duration: 0.25 }}
            >
              {/* Kana / word display */}
              <div className="text-center">
                <div className="font-japanese text-6xl leading-none text-ink mb-2">
                  {card.front}
                </div>
                {card.reading && card.reading !== card.front && (
                  <div className="font-japanese text-lg text-mist">{card.reading}</div>
                )}
              </div>

              {card.hint && (
                <div className="text-xs text-mist text-center px-4 italic leading-relaxed">
                  {card.hint}
                </div>
              )}

              {/* Tap hint */}
              <div className="flex items-center gap-1.5 text-mist-light text-[11px] font-body">
                <Eye size={11} />
                <span>tap to reveal</span>
              </div>
            </motion.div>
          </CardFace>

          {/* ── Back face ── */}
          <CardFace isBack>
            <div className="h-full flex flex-col items-center justify-center gap-4 p-8 bg-ink rounded-3xl shadow-lifted">
              <div className="text-center">
                <div className="text-xs font-mono text-mist-light uppercase tracking-widest mb-3">Answer</div>
                <div className="font-display text-4xl font-300 text-washi leading-tight mb-2">
                  {card.back}
                </div>
                {card.front && (
                  <div className="font-japanese text-2xl text-mist-light">{card.front}</div>
                )}
              </div>
              {card.hint && (
                <div className="text-xs text-mist-light text-center px-4 italic leading-relaxed opacity-70">
                  {card.hint}
                </div>
              )}
            </div>
          </CardFace>
        </motion.div>
      </motion.div>

      {/* ── Action buttons — shown after flip ── */}
      <div className="w-full mt-5">
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.button
              key="flip-btn"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onClick={handleFlip}
              className="w-full btn-secondary py-3 text-sm gap-2"
            >
              <RotateCw size={15} />
              Flip card
              <span className="text-[10px] text-mist ml-auto font-mono">Space</span>
            </motion.button>
          ) : (
            <motion.div
              key="rating-btns"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, staggerChildren: 0.05 }}
              className="grid grid-cols-2 gap-3"
            >
              {/* Don't know */}
              <motion.button
                onClick={handleDontKnow}
                whileTap={{ scale: 0.95 }}
                className="
                  flex flex-col items-center gap-1.5 py-4 px-4 rounded-2xl
                  bg-lacquer-muted border border-lacquer/20
                  hover:bg-lacquer hover:text-white hover:border-lacquer
                  transition-all duration-200 ease-spring group
                "
              >
                <ThumbsDown size={20} className="text-lacquer group-hover:text-white transition-colors" />
                <span className="text-sm font-500 text-lacquer-dark group-hover:text-white transition-colors">
                  Still learning
                </span>
                <span className="text-[10px] text-mist group-hover:text-white/60 font-mono transition-colors">← arrow</span>
              </motion.button>

              {/* Know it */}
              <motion.button
                onClick={handleKnow}
                whileTap={{ scale: 0.95 }}
                className="
                  flex flex-col items-center gap-1.5 py-4 px-4 rounded-2xl
                  bg-moss-muted border border-moss/20
                  hover:bg-moss hover:text-white hover:border-moss
                  transition-all duration-200 ease-spring group
                "
              >
                <ThumbsUp size={20} className="text-moss group-hover:text-white transition-colors" />
                <span className="text-sm font-500 text-moss group-hover:text-white transition-colors">
                  Got it!
                </span>
                <span className="text-[10px] text-mist group-hover:text-white/60 font-mono transition-colors">→ arrow</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard hint */}
        <p className="text-center text-[10px] text-mist mt-3 font-mono">
          Space to flip · ←/→ to rate
        </p>
      </div>
    </div>
  )
}
