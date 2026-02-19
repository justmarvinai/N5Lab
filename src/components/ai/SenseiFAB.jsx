/**
 * components/ai/SenseiFAB.jsx
 * Floating Action Button — opens the AI Sensei panel.
 * Reads current lesson context from URL params if on a lesson page.
 */

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import ChatSensei from './ChatSensei'
import { CURRICULUM } from '../../context/LearningContext'
import { hasApiKey } from '../../services/aiService'

function useLessonCtx() {
  const { moduleId, lessonId } = useParams()
  if (!moduleId || !lessonId) return null
  const module = CURRICULUM.find(m => m.id === moduleId)
  const lesson = module?.lessons.find(l => l.id === lessonId)
  if (!module || !lesson) return null
  return { moduleTitle: module.title, lessonTitle: lesson.title, lessonType: lesson.lessonType, topic: lesson.titleJa }
}

function SenseiPanel({ isOpen, onClose, lessonContext }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (mobile) */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden"
          />
          {/* Bottom sheet (mobile) */}
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 360, damping: 38 }}
            className="fixed bottom-0 inset-x-0 z-50 h-[86dvh] rounded-t-3xl overflow-hidden shadow-lifted md:hidden"
          >
            <div className="flex justify-center pt-2.5 pb-0 absolute top-0 inset-x-0 pointer-events-none">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <div className="h-full pt-4">
              <ChatSensei lessonContext={lessonContext} onClose={onClose} />
            </div>
          </motion.div>
          {/* Side panel (desktop) */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 360, damping: 38 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[400px] shadow-lifted hidden md:block"
          >
            <ChatSensei lessonContext={lessonContext} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function SenseiFAB() {
  const [open, setOpen] = useState(false)
  const lessonCtx = useLessonCtx()
  const configured = hasApiKey()

  return (
    <>
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Open AI Sensei"
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-30
                   w-14 h-14 rounded-2xl bg-ink border-2 border-gold/40
                   flex items-center justify-center
                   shadow-lifted transition-shadow duration-300 hover:shadow-glow-gold
                   no-tap-highlight"
      >
        {!configured && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-lacquer border-2 border-white" />
        )}
        <span className="font-japanese text-gold text-lg">先</span>
      </motion.button>

      <SenseiPanel isOpen={open} onClose={() => setOpen(false)} lessonContext={lessonCtx} />
    </>
  )
}
