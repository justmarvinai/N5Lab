/**
 * data/dataUtils.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Utility functions for working with N5Lab content data.
 * These are pure functions — no React, no side effects.
 *
 * Includes:
 *   - Flashcard generators (kana, vocab, grammar)
 *   - Quiz sampling and shuffling
 *   - Progress helpers
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { KanaChar, KanaScript, VocabWord, GrammarLesson, Flashcard, QuizQuestion } from '../types'

// ─── Seeded shuffle (Fisher-Yates) ───────────────────────────────────────────

/**
 * Shuffles an array in-place using Fisher-Yates algorithm.
 * Returns the shuffled array (same reference).
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Kana Flashcard Generation ────────────────────────────────────────────────

/**
 * Generate flashcards from a kana script.
 * Front: kana character, Back: romaji
 */
export function generateKanaFlashcards(
  script: KanaScript,
  sections: ('basic' | 'dakuon' | 'combinations')[] = ['basic']
): Flashcard[] {
  const cards: Flashcard[] = []

  for (const section of sections) {
    for (const row of script[section]) {
      for (const char of row.characters) {
        cards.push({
          id: `kana_${script.id}_${char.kana}`,
          front: char.kana,
          back: char.romaji,
          hint: char.mnemonic,
          sourceType: 'kana',
          sourceId: `${script.id}_${char.kana}`,
        })
      }
    }
  }

  return cards
}

/**
 * Generate REVERSE flashcards (romaji → kana).
 * Useful for production/output practice.
 */
export function generateReverseKanaFlashcards(
  script: KanaScript,
  sections: ('basic' | 'dakuon' | 'combinations')[] = ['basic']
): Flashcard[] {
  return generateKanaFlashcards(script, sections).map((card) => ({
    ...card,
    id: `rev_${card.id}`,
    front: card.back,
    back: card.front,
  }))
}

// ─── Vocab Flashcard Generation ───────────────────────────────────────────────

export type VocabFlashcardMode =
  | 'kana-to-english'    // Front: kana, Back: English
  | 'english-to-kana'    // Front: English, Back: kana
  | 'kanji-to-english'   // Front: kanji, Back: English
  | 'english-to-kanji'   // Front: English, Back: kanji + kana reading

/**
 * Generate vocab flashcards from a word list.
 */
export function generateVocabFlashcards(
  words: VocabWord[],
  mode: VocabFlashcardMode = 'kana-to-english'
): Flashcard[] {
  return words.map((word) => {
    let front: string
    let back: string
    let reading: string | undefined
    let hint: string | undefined

    switch (mode) {
      case 'kana-to-english':
        front = word.kana
        back = word.english
        hint = word.romaji
        break
      case 'english-to-kana':
        front = word.english
        back = word.kana
        hint = word.romaji
        break
      case 'kanji-to-english':
        front = word.kanji
        back = word.english
        reading = word.kana
        hint = word.romaji
        break
      case 'english-to-kanji':
        front = word.english
        back = word.kanji
        reading = word.kana
        break
    }

    return {
      id: `vocab_${mode}_${word.id}`,
      front,
      back,
      reading,
      hint,
      sourceType: 'vocab',
      sourceId: word.id,
    }
  })
}

// ─── Quiz Utilities ───────────────────────────────────────────────────────────

/**
 * Sample N quiz questions from a lesson, shuffled.
 */
export function sampleQuizQuestions(
  lesson: GrammarLesson,
  count: number = 5
): QuizQuestion[] {
  return shuffle(lesson.quizQuestions).slice(0, count)
}

/**
 * Generate multiple-choice distractors for a kana quiz.
 * Given the correct romaji, picks N-1 wrong answers from the pool.
 */
export function generateKanaDistractors(
  correct: string,
  pool: KanaChar[],
  count: number = 3
): string[] {
  const wrong = pool
    .map((c) => c.romaji)
    .filter((r) => r !== correct)
  return shuffle(wrong).slice(0, count)
}

/**
 * Generate multiple-choice distractors for vocab quiz.
 * Given the correct word, picks N-1 wrong answers from the pool.
 */
export function generateVocabDistractors(
  correct: VocabWord,
  pool: VocabWord[],
  field: keyof Pick<VocabWord, 'english' | 'kana' | 'romaji'> = 'english',
  count: number = 3
): string[] {
  const wrong = pool
    .filter((w) => w.id !== correct.id)
    .map((w) => w[field] as string)
  return shuffle(wrong).slice(0, count)
}

/**
 * Build a full multiple-choice set: correct answer + distractors, shuffled.
 */
export function buildMultipleChoiceOptions(
  correct: string,
  distractors: string[]
): string[] {
  return shuffle([correct, ...distractors.slice(0, 3)])
}

// ─── Progress Helpers ─────────────────────────────────────────────────────────

/**
 * Given a set of completed lesson IDs, return the next unlocked lesson ID
 * within the given ordered lesson ID list.
 */
export function getNextLessonId(
  orderedLessonIds: string[],
  completedIds: string[]
): string | null {
  for (const id of orderedLessonIds) {
    if (!completedIds.includes(id)) return id
  }
  return null // All completed
}

/**
 * Calculate the percentage of items completed.
 */
export function calcCompletionRate(total: number, completed: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

/**
 * Returns a friendly label for the lesson type.
 */
export function getLessonTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    kana: 'Kana Practice',
    vocab: 'Vocabulary',
    grammar: 'Grammar',
    quiz: 'Quiz',
    listening: 'Listening',
    reading: 'Reading',
  }
  return labels[type] ?? type
}
