/**
 * components/flashcard/FlashCardSession.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Orchestrates a complete flashcard study session.
 *
 * Props:
 *   cards       {Flashcard[]}  — array of flashcard objects
 *   moduleTitle {string}       — display name for the header
 *   onComplete  {Function}     — called with { known, unknown, xpEarned }
 *   onExit      {Function}     — called when user exits early
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, RotateCcw, ArrowRight, Zap, Target } from 'lucide-react'
import FlashCard from './FlashCard'
import { useSpacedRepetition } from '../../hooks/useSpacedRepetition'
import { useLearning } from '../../context/LearningContext'
import { useXPPopup, XPPopupLayer } from '../ui/XPPopup'

const XP_PER_KNOWN = 5
const XP_PERFECT_BONUS = 25

export default function FlashCardSession({ cards = [], moduleTitle = 'Study', onComplete, onExit }) {
  const { awardXP } = useLearning()
  const { popups, triggerXP } = useXPPopup()

  const cardIds = useMemo(() => cards.map((c) => c.id), [cards])
  const { getDueCards, recordResponse, getCardStats, masteryRate } = useSpacedRepetition(cardIds, {
    sessionSize: Math.min(cards.length, 20),
  })

  // Session queue
  const [sessionQueue] = useState(() => {
    const dueIds = getDueCards()
    return dueIds.map((id) => cards.find((c) => c.id === id)).filter(Boolean)
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState({ known: 0, unknown: 0 })
  const [direction, setDirection] = useState(1) // for swipe animation

  const currentCard = sessionQueue[currentIndex]
  const isComplete = currentIndex >= sessionQueue.length

  const handleKnow = useCallback(() => {
    if (!currentCard) return
    recordResponse(currentCard.id, 'know')
    const xp = XP_PER_KNOWN
    awardXP(xp)
    triggerXP(xp, '知ってる')
    setResults((r) => ({ ...r, known: r.known + 1 }))
    setDirection(1)
    setCurrentIndex((i) => i + 1)
  }, [currentCard, recordResponse, awardXP, triggerXP])

  const handleDontKnow = useCallback(() => {
    if (!currentCard) return
    recordResponse(currentCard.id, 'dont-know')
    setResults((r) => ({ ...r, unknown: r.unknown + 1 }))
    setDirection(1)
    setCurrentIndex((i) => i + 1)
  }, [currentCard, recordResponse])

  const handleComplete = useCallback(() => {
    const bonus = results.unknown === 0 ? XP_PERFECT_BONUS : 0
    if (bonus) {
      awardXP(bonus)
      triggerXP(bonus, 'Perfect!')
    }
    onComplete?.({ ...results, xpEarned: results.known * XP_PER_KNOWN + bonus })
  }, [results, awardXP, triggerXP, onComplete])

  const handleRestart = useCallback(() => {
    setCurrentIndex(0)
    setResults({ known: 0, unknown: 0 })
  }, [])

  const totalCards = sessionQueue.length
  const accuracy = totalCards > 0 ? Math.round((results.known / totalCards) * 100) : 0

  return (
    <div className="min-h-screen bg-washi flex flex-col">
      <XPPopupLayer popups={popups} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-washi-warm bg-white">
        <button onClick={onExit} className="btn-ghost p-2 -ml-2">
          <X size={18} />
        </button>
        <div className="text-center">
          <div className="text-sm font-500 text-ink">{moduleTitle}</div>
          <div className="text-[11px] text-mist font-japanese">フラッシュカード</div>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-muted text-gold-dark text-xs font-mono">
          <Zap size={11} />
          <span>{results.known * XP_PER_KNOWN}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <FlashCard
                card={currentCard}
                cardIndex={currentIndex + 1}
                totalCards={totalCards}
                srsStats={getCardStats(currentCard?.id)}
                onKnow={handleKnow}
                onDontKnow={handleDontKnow}
              />
            </motion.div>
          ) : (
            /* ── Results screen ── */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <div className="card p-8 text-center">
                {/* Trophy */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 rounded-2xl bg-gold-muted flex items-center justify-center mx-auto mb-5"
                >
                  <Trophy size={28} className="text-gold" />
                </motion.div>

                <h2 className="font-display text-2xl font-400 text-ink mb-1">Session Complete!</h2>
                <p className="text-mist text-sm mb-6">セッション終了</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Accuracy', value: `${accuracy}%`, color: accuracy >= 70 ? 'text-moss' : 'text-lacquer' },
                    { label: 'Known', value: results.known, color: 'text-moss' },
                    { label: 'Learning', value: results.unknown, color: 'text-lacquer' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="card-washi p-3 rounded-xl">
                      <div className={`font-display text-2xl font-600 ${color}`}>{value}</div>
                      <div className="text-[11px] text-mist">{label}</div>
                    </div>
                  ))}
                </div>

                {/* XP earned */}
                <div className="flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-gold-muted mx-auto w-fit">
                  <Zap size={14} className="text-gold" />
                  <span className="text-sm font-mono font-500 text-gold-dark">
                    +{results.known * XP_PER_KNOWN + (results.unknown === 0 ? XP_PERFECT_BONUS : 0)} XP earned
                  </span>
                </div>

                {/* Mastery bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-mist mb-1.5">
                    <span className="flex items-center gap-1"><Target size={11} />Deck mastery</span>
                    <span className="font-mono">{Math.round(masteryRate * 100)}%</span>
                  </div>
                  <div className="progress-bar h-2">
                    <motion.div
                      className="h-full rounded-full bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${masteryRate * 100}%` }}
                      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {results.unknown > 0 && (
                    <button onClick={handleRestart} className="btn-secondary py-3 gap-2">
                      <RotateCcw size={15} />
                      Practice unknowns again
                    </button>
                  )}
                  <button onClick={handleComplete} className="btn-primary py-3 gap-2">
                    Continue
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
