/**
 * Profile.jsx
 * User stats, achievements, and data management (export/import).
 */

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  Upload,
  Trash2,
  CheckCircle,
  AlertCircle,
  Flame,
  Zap,
  Award,
  BookOpen,
} from 'lucide-react'
import { useLearning } from '../context/LearningContext'

export default function Profile() {
  const {
    xp,
    level,
    streak,
    longestStreak,
    completedLessons,
    totalLessons,
    achievements,
    createdAt,
    exportData,
    importData,
    resetProgress,
    levelProgress,
  } = useLearning()

  const fileInputRef = useRef(null)
  const [importStatus, setImportStatus] = useState(null) // null | 'success' | 'error'
  const [importMsg, setImportMsg] = useState('')

  const handleExport = () => {
    const result = exportData()
    if (!result.success) {
      alert('Export failed. Please try again.')
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImportStatus(null)
    try {
      const result = await importData(file)
      setImportStatus('success')
      setImportMsg(`Imported ${result.completedLessons} completed lessons and ${result.xp} XP.`)
    } catch (err) {
      setImportStatus('error')
      setImportMsg(err.error ?? 'Unknown error. Is this a valid N5Lab file?')
    }
    // Reset file input
    e.target.value = ''
  }

  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Today'

  const statItems = [
    { label: 'Total XP', value: xp.toLocaleString(), icon: Zap, color: 'text-gold' },
    { label: 'Level', value: level, icon: Award, color: 'text-gold' },
    { label: 'Streak', value: `${streak}d`, icon: Flame, color: 'text-lacquer' },
    { label: 'Best Streak', value: `${longestStreak}d`, icon: Flame, color: 'text-mist' },
    { label: 'Lessons Done', value: `${completedLessons.length}/${totalLessons}`, icon: BookOpen, color: 'text-moss' },
    { label: 'Achievements', value: achievements.length, icon: Award, color: 'text-mist' },
  ]

  return (
    <div className="py-6 md:py-8 max-w-2xl">
      <h1 className="font-display text-3xl font-300 text-ink mb-1">Profile</h1>
      <p className="text-mist text-sm mb-8">プロフィール — Member since {memberSince}</p>

      {/* Level card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-ink grain-overlay rounded-2xl p-6 mb-6 flex items-center gap-5"
      >
        <div className="w-16 h-16 rounded-2xl border-2 border-gold flex items-center justify-center shadow-glow-gold">
          <span className="font-mono text-2xl font-500 text-gold">{level}</span>
        </div>
        <div className="flex-1">
          <div className="text-washi font-display text-xl font-400 mb-1">Level {level} Learner</div>
          <div className="text-mist-light text-sm mb-3">{xp.toLocaleString()} XP earned</div>
          <div className="progress-bar bg-ink-soft h-1.5">
            <motion.div
              className="h-full rounded-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress * 100}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {statItems.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 + 0.1, duration: 0.3 }}
            className="card p-3 flex flex-col items-center text-center gap-1"
          >
            <Icon size={16} className={color} />
            <div className="font-display text-lg font-600 text-ink">{value}</div>
            <div className="text-[10px] text-mist font-body">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── Data Management ── */}
      <div>
        <div className="divider-text mb-4">Data & Progress</div>

        <div className="space-y-3">
          {/* Export */}
          <div className="card p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-500 text-ink mb-0.5">Export Progress</div>
              <div className="text-xs text-mist">
                Download a JSON backup of all your progress. Use it to transfer to another device.
              </div>
            </div>
            <button onClick={handleExport} className="btn-secondary text-xs px-4 py-2 shrink-0">
              <Download size={14} />
              Export
            </button>
          </div>

          {/* Import */}
          <div className="card p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-500 text-ink mb-0.5">Import Progress</div>
              <div className="text-xs text-mist">
                Restore from a previously exported N5Lab JSON file. This will overwrite your current progress.
              </div>
              {importStatus === 'success' && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-moss">
                  <CheckCircle size={12} /> {importMsg}
                </div>
              )}
              {importStatus === 'error' && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-lacquer">
                  <AlertCircle size={12} /> {importMsg}
                </div>
              )}
            </div>
            <button onClick={handleImportClick} className="btn-secondary text-xs px-4 py-2 shrink-0">
              <Upload size={14} />
              Import
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Reset */}
          <div className="card p-4 flex items-center justify-between gap-4 border-lacquer/20">
            <div>
              <div className="text-sm font-500 text-lacquer mb-0.5">Reset All Progress</div>
              <div className="text-xs text-mist">
                Permanently delete all XP, lessons, and streaks. Cannot be undone.
              </div>
            </div>
            <button
              onClick={resetProgress}
              className="btn text-xs px-4 py-2 shrink-0 bg-lacquer-muted text-lacquer-dark hover:bg-lacquer hover:text-white transition-colors duration-200"
            >
              <Trash2 size={14} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
