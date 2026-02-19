/**
 * data/index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Barrel export for all N5Lab learning content.
 *
 * Usage:
 *   import { hiragana, katakana } from '@/data'
 *   import { n5Vocab, searchVocab, vocabByCategory } from '@/data'
 *   import { grammarLessons, getGrammarLessonById } from '@/data'
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Kana ──────────────────────────────────────────────────────────────────────
export {
  hiragana,
  katakana,
  kanaData,
  allHiraganaBasic,
  allKatakanaBasic,
} from './kanaData'

// ── Vocabulary ────────────────────────────────────────────────────────────────
export {
  n5Vocab,
  vocabByCategory,
  vocabByTravelPriority,
  getVocabById,
  searchVocab,
  default as vocabDefault,
} from './n5Vocab'

// ── Grammar ───────────────────────────────────────────────────────────────────
export {
  grammarLessons,
  getGrammarLessonById,
  getAllQuizQuestions,
  default as grammarDefault,
} from './grammarLessons'

// ── Types (re-export for convenience) ────────────────────────────────────────
export type {
  KanaChar,
  KanaRow,
  KanaScript,
  VocabWord,
  VocabCategory,
  VocabExample,
  PartOfSpeech,
  GrammarLesson,
  GrammarExample,
  GrammarBreakdown,
  QuizQuestion,
  QuizType,
  Flashcard,
} from '../types'
