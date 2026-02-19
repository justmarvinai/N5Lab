/**
 * components/ui/XPPopup.jsx
 * Animated floating "+XP" popup that appears after rewards.
 * Uses AnimatePresence so it can be triggered imperatively.
 */

import React, { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Zap } from 'lucide-react'

/** Hook that manages popup state and provides a trigger function */
export function useXPPopup() {
  const [popups, setPopups] = useState([])

  const triggerXP = useCallback((amount, label = '') => {
    const id = Date.now() + Math.random()
    setPopups((prev) => [...prev, { id, amount, label }])
    // Auto-remove after animation
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id))
    }, 1400)
  }, [])

  return { popups, triggerXP }
}

/** Render this component overlaid on your screen */
export function XPPopupLayer({ popups }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {popups.map((popup) => (
          <motion.div
            key={popup.id}
            initial={{ opacity: 0, y: 0, x: '-50%', scale: 0.6 }}
            animate={{ opacity: 1, y: -80, scale: 1 }}
            exit={{ opacity: 0, y: -120, scale: 0.8 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-32 left-1/2"
          >
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink shadow-lifted border border-gold/30">
              <Zap size={14} className="text-gold fill-gold" />
              <span className="font-mono text-sm font-500 text-gold">+{popup.amount} XP</span>
              {popup.label && (
                <span className="text-washi/60 text-xs">{popup.label}</span>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
