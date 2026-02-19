/**
 * components/roadmap/RoadmapPath.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Visual "Candy Crush / Duolingo" style guided learning roadmap.
 *
 * Stages snake left-right as you scroll down.
 * Each node shows: locked / in-progress / completed state.
 * Clicking an unlocked node navigates to that lesson/module.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Lock, CheckCircle2, Star, BookOpen,
  AlignJustify, Headphones, BookMarked, Flame,
} from 'lucide-react'
import { useLearning, CURRICULUM } from '../../context/LearningContext'

// ─── Stage configuration ──────────────────────────────────────────────────────

const STAGE_ICONS = {
  hiragana:     BookOpen,
  katakana:     AlignJustify,
  vocab_travel: Star,
  grammar_n5:   BookMarked,
  listening:    Headphones,
  reading:      BookOpen,
}

const STAGE_COLORS = {
  hiragana:     { bg: 'bg-lacquer', border: 'border-lacquer', text: 'text-lacquer', glow: 'shadow-glow-red', light: 'bg-lacquer-muted' },
  katakana:     { bg: 'bg-mist',    border: 'border-mist',    text: 'text-mist',    glow: 'shadow-md',       light: 'bg-mist-soft'    },
  vocab_travel: { bg: 'bg-gold',    border: 'border-gold',    text: 'text-gold',    glow: 'shadow-glow-gold',light: 'bg-gold-muted'   },
  grammar_n5:   { bg: 'bg-moss',    border: 'border-moss',    text: 'text-moss',    glow: 'shadow-md',       light: 'bg-moss-muted'   },
  listening:    { bg: 'bg-lacquer', border: 'border-lacquer', text: 'text-lacquer', glow: 'shadow-glow-red', light: 'bg-lacquer-muted' },
  reading:      { bg: 'bg-gold',    border: 'border-gold',    text: 'text-gold',    glow: 'shadow-glow-gold',light: 'bg-gold-muted'   },
}

// ─── Decorative connecting path ───────────────────────────────────────────────

function PathConnector({ fromSide, toSide, completed }) {
  return (
    <div className="flex justify-center items-center h-12 relative">
      <div className={`
        absolute w-1 h-12 rounded-full
        ${completed ? 'bg-moss/40' : 'bg-washi-warm'}
      `} />
    </div>
  )
}

// ─── Individual lesson node within a stage ────────────────────────────────────

function LessonNode({ lesson, moduleId, isCompleted, isUnlocked, isNext, color, delay }) {
  const state = isCompleted ? 'done' : isNext ? 'next' : isUnlocked ? 'open' : 'locked'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={isUnlocked ? `/learn/${moduleId}/${lesson.id}` : '#'}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-2xl
          transition-all duration-200 no-tap-highlight
          ${state === 'done'   ? 'bg-moss-muted hover:bg-moss/20' : ''}
          ${state === 'next'   ? `${color.light} hover:opacity-90` : ''}
          ${state === 'open'   ? 'bg-white border border-washi-warm hover:shadow-card' : ''}
          ${state === 'locked' ? 'opacity-40 cursor-not-allowed' : ''}
        `}
      >
        {/* Status icon */}
        <div className={`
          w-7 h-7 rounded-xl flex items-center justify-center shrink-0
          ${state === 'done'   ? 'bg-moss text-white' : ''}
          ${state === 'next'   ? `${color.bg} text-white` : ''}
          ${state === 'open'   ? 'bg-washi-warm text-mist' : ''}
          ${state === 'locked' ? 'bg-washi-warm text-mist' : ''}
        `}>
          {state === 'done'   ? <CheckCircle2 size={14} /> : null}
          {state === 'locked' ? <Lock size={12} /> : null}
          {(state === 'next' || state === 'open') ? (
            <span className="text-xs font-mono font-500">→</span>
          ) : null}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-500 text-ink truncate">{lesson.title}</div>
          <div className="text-[10px] font-japanese text-mist truncate">{lesson.titleJa}</div>
        </div>
        {state === 'next' && (
          <span className={`text-[10px] font-mono font-500 ${color.text} shrink-0`}>NEXT</span>
        )}
      </Link>
    </motion.div>
  )
}

// ─── Stage card ────────────────────────────────────────────────────────────────

function StageCard({ module, progress, stageIndex, isLocked, isActive, isComplete }) {
  const color = STAGE_COLORS[module.id] ?? STAGE_COLORS.hiragana
  const Icon = STAGE_ICONS[module.id] ?? BookOpen
  const { completedLessons, isLessonUnlocked, studyMode } = useLearning()

  const pct = Math.round(progress * 100)
  const stageState = isComplete ? 'complete' : isActive ? 'active' : isLocked ? 'locked' : 'open'

  // Find the next lesson in this module
  const nextLesson = module.lessons.find((l) => !completedLessons.includes(l.id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: stageIndex * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative rounded-3xl overflow-hidden
        ${stageState === 'locked' ? 'opacity-60' : ''}
      `}
    >
      {/* Stage header */}
      <div className={`
        p-5 ${stageState === 'complete' ? 'bg-ink' : stageState === 'active' ? color.light : 'bg-white'}
        border ${stageState === 'active' ? color.border : 'border-washi-warm'}
        rounded-3xl
        ${stageState === 'active' ? color.glow : ''}
      `}>
        <div className="flex items-center gap-4 mb-4">
          {/* Stage number / icon */}
          <div className={`
            w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0
            ${stageState === 'complete' ? 'bg-gold/20 border border-gold/40' :
              stageState === 'active'   ? `${color.bg} ${color.glow}` :
              stageState === 'locked'   ? 'bg-washi-warm' :
              'bg-washi-soft border border-washi-warm'}
          `}>
            {stageState === 'complete' ? (
              <CheckCircle2 size={24} className="text-gold" />
            ) : stageState === 'locked' ? (
              <Lock size={20} className="text-mist" />
            ) : (
              <Icon size={22} className={stageState === 'active' ? 'text-white' : color.text} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono text-mist uppercase tracking-widest">
                Stage {stageIndex + 1}
              </span>
              {stageState === 'complete' && (
                <span className="badge badge-gold text-[9px]">Complete</span>
              )}
              {stageState === 'active' && (
                <span className={`badge text-[9px] ${color.light} ${color.text}`}>In Progress</span>
              )}
            </div>
            <h3 className={`font-display text-lg font-500 leading-tight ${stageState === 'complete' ? 'text-washi' : 'text-ink'}`}>
              {module.title}
            </h3>
            <span className="font-japanese text-xs text-mist">{module.titleJa}</span>
          </div>

          {/* Progress ring */}
          <div className="relative w-11 h-11 shrink-0">
            <svg viewBox="0 0 44 44" className="w-full h-full -rotate-90">
              <circle cx="22" cy="22" r="17" fill="none" stroke="#E4DFD3" strokeWidth="4" />
              <circle
                cx="22" cy="22" r="17"
                fill="none"
                stroke={stageState === 'complete' ? '#B8923A' : color.bg.replace('bg-', '') === 'lacquer' ? '#C8312B' : '#B8923A'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 17}`}
                strokeDashoffset={`${2 * Math.PI * 17 * (1 - pct / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-mono font-500 text-ink">{pct}%</span>
            </div>
          </div>
        </div>

        {/* Lessons list — collapsed when locked */}
        {stageState !== 'locked' && (
          <div className="space-y-1.5">
            {module.lessons.slice(0, stageState === 'complete' ? 2 : undefined).map((lesson, li) => {
              const isDone = completedLessons.includes(lesson.id)
              const unlocked = studyMode === 'open' || isLessonUnlocked(module.id, lesson.id)
              const isNext = lesson.id === nextLesson?.id
              return (
                <LessonNode
                  key={lesson.id}
                  lesson={lesson}
                  moduleId={module.id}
                  isCompleted={isDone}
                  isUnlocked={unlocked}
                  isNext={isNext}
                  color={color}
                  delay={li * 0.04}
                />
              )
            })}
            {stageState === 'complete' && module.lessons.length > 2 && (
              <Link
                to={`/learn`}
                className="block text-center text-xs text-mist hover:text-ink py-2 transition-colors"
              >
                +{module.lessons.length - 2} more lessons →
              </Link>
            )}
          </div>
        )}

        {/* Locked overlay message */}
        {stageState === 'locked' && (
          <p className="text-xs text-mist">
            Complete {stageIndex > 0 ? `${Math.round(80)}% of Stage ${stageIndex}` : 'previous stage'} to unlock
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Roadmap component ───────────────────────────────────────────────────

export default function RoadmapPath() {
  const { completedLessons, getModuleProgress, streak } = useLearning()

  const stages = useMemo(() => {
    return CURRICULUM.map((module, i) => {
      const progress = getModuleProgress(module.id)
      const pct = progress
      const isComplete = pct >= 1
      const isLocked = i > 0 && getModuleProgress(CURRICULUM[i - 1].id) < 0.8
      const isActive = !isComplete && !isLocked && pct > 0

      return { module, progress, isComplete, isLocked, isActive }
    })
  }, [completedLessons, getModuleProgress])

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-400 text-ink">Your Path</h2>
          <p className="text-mist text-sm">みちのり — Guided learning journey</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lacquer-muted">
            <Flame size={14} className="text-lacquer fill-lacquer" />
            <span className="text-xs font-500 text-lacquer-dark">{streak} day streak</span>
          </div>
        )}
      </div>

      {/* Japan trip progress bar */}
      <div className="card-washi p-4 rounded-2xl mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono text-mist">N5 Journey Progress</span>
          <span className="text-xs font-mono text-ink font-500">
            {completedLessons.length} / {CURRICULUM.reduce((a, m) => a + m.lessons.length, 0)} lessons
          </span>
        </div>
        <div className="progress-bar h-2.5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-lacquer via-gold to-moss"
            initial={{ width: 0 }}
            animate={{
              width: `${(completedLessons.length / CURRICULUM.reduce((a, m) => a + m.lessons.length, 0)) * 100}%`
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <p className="text-[10px] text-mist mt-2 text-right">🇯🇵 Japan — September 2026</p>
      </div>

      {/* Stages */}
      <div className="space-y-4">
        {stages.map(({ module, progress, isComplete, isLocked, isActive }, i) => (
          <React.Fragment key={module.id}>
            <StageCard
              module={module}
              progress={progress}
              stageIndex={i}
              isLocked={isLocked}
              isActive={isActive}
              isComplete={isComplete}
            />
            {i < stages.length - 1 && (
              <PathConnector completed={isComplete} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* End destination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center p-6 rounded-3xl border-2 border-dashed border-gold/30 bg-gold-muted/30"
      >
        <div className="text-3xl mb-2">🇯🇵</div>
        <div className="font-display text-xl font-400 text-ink">Japan Trip!</div>
        <div className="text-sm text-mist font-japanese">September 2026</div>
      </motion.div>
    </div>
  )
}
