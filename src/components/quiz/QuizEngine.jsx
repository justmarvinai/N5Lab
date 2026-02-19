/**
 * components/quiz/QuizEngine.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Gamified multiple-choice quiz engine.
 *
 * Features:
 *  - Immediate visual feedback (green/red highlight)
 *  - Haptic feedback via useSound
 *  - Animated question transitions
 *  - XP rewards with popup
 *  - Explanation reveal after each answer
 *  - Animated progress bar
 *  - Results screen with score breakdown
 *
 * Props:
 *   questions   {QuizQuestion[]}  — from grammarLessons / kana quiz data
 *   title       {string}          — quiz title
 *   onComplete  {Function}        — called with { score, xpEarned, correct, total }
 *   onExit      {Function}
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Check, ChevronRight, Trophy, Zap, Star,
  ArrowRight, RotateCcw, AlertCircle
} from 'lucide-react'
import { useLearning } from '../../context/LearningContext'
import { useSound } from '../../hooks/useSound'
import { useXPPopup, XPPopupLayer } from '../ui/XPPopup'
import { shuffle } from '../../data/dataUtils'

// ─── Answer option button ──────────────────────────────────────────────────────

function AnswerOption({ text, state, onClick, index }) {
  // state: 'idle' | 'correct' | 'wrong' | 'missed'
  const baseClass = 'w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all duration-200 font-body text-sm flex items-center gap-3'

  const stateClass = {
    idle: 'bg-white border-washi-warm hover:border-mist hover:bg-washi-soft cursor-pointer',
    correct: 'bg-moss-muted border-moss text-moss cursor-default',
    wrong: 'bg-lacquer-muted border-lacquer text-lacquer-dark cursor-default',
    missed: 'bg-washi-soft border-moss/40 text-ink/50 cursor-default',
  }[state] ?? ''

  const Icon = state === 'correct'
    ? Check
    : state === 'wrong'
      ? X
      : null

  const letters = ['A', 'B', 'C', 'D']

  return (
    <motion.button
      onClick={state === 'idle' ? onClick : undefined}
      className={`${baseClass} ${stateClass}`}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      whileTap={state === 'idle' ? { scale: 0.98 } : {}}
    >
      <span className={`
        w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-500 shrink-0
        ${state === 'idle' ? 'bg-washi-soft text-mist' :
          state === 'correct' ? 'bg-moss text-white' :
          state === 'wrong' ? 'bg-lacquer text-white' :
          'bg-washi-warm text-mist/50'}
      `}>
        {Icon ? <Icon size={12} /> : letters[index]}
      </span>
      <span className="flex-1 leading-snug">{text}</span>
    </motion.button>
  )
}

// ─── Explanation reveal ────────────────────────────────────────────────────────

function ExplanationCard({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-4 p-4 rounded-2xl bg-ink-soft border border-ink-muted/30 flex gap-3">
        <AlertCircle size={16} className="text-mist shrink-0 mt-0.5" />
        <p className="text-sm text-mist-light leading-relaxed">{text}</p>
      </div>
    </motion.div>
  )
}

// ─── Results screen ────────────────────────────────────────────────────────────

function QuizResults({ correct, total, xpEarned, onRetry, onContinue }) {
  const pct = Math.round((correct / total) * 100)
  const isPerfect = pct === 100
  const isGood = pct >= 70

  const stars = isPerfect ? 3 : isGood ? 2 : 1

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="card p-8 text-center max-w-sm mx-auto"
    >
      {/* Stars */}
      <div className="flex justify-center gap-2 mb-5">
        {[1, 2, 3].map((s) => (
          <motion.div
            key={s}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: s <= stars ? 1 : 0.5, rotate: 0, opacity: s <= stars ? 1 : 0.25 }}
            transition={{ delay: 0.15 + s * 0.1, type: 'spring', stiffness: 280, damping: 18 }}
          >
            <Star
              size={32}
              className={s <= stars ? 'text-gold fill-gold' : 'text-washi-warm'}
            />
          </motion.div>
        ))}
      </div>

      <h2 className="font-display text-2xl font-400 text-ink mb-1">
        {isPerfect ? '完璧！' : isGood ? 'よくできました！' : 'がんばって！'}
      </h2>
      <p className="text-mist text-sm mb-6">
        {isPerfect ? 'Perfect score!' : isGood ? 'Well done!' : 'Keep studying!'}
      </p>

      {/* Score ring */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#E4DFD3" strokeWidth="8" />
          <motion.circle
            cx="48" cy="48" r="40"
            fill="none"
            stroke={isPerfect ? '#4A6741' : isGood ? '#B8923A' : '#C8312B'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - pct / 100) }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono text-xl font-500 ${isPerfect ? 'text-moss' : isGood ? 'text-gold' : 'text-lacquer'}`}>
            {pct}%
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="card-washi rounded-xl p-3">
          <div className="font-display text-2xl font-600 text-moss">{correct}</div>
          <div className="text-[11px] text-mist">Correct</div>
        </div>
        <div className="card-washi rounded-xl p-3">
          <div className="font-display text-2xl font-600 text-lacquer">{total - correct}</div>
          <div className="text-[11px] text-mist">Incorrect</div>
        </div>
      </div>

      {/* XP */}
      <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gold-muted mx-auto w-fit mb-6">
        <Zap size={13} className="text-gold" />
        <span className="text-sm font-mono font-500 text-gold-dark">+{xpEarned} XP</span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {pct < 100 && (
          <button onClick={onRetry} className="btn-secondary py-3 gap-2">
            <RotateCcw size={14} />
            Try again
          </button>
        )}
        <button onClick={onContinue} className="btn-primary py-3 gap-2">
          Continue
          <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main Quiz Engine ──────────────────────────────────────────────────────────

export default function QuizEngine({
  questions: rawQuestions = [],
  title = 'Quiz',
  onComplete,
  onExit,
}) {
  const { awardXP } = useLearning()
  const { playCorrect, playWrong } = useSound()
  const { popups, triggerXP } = useXPPopup()

  // Shuffle options for each question on mount
  const questions = useMemo(() => {
    return rawQuestions.map((q) => {
      if (q.type === 'multiple-choice' && q.options) {
        return { ...q, options: shuffle([...q.options]) }
      }
      return q
    })
  }, [rawQuestions])

  const [qIndex, setQIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null) // the chosen text
  const [hasAnswered, setHasAnswered] = useState(false)
  const [results, setResults] = useState([]) // array of booleans
  const [direction, setDirection] = useState(1)
  const [showResults, setShowResults] = useState(false)

  const currentQ = questions[qIndex]
  const isLast = qIndex === questions.length - 1

  const handleAnswer = useCallback(
    (answer) => {
      if (hasAnswered) return
      setSelectedAnswer(answer)
      setHasAnswered(true)

      const isCorrect = currentQ.answer.some(
        (a) => a.toLowerCase().trim() === answer.toLowerCase().trim()
      )

      setResults((r) => [...r, isCorrect])

      if (isCorrect) {
        playCorrect()
        const xp = currentQ.xp ?? 10
        awardXP(xp)
        triggerXP(xp)
      } else {
        playWrong()
      }
    },
    [hasAnswered, currentQ, playCorrect, playWrong, awardXP, triggerXP]
  )

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowResults(true)
    } else {
      setDirection(1)
      setQIndex((i) => i + 1)
      setSelectedAnswer(null)
      setHasAnswered(false)
    }
  }, [isLast])

  const handleRetry = useCallback(() => {
    setQIndex(0)
    setSelectedAnswer(null)
    setHasAnswered(false)
    setResults([])
    setShowResults(false)
  }, [])

  const handleComplete = useCallback(() => {
    const correct = results.filter(Boolean).length
    const total = questions.length
    const score = Math.round((correct / total) * 100)
    const xpEarned = results.reduce((acc, ok, i) => acc + (ok ? (questions[i]?.xp ?? 10) : 0), 0)
    const bonus = score === 100 ? 50 : 0
    if (bonus) { awardXP(bonus); triggerXP(bonus, 'Perfect!') }
    onComplete?.({ score, xpEarned: xpEarned + bonus, correct, total })
  }, [results, questions, awardXP, triggerXP, onComplete])

  // Keyboard: 1-4 for answers, Enter/Space for next
  useEffect(() => {
    const handler = (e) => {
      if (showResults) return
      const opts = currentQ?.options
      if (!hasAnswered && opts) {
        const n = parseInt(e.key)
        if (n >= 1 && n <= opts.length) handleAnswer(opts[n - 1])
      }
      if (hasAnswered && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [showResults, hasAnswered, currentQ, handleAnswer, handleNext])

  if (!currentQ) return null

  const correct = results.filter(Boolean).length
  const xpEarned = results.reduce((acc, ok, i) => acc + (ok ? (questions[i]?.xp ?? 10) : 0), 0)

  if (showResults) {
    return (
      <div className="min-h-screen bg-washi flex flex-col">
        <XPPopupLayer popups={popups} />
        <div className="flex items-center justify-between px-4 py-4 border-b border-washi-warm bg-white">
          <div />
          <div className="text-sm font-500 text-ink">{title}</div>
          <div />
        </div>
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <QuizResults
            correct={correct}
            total={questions.length}
            xpEarned={xpEarned}
            onRetry={handleRetry}
            onContinue={handleComplete}
          />
        </div>
      </div>
    )
  }

  const progress = (qIndex / questions.length) * 100
  const answeredCorrectly = hasAnswered && currentQ.answer.some(
    (a) => a.toLowerCase().trim() === selectedAnswer?.toLowerCase().trim()
  )

  return (
    <div className="min-h-screen bg-washi flex flex-col">
      <XPPopupLayer popups={popups} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-washi-warm bg-white">
        <button onClick={onExit} className="btn-ghost p-2 -ml-2">
          <X size={18} />
        </button>
        <div className="text-center">
          <div className="text-sm font-500 text-ink">{title}</div>
          <div className="text-[10px] text-mist font-mono">{qIndex + 1} / {questions.length}</div>
        </div>
        {/* Live score */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-muted text-gold-dark text-xs font-mono">
          <Zap size={11} />
          <span>{xpEarned}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-washi-warm">
        <motion.div
          className="h-full bg-lacquer"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col px-4 py-6 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 30 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            {/* Question type badge */}
            <div className="mb-4">
              <span className="badge badge-mist text-[10px] uppercase tracking-widest">
                {currentQ.type.replace(/-/g, ' ')}
              </span>
            </div>

            {/* Question text */}
            <div className="mb-4">
              <h2 className="font-display text-xl font-400 text-ink leading-snug mb-2">
                {currentQ.question}
              </h2>
              {currentQ.sentence && (
                <div className="px-4 py-3 bg-washi-soft rounded-xl border border-washi-warm">
                  <p className="font-japanese text-lg text-ink">{currentQ.sentence}</p>
                </div>
              )}
            </div>

            {/* Answer options */}
            <div className="flex flex-col gap-2.5 mb-4">
              {(currentQ.options ?? currentQ.answer).map((opt, i) => {
                let state = 'idle'
                if (hasAnswered) {
                  const isCorrectOpt = currentQ.answer.some(
                    (a) => a.toLowerCase().trim() === opt.toLowerCase().trim()
                  )
                  if (opt === selectedAnswer) {
                    state = isCorrectOpt ? 'correct' : 'wrong'
                  } else if (isCorrectOpt) {
                    state = 'missed' // show correct if user got it wrong
                  }
                }
                return (
                  <AnswerOption
                    key={opt}
                    text={opt}
                    state={state}
                    index={i}
                    onClick={() => handleAnswer(opt)}
                  />
                )
              })}
            </div>

            {/* Explanation */}
            {hasAnswered && <ExplanationCard text={currentQ.explanation} />}
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        <AnimatePresence>
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mt-4"
            >
              <button
                onClick={handleNext}
                className={`w-full py-3.5 rounded-2xl font-body font-500 text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                  answeredCorrectly
                    ? 'bg-moss text-white hover:bg-moss-light'
                    : 'bg-lacquer text-white hover:bg-lacquer-light'
                }`}
              >
                {isLast ? (
                  <>See results <Trophy size={15} /></>
                ) : (
                  <>Next question <ChevronRight size={15} /></>
                )}
                <span className="text-xs opacity-60 ml-auto font-mono">Enter</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
