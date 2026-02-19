/**
 * components/ui/StreakFlame.jsx
 * Animated flame icon that pulses based on streak length.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

export default function StreakFlame({ streak = 0, size = 'md' }) {
  const sizes = { sm: 16, md: 22, lg: 32 }
  const px = sizes[size] ?? 22
  const active = streak > 0

  return (
    <motion.div
      animate={active ? { scale: [1, 1.12, 1] } : {}}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center gap-1"
    >
      <Flame
        size={px}
        strokeWidth={active ? 2 : 1.5}
        className={active ? 'text-lacquer fill-lacquer/40' : 'text-mist'}
      />
      {streak > 0 && (
        <span className="font-mono font-500 text-lacquer text-sm">{streak}</span>
      )}
    </motion.div>
  )
}
