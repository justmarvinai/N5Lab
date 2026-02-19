/**
 * LevelBadge.jsx
 * Small reusable badge showing current level.
 */

import React from 'react'

const sizeMap = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-12 h-12 text-base',
}

export default function LevelBadge({ level, size = 'md', className = '' }) {
  return (
    <div
      className={`
        ${sizeMap[size]}
        rounded-full bg-ink-soft border-2 border-gold
        flex items-center justify-center
        font-mono font-500 text-gold
        shadow-glow-gold
        ${className}
      `}
      title={`Level ${level}`}
    >
      {level}
    </div>
  )
}
