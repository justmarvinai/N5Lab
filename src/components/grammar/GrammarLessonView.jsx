/**
 * components/grammar/GrammarLessonView.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Grammar lesson: explanation → examples → quiz.
 * Uses a 2-phase flow: Study → Quiz.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronRight, ChevronLeft, BookOpen,
  CheckCircle2, AlertTriangle, Lightbulb, ArrowRight,
} from 'lucide-react'
import { grammarLessons } from '../../data/grammarLessons'
import QuizEngine from '../quiz/QuizEngine'

// Simple markdown renderer (bold, italic, inline code, blockquote, newlines)
function SimpleMarkdown({ text }) {
  if (!text) return null
  const lines = text.trim().split('\n')
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />
        if (line.startsWith('## ')) return <h2 key={i} className="font-display text-xl font-500 text-ink mt-4 mb-1">{line.slice(3)}</h2>
        if (line.startsWith('### ')) return <h3 key={i} className="font-display text-base font-500 text-ink mt-3 mb-0.5">{line.slice(4)}</h3>
        if (line.startsWith('> ')) return (
          <blockquote key={i} className="border-l-2 border-lacquer pl-3 py-1 text-sm text-ink-muted italic">
            <InlineMarkdown text={line.slice(2)} />
          </blockquote>
        )
        if (line.startsWith('| ') || line.startsWith('|--')) return null // skip table lines
        if (line.startsWith('- ') || line.startsWith('* ')) return (
          <div key={i} className="flex gap-2 text-sm text-ink-muted">
            <span className="text-lacquer mt-1 shrink-0">·</span>
            <InlineMarkdown text={line.slice(2)} />
          </div>
        )
        return <p key={i} className="text-sm text-ink-muted leading-relaxed"><InlineMarkdown text={line} /></p>
      })}
    </div>
  )
}

function InlineMarkdown({ text }) {
  // Bold, italic, code
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="text-ink font-500">{part.slice(2, -2)}</strong>
        if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
        if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="font-mono text-xs bg-washi-soft px-1.5 py-0.5 rounded text-lacquer">{part.slice(1, -1)}</code>
        return part
      })}
    </>
  )
}

// ─── Example card with colour-coded breakdown ────────────────────────────────

function ExampleCard({ example, index }) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="card p-4 space-y-3"
    >
      {/* Japanese + reading */}
      <div>
        <p className="font-japanese text-xl text-ink leading-relaxed">
          {example.highlight
            ? example.japanese.split(example.highlight).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-lacquer border-b-2 border-lacquer">{example.highlight}</span>
                  )}
                </React.Fragment>
              ))
            : example.japanese}
        </p>
        {example.reading && example.reading !== example.japanese && (
          <p className="font-japanese text-sm text-mist mt-0.5">{example.reading}</p>
        )}
      </div>
      <p className="text-sm text-ink-muted italic">{example.english}</p>

      {/* Breakdown toggle */}
      {example.breakdown && (
        <>
          <button
            onClick={() => setShowBreakdown((v) => !v)}
            className="text-xs text-mist hover:text-ink flex items-center gap-1 transition-colors"
          >
            <ChevronRight size={12} className={`transition-transform ${showBreakdown ? 'rotate-90' : ''}`} />
            {showBreakdown ? 'Hide' : 'Show'} breakdown
          </button>
          <AnimatePresence>
            {showBreakdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pt-2">
                  {example.breakdown.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5 px-3 py-2 bg-washi-soft rounded-xl text-center">
                      <span className="font-japanese text-base text-ink">{item.fragment}</span>
                      <span className="text-[10px] font-mono text-lacquer uppercase tracking-wide">{item.role}</span>
                      {item.note && <span className="text-[9px] text-mist max-w-24 text-center leading-tight">{item.note}</span>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}

// ─── Main Grammar Lesson View ──────────────────────────────────────────────────

export default function GrammarLessonView({ lesson, module, onComplete, onExit }) {
  const grammarLesson = useMemo(
    () => grammarLessons.find((l) => l.id === lesson.id),
    [lesson.id]
  )

  const [phase, setPhase] = useState('study') // 'study' | 'quiz'
  const [studyTab, setStudyTab] = useState('explanation') // 'explanation' | 'examples' | 'keypoints'

  if (!grammarLesson) {
    return (
      <div className="min-h-screen bg-washi flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-washi-warm bg-white">
          <button onClick={onExit} className="btn-ghost p-2 -ml-2"><X size={18} /></button>
          <div className="ml-3 text-sm font-500 text-ink">{lesson.title}</div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-mist text-sm">Grammar content coming soon.</p>
        </div>
      </div>
    )
  }

  if (phase === 'quiz') {
    return (
      <QuizEngine
        questions={grammarLesson.quizQuestions}
        title={`${grammarLesson.title} · Quiz`}
        onComplete={onComplete}
        onExit={() => setPhase('study')}
      />
    )
  }

  const tabs = ['explanation', 'examples', 'keypoints']

  return (
    <div className="min-h-screen bg-washi flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-washi-warm bg-white sticky top-0 z-20">
        <button onClick={onExit} className="btn-ghost p-2 -ml-2"><X size={18} /></button>
        <div className="text-center">
          <div className="text-sm font-500 text-ink">{grammarLesson.title}</div>
          <div className="text-[10px] text-mist font-japanese">{grammarLesson.titleJa}</div>
        </div>
        <div className="w-10" />
      </div>

      {/* Tab nav */}
      <div className="flex border-b border-washi-warm bg-white px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setStudyTab(tab)}
            className={`
              flex-1 py-3 text-xs font-500 capitalize transition-colors duration-200 relative
              ${studyTab === tab ? 'text-ink' : 'text-mist hover:text-ink-muted'}
            `}
          >
            {tab}
            {studyTab === tab && (
              <motion.div
                layoutId="grammar-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-lacquer rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {studyTab === 'explanation' && (
            <motion.div key="exp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {grammarLesson.taeKimRef && (
                <div className="flex items-center gap-2 text-[11px] text-mist mb-4 px-3 py-2 bg-washi-soft rounded-xl">
                  <BookOpen size={12} />
                  Tae Kim's Guide: {grammarLesson.taeKimRef}
                </div>
              )}
              <SimpleMarkdown text={grammarLesson.explanation} />
            </motion.div>
          )}

          {studyTab === 'examples' && (
            <motion.div key="ex" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              <p className="text-xs text-mist mb-4">Tap "Show breakdown" to analyse each sentence.</p>
              {grammarLesson.examples.map((ex, i) => (
                <ExampleCard key={i} example={ex} index={i} />
              ))}
            </motion.div>
          )}

          {studyTab === 'keypoints' && (
            <motion.div key="kp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="space-y-3 mb-6">
                <h3 className="text-xs font-mono text-mist uppercase tracking-widest mb-3">Key Points</h3>
                {grammarLesson.keyPoints.map((pt, i) => (
                  <div key={i} className="flex gap-3 items-start card p-3.5">
                    <CheckCircle2 size={14} className="text-moss shrink-0 mt-0.5" />
                    <p className="text-sm text-ink"><InlineMarkdown text={pt} /></p>
                  </div>
                ))}
              </div>
              {grammarLesson.commonMistakes && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono text-mist uppercase tracking-widest mb-3">Common Mistakes</h3>
                  {grammarLesson.commonMistakes.map((m, i) => (
                    <div key={i} className="flex gap-3 items-start card p-3.5 border-lacquer/20">
                      <AlertTriangle size={14} className="text-lacquer shrink-0 mt-0.5" />
                      <p className="text-sm text-ink-muted"><InlineMarkdown text={m} /></p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Start quiz CTA */}
      <div className="sticky bottom-0 bg-white border-t border-washi-warm px-4 py-4 pb-safe">
        <button
          onClick={() => setPhase('quiz')}
          className="btn-primary w-full py-3.5 text-base gap-2"
        >
          <Lightbulb size={16} />
          Take the Quiz
          <span className="text-xs opacity-70 ml-auto">
            {grammarLesson.quizQuestions.length} questions
          </span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}
