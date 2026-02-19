/**
 * Dictionary.jsx
 * Searchable N5 vocabulary reference. (Task 2 will flesh this out fully.)
 */

import React from 'react'
import { Search } from 'lucide-react'

export default function Dictionary() {
  return (
    <div className="py-6 md:py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-300 text-ink mb-1">Dictionary</h1>
      <p className="text-mist text-sm mb-8">辞書 — N5 vocabulary reference</p>

      <div className="card p-8 flex flex-col items-center justify-center text-center gap-4 min-h-64">
        <div className="w-14 h-14 rounded-2xl bg-washi-soft flex items-center justify-center">
          <Search size={24} className="text-mist" />
        </div>
        <div>
          <h3 className="font-display text-xl font-400 text-ink mb-1">Coming in Task 2</h3>
          <p className="text-mist text-sm max-w-xs">
            Full searchable N5 vocabulary dictionary with kanji, romaji, audio, and example sentences.
          </p>
        </div>
      </div>
    </div>
  )
}
