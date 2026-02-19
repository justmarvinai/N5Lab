/**
 * pages/Learn.jsx  (UPDATED)
 * ─────────────────────────────────────────────────────────────────────────────
 * Top-level Learn page. Switches between:
 *   • Guided Path (RoadmapPath) — linear progression
 *   • Open Mode (LibraryView) — free-study library
 *
 * Mode is persisted in LearningContext (studyMode state).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, BookOpen } from 'lucide-react'
import { useLearning } from '../context/LearningContext'
import RoadmapPath from '../components/roadmap/RoadmapPath'
import LibraryView from '../components/library/LibraryView'

export default function Learn() {
  const { studyMode, setStudyMode } = useLearning()

  return (
    <div className="py-6 md:py-8">
      {/* Mode toggle header */}
      <div className="flex items-center justify-between mb-6 max-w-3xl">
        <div>
          <h1 className="font-display text-3xl font-300 text-ink">Learn</h1>
          <p className="text-mist text-sm mt-0.5">まなぶ</p>
        </div>

        {/* Toggle pill */}
        <div className="flex items-center p-1 bg-washi-soft rounded-2xl border border-washi-warm shadow-inner-washi">
          {[
            { value: 'guided', label: 'Guided', icon: Map },
            { value: 'open',   label: 'Library', icon: BookOpen },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setStudyMode(value)}
              className={`
                relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-500
                transition-colors duration-200 no-tap-highlight
                ${studyMode === value ? 'text-washi' : 'text-mist hover:text-ink'}
              `}
            >
              {studyMode === value && (
                <motion.div
                  layoutId="mode-bg"
                  className="absolute inset-0 rounded-xl bg-ink shadow-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <Icon size={14} className="relative z-10" />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode description banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={studyMode}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="mb-6 max-w-3xl"
        >
          {studyMode === 'guided' ? (
            <div className="card-washi rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-ink-muted">
              <Map size={14} className="text-lacquer shrink-0" />
              <span>
                <strong className="text-ink">Guided Path</strong> — follow the curriculum in order.
                Complete each stage to unlock the next.
              </span>
            </div>
          ) : (
            <div className="card-washi rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-ink-muted">
              <BookOpen size={14} className="text-gold shrink-0" />
              <span>
                <strong className="text-ink">Open Library</strong> — study any topic freely.
                All lessons available, progress syncs with your guided path.
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={studyMode}
          initial={{ opacity: 0, x: studyMode === 'guided' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {studyMode === 'guided' ? <RoadmapPath /> : <LibraryView />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
