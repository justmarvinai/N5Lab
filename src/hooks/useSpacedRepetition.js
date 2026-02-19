/**
 * hooks/useSpacedRepetition.js
 * ─────────────────────────────────────────────────────────────────────────────
 * SM-2 spaced repetition algorithm implementation.
 * Stores card review data in localStorage under 'n5lab_srs_v1'.
 *
 * Each card record:
 *   { easeFactor, interval, repetitions, nextReview, lastSeen, totalSeen }
 *
 * Quality ratings (matches "Know it" / "Don't know it" UI):
 *   0 = complete blackout (don't know it)
 *   5 = perfect response (know it)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'n5lab_srs_v1'

// Default ease factor per SM-2 spec
const DEFAULT_EASE = 2.5
const MIN_EASE = 1.3

/**
 * Load SRS data from localStorage.
 * @returns {Record<string, CardRecord>}
 */
function loadSRS() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

/**
 * Save SRS data to localStorage.
 */
function saveSRS(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('[SRS] Failed to save:', e)
  }
}

/**
 * SM-2 algorithm — calculates next interval and ease factor.
 * @param {object} card - Current card record
 * @param {number} quality - 0 (fail) to 5 (perfect)
 * @returns {object} Updated card record
 */
function sm2Update(card, quality) {
  const now = Date.now()

  let { easeFactor = DEFAULT_EASE, interval = 0, repetitions = 0 } = card

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) interval = 1
    else if (repetitions === 1) interval = 6
    else interval = Math.round(interval * easeFactor)

    repetitions += 1
  } else {
    // Incorrect — reset
    repetitions = 0
    interval = 1
  }

  // Update ease factor
  easeFactor = Math.max(
    MIN_EASE,
    easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  )

  const nextReview = now + interval * 24 * 60 * 60 * 1000 // days → ms

  return {
    easeFactor,
    interval,
    repetitions,
    nextReview,
    lastSeen: now,
    totalSeen: (card.totalSeen ?? 0) + 1,
  }
}

/**
 * Hook: useSpacedRepetition
 *
 * @param {string[]} cardIds - All card IDs in this deck
 * @param {object} options
 * @param {number} options.sessionSize - Max cards per session (default: 20)
 * @returns SRS state and actions
 */
export function useSpacedRepetition(cardIds = [], { sessionSize = 20 } = {}) {
  const [srsData, setSrsData] = useState(() => loadSRS())

  // Persist whenever srsData changes
  useEffect(() => {
    saveSRS(srsData)
  }, [srsData])

  /**
   * Get cards due for review today, plus new cards up to sessionSize.
   */
  const getDueCards = useCallback(() => {
    const now = Date.now()
    const due = []
    const newCards = []

    for (const id of cardIds) {
      const record = srsData[id]
      if (!record) {
        newCards.push(id)
      } else if (record.nextReview <= now) {
        due.push(id)
      }
    }

    // Mix: prioritise due reviews, then fill with new cards
    const combined = [...due, ...newCards].slice(0, sessionSize)
    return combined
  }, [cardIds, srsData, sessionSize])

  /**
   * Record a card response.
   * @param {string} cardId
   * @param {'know' | 'dont-know'} response
   */
  const recordResponse = useCallback((cardId, response) => {
    const quality = response === 'know' ? 5 : 0
    setSrsData((prev) => {
      const updated = sm2Update(prev[cardId] ?? {}, quality)
      return { ...prev, [cardId]: updated }
    })
  }, [])

  /**
   * Get a card's current SRS stats.
   */
  const getCardStats = useCallback(
    (cardId) => srsData[cardId] ?? null,
    [srsData]
  )

  /**
   * How many cards are due today across this deck.
   */
  const dueCount = cardIds.filter((id) => {
    const r = srsData[id]
    return !r || r.nextReview <= Date.now()
  }).length

  /**
   * Overall mastery: fraction of cards with repetitions >= 3
   */
  const masteryRate = cardIds.length
    ? cardIds.filter((id) => (srsData[id]?.repetitions ?? 0) >= 3).length / cardIds.length
    : 0

  return {
    getDueCards,
    recordResponse,
    getCardStats,
    dueCount,
    masteryRate,
    srsData,
  }
}

export default useSpacedRepetition
