/**
 * Dashboard.jsx
 * ─────────────────────────────────────────────────────────────────
 * Home screen. Shows:
 * - Welcome + current level/XP
 * - Daily streak
 * - Curriculum progress overview
 * - "Continue" button to next unlocked lesson
 * - Countdown to Japan trip
 * ─────────────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Flame,
  Zap,
  ArrowRight,
  Target,
  Calendar,
  TrendingUp,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { useLearning } from '../context/LearningContext'

// ─── Trip countdown ───────────────────────────────────────────────────────────

function useTripCountdown() {
  return useMemo(() => {
    const tripDate = new Date('2026-09-01T00:00:00')
    const today = new Date()
    const diff = tripDate - today
    const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)
    return { days, weeks, months }
  }, [])
}

// ─── Module card ──────────────────────────────────────────────────────────────

const MODULE_COLORS = {
  lacquer: {
    bg: 'bg-lacquer-muted',
    accent: 'bg-lacquer',
    text: 'text-lacquer-dark',
    border: 'border-lacquer/20',
    progress: 'bg-lacquer',
  },
  mist: {
    bg: 'bg-mist-soft',
    accent: 'bg-mist',
    text: 'text-mist',
    border: 'border-mist/20',
    progress: 'bg-mist',
  },
  gold: {
    bg: 'bg-gold-muted',
    accent: 'bg-gold',
    text: 'text-gold-dark',
    border: 'border-gold/20',
    progress: 'bg-gold',
  },
  moss: {
    bg: 'bg-moss-muted',
    accent: 'bg-moss',
    text: 'text-moss',
    border: 'border-moss/20',
    progress: 'bg-moss',
  },
}

function ModuleProgressCard({ module, progress, index }) {
  const colors = MODULE_COLORS[module.color] ?? MODULE_COLORS.mist
  const pct = Math.round(progress * 100)
  const isComplete = pct === 100
  const isLocked = progress === 0 && index > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`
        card p-4 flex flex-col gap-3
        ${isComplete ? 'ring-1 ring-moss/30' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-xs font-mono font-500 ${colors.text}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            {isComplete && <CheckCircle2 size={13} className="text-moss shrink-0" />}
            {isLocked && <Lock size={13} className="text-mist shrink-0" />}
          </div>
          <h3 className="font-display text-base font-600 text-ink leading-tight">
            {module.title}
          </h3>
          <span className="font-japanese text-xs text-mist">{module.titleJa}</span>
        </div>
        <div className={`
          w-9 h-9 rounded-xl flex items-center justify-center shrink-0
          ${colors.bg}
        `}>
          <span className={`text-base font-japanese font-700 ${colors.text}`}>
            {module.titleJa.charAt(0)}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[11px] text-mist font-body">
            {module.lessons.length} lessons
          </span>
          <span className={`text-[11px] font-mono font-500 ${colors.text}`}>
            {pct}%
          </span>
        </div>
        <div className="progress-bar">
          <motion.div
            className={`h-full rounded-full ${colors.progress}`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: index * 0.07 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* CTA */}
      <Link
        to={`/learn/${module.id}`}
        className={`
          btn text-xs px-3 py-2 self-start
          ${isComplete
            ? 'btn-secondary'
            : isLocked
              ? 'opacity-40 pointer-events-none btn-secondary'
              : `${colors.bg} ${colors.text} hover:opacity-80 border border-transparent`
          }
        `}
      >
        {isComplete ? 'Review' : isLocked ? 'Locked' : pct > 0 ? 'Continue' : 'Start'}
        {!isLocked && <ArrowRight size={12} />}
      </Link>
    </motion.div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, sublabel, color = 'text-ink', bgColor = 'bg-washi-soft' }) {
  return (
    <div className={`card p-4 flex flex-col gap-2 ${bgColor}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-body text-mist">{label}</span>
        <Icon size={16} className={color} />
      </div>
      <div className={`text-2xl font-display font-600 ${color}`}>{value}</div>
      {sublabel && <div className="text-[11px] text-mist">{sublabel}</div>}
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const {
    xp,
    level,
    levelProgress,
    streak,
    longestStreak,
    completedLessons,
    totalLessons,
    completionRate,
    curriculum,
    getModuleProgress,
  } = useLearning()

  const { days: daysLeft } = useTripCountdown()

  // Find next lesson to do
  const nextLesson = useMemo(() => {
    for (const module of curriculum) {
      for (const lesson of module.lessons) {
        if (!completedLessons.includes(lesson.id)) {
          return { module, lesson }
        }
      }
    }
    return null
  }, [curriculum, completedLessons])

  const xpInLevel = useMemo(() => {
    const thresholds = [0,100,250,450,700,1000,1350,1750,2200,2700,3300,4000,4800,5700,6700,7800,9000,10300,11700,13200,15000]
    const currentBase = thresholds[level - 1] ?? 0
    const nextBase = thresholds[level] ?? thresholds[thresholds.length - 1]
    return { current: xp - currentBase, needed: nextBase - currentBase }
  }, [xp, level])

  return (
    <div className="py-6 md:py-8 max-w-4xl">

      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-300 text-ink mb-1">
              おはようございます
            </h1>
            <p className="text-mist text-sm font-body">
              {completedLessons.length === 0
                ? "Welcome to N5Lab. Your journey to Japan starts here."
                : `You've completed ${completedLessons.length} of ${totalLessons} lessons. Keep going!`}
            </p>
          </div>
          {/* Level badge */}
          <div className="shrink-0 flex flex-col items-center gap-1">
            <div className="
              w-14 h-14 rounded-2xl bg-ink border-2 border-gold
              flex items-center justify-center
              shadow-glow-gold
            ">
              <span className="font-mono text-xl font-500 text-gold">{level}</span>
            </div>
            <span className="text-[10px] font-mono text-mist">Level</span>
          </div>
        </div>

        {/* XP bar */}
        <div className="mt-4 p-4 card-washi rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-gold" />
              <span className="text-xs font-mono font-500 text-ink">{xp} XP total</span>
            </div>
            <span className="text-[11px] text-mist font-mono">
              {xpInLevel.current} / {xpInLevel.needed} XP to Lv.{level + 1}
            </span>
          </div>
          <div className="progress-bar h-2">
            <motion.div
              className="progress-fill bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress * 100}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── Stats Row ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
      >
        <StatCard
          icon={Flame}
          label="Current Streak"
          value={`${streak}d`}
          sublabel={`Best: ${longestStreak} days`}
          color={streak > 0 ? 'text-lacquer' : 'text-mist'}
        />
        <StatCard
          icon={Target}
          label="Completion"
          value={`${Math.round(completionRate * 100)}%`}
          sublabel={`${completedLessons.length}/${totalLessons} lessons`}
          color="text-moss"
        />
        <StatCard
          icon={TrendingUp}
          label="Total XP"
          value={xp.toLocaleString()}
          sublabel="Keep earning!"
          color="text-gold"
        />
        <StatCard
          icon={Calendar}
          label="Days to Japan"
          value={daysLeft}
          sublabel="September 2026"
          color="text-mist"
        />
      </motion.div>

      {/* ── Next Lesson CTA ── */}
      {nextLesson && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mb-8"
        >
          <div className="divider-text mb-4">Continue Learning</div>
          <Link
            to={`/learn/${nextLesson.module.id}/${nextLesson.lesson.id}`}
            className="
              card grain-overlay p-5 flex items-center justify-between gap-4
              hover:shadow-lifted transition-shadow duration-300 group
              bg-gradient-to-br from-ink to-ink-soft text-washi
            "
          >
            <div>
              <div className="text-[11px] font-mono text-mist-light mb-1 uppercase tracking-widest">
                {nextLesson.module.title} · Next Lesson
              </div>
              <h3 className="font-display text-xl font-400 text-washi mb-0.5">
                {nextLesson.lesson.title}
              </h3>
              <p className="font-japanese text-sm text-mist-light">
                {nextLesson.lesson.titleJa}
              </p>
            </div>
            <div className="
              w-12 h-12 rounded-xl bg-lacquer flex items-center justify-center shrink-0
              group-hover:scale-110 transition-transform duration-300 ease-spring
            ">
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>
        </motion.div>
      )}

      {/* ── Curriculum overview ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      >
        <div className="divider-text mb-4">Curriculum</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {curriculum.map((module, i) => (
            <ModuleProgressCard
              key={module.id}
              module={module}
              progress={getModuleProgress(module.id)}
              index={i}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
