/**
 * components/library/LibraryView.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * "Open Mode" free-study library browser.
 * Users can browse any module/lesson without following the guided path.
 *
 * Features:
 *  - Category filter pills
 *  - Search (filters title + description)
 *  - Card grid with mastery indicator
 *  - Quick-launch into FlashCard or Quiz sessions
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, BookOpen, AlignJustify, Star, BookMarked,
  Headphones, Zap, CheckCircle2, ArrowRight, Filter,
} from 'lucide-react'
import { useLearning, CURRICULUM } from '../../context/LearningContext'

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',       label: 'All',         labelJa: 'すべて'   },
  { id: 'hiragana',  label: 'Hiragana',    labelJa: 'ひらがな' },
  { id: 'katakana',  label: 'Katakana',    labelJa: 'カタカナ' },
  { id: 'vocab',     label: 'Vocabulary',  labelJa: '語彙'     },
  { id: 'grammar',   label: 'Grammar',     labelJa: '文法'     },
  { id: 'listening', label: 'Listening',   labelJa: '聴解'     },
  { id: 'reading',   label: 'Reading',     labelJa: '読解'     },
]

const MODULE_COLOR = {
  hiragana:     'bg-lacquer-muted text-lacquer-dark border-lacquer/20',
  katakana:     'bg-mist-soft text-mist border-mist/20',
  vocab_travel: 'bg-gold-muted text-gold-dark border-gold/20',
  grammar_n5:   'bg-moss-muted text-moss border-moss/20',
  listening:    'bg-lacquer-muted text-lacquer-dark border-lacquer/20',
  reading:      'bg-gold-muted text-gold-dark border-gold/20',
}

const MODULE_DOT = {
  hiragana:     'bg-lacquer',
  katakana:     'bg-mist',
  vocab_travel: 'bg-gold',
  grammar_n5:   'bg-moss',
  listening:    'bg-lacquer',
  reading:      'bg-gold',
}

const MODULE_ICONS = {
  hiragana:     BookOpen,
  katakana:     AlignJustify,
  vocab_travel: Star,
  grammar_n5:   BookMarked,
  listening:    Headphones,
  reading:      BookOpen,
}

function categoryMatchesModule(catId, moduleId) {
  if (catId === 'all') return true
  if (catId === 'vocab' && moduleId === 'vocab_travel') return true
  if (catId === 'grammar' && moduleId === 'grammar_n5') return true
  return moduleId === catId || moduleId.startsWith(catId)
}

// ─── Module card ──────────────────────────────────────────────────────────────

function ModuleLibraryCard({ module, progress, index }) {
  const pct = Math.round(progress * 100)
  const colorClass = MODULE_COLOR[module.id] ?? 'bg-washi-soft text-mist border-washi-warm'
  const dotClass = MODULE_DOT[module.id] ?? 'bg-mist'
  const Icon = MODULE_ICONS[module.id] ?? BookOpen

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      layout
    >
      <Link
        to={`/learn/${module.id}`}
        className="card block p-5 hover:shadow-lifted transition-shadow duration-300 group"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${colorClass}`}>
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-600 text-ink leading-tight">{module.title}</h3>
            <span className="font-japanese text-xs text-mist">{module.titleJa}</span>
          </div>
          {pct === 100 && <CheckCircle2 size={16} className="text-moss shrink-0" />}
        </div>

        {/* Lesson count + type badges */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {Array.from(new Set(module.lessons.map((l) => l.lessonType))).map((type) => (
            <span key={type} className="badge badge-mist text-[9px] uppercase tracking-wide">
              {type}
            </span>
          ))}
          <span className="badge badge-mist text-[9px]">{module.lessons.length} lessons</span>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${dotClass}`} />
              <span className="text-[11px] text-mist">Progress</span>
            </div>
            <span className="text-[11px] font-mono text-ink">{pct}%</span>
          </div>
          <div className="progress-bar h-1.5">
            <div className={`h-full rounded-full ${dotClass} transition-all duration-700`} style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-mist group-hover:text-ink transition-colors duration-200">
            {pct === 0 ? 'Not started' : pct === 100 ? 'Completed — review?' : 'Continue studying'}
          </span>
          <ArrowRight
            size={14}
            className="text-mist group-hover:text-ink group-hover:translate-x-1 transition-all duration-200"
          />
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Quick-access lesson row (within a module expansion) ─────────────────────

function LessonRow({ lesson, moduleId, isCompleted }) {
  return (
    <Link
      to={`/learn/${moduleId}/${lesson.id}`}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-washi-soft transition-colors group"
    >
      <div className={`
        w-5 h-5 rounded-full flex items-center justify-center shrink-0
        ${isCompleted ? 'bg-moss text-white' : 'border border-washi-warm text-mist'}
      `}>
        {isCompleted ? <CheckCircle2 size={11} /> : null}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm text-ink group-hover:text-ink-soft">{lesson.title}</span>
      </div>
      <span className="text-[9px] font-mono text-mist badge badge-mist">{lesson.lessonType}</span>
    </Link>
  )
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function LibraryStats({ curriculum, completedLessons }) {
  const totalLessons = curriculum.reduce((a, m) => a + m.lessons.length, 0)
  const completedModules = curriculum.filter((m) =>
    m.lessons.every((l) => completedLessons.includes(l.id))
  ).length

  return (
    <div className="grid grid-cols-3 gap-3 mb-6">
      {[
        { label: 'Modules', value: `${completedModules}/${curriculum.length}`, icon: BookOpen },
        { label: 'Lessons', value: `${completedLessons.length}/${totalLessons}`, icon: CheckCircle2 },
        { label: 'Completion', value: `${Math.round(completedLessons.length / totalLessons * 100)}%`, icon: Zap },
      ].map(({ label, value, icon: Icon }) => (
        <div key={label} className="card-washi rounded-xl p-3 flex flex-col items-center text-center gap-1">
          <Icon size={14} className="text-mist" />
          <div className="font-display text-lg font-600 text-ink">{value}</div>
          <div className="text-[10px] text-mist">{label}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Main LibraryView ─────────────────────────────────────────────────────────

export default function LibraryView() {
  const { completedLessons, getModuleProgress, setStudyMode } = useLearning()
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Ensure open mode is active
  React.useEffect(() => { setStudyMode('open') }, [setStudyMode])

  const filteredModules = useMemo(() => {
    return CURRICULUM.filter((module) => {
      const matchesCategory = categoryMatchesModule(activeCategory, module.id)
      const matchesSearch = !searchQuery ||
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.titleJa.includes(searchQuery) ||
        module.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.lessons.some((l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.titleJa.includes(searchQuery)
        )
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="py-6 md:py-8 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display text-3xl font-300 text-ink">Library</h1>
          <span className="badge badge-mist text-[10px] mt-1">Open Mode</span>
        </div>
        <p className="text-mist text-sm">ライブラリ — Study anything, anytime</p>
      </div>

      {/* Stats */}
      <LibraryStats curriculum={CURRICULUM} completedLessons={completedLessons} />

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mist" />
        <input
          type="text"
          placeholder="Search lessons, topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full pl-10 pr-4 py-3 rounded-2xl border border-washi-warm bg-white
            text-sm text-ink placeholder:text-mist
            focus:outline-none focus:ring-2 focus:ring-lacquer/30 focus:border-lacquer/50
            transition-all duration-200
          "
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-ink"
          >
            ×
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-500 whitespace-nowrap
              transition-all duration-200 shrink-0
              ${activeCategory === cat.id
                ? 'bg-ink text-washi shadow-sm'
                : 'bg-washi-soft text-mist hover:text-ink hover:bg-washi-warm border border-washi-warm'
              }
            `}
          >
            <span>{cat.label}</span>
            <span className="font-japanese opacity-70">{cat.labelJa}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      <AnimatePresence mode="popLayout">
        {filteredModules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-mist"
          >
            <Filter size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No modules match your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all') }}
              className="btn-ghost text-xs mt-3"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {filteredModules.map((module, i) => (
              <ModuleLibraryCard
                key={module.id}
                module={module}
                progress={getModuleProgress(module.id)}
                index={i}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open mode note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-[11px] text-mist mt-8 font-body"
      >
        Open Mode — all lessons accessible · progress syncs with Guided Path
      </motion.p>
    </div>
  )
}
