/**
 * types/index.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared TypeScript interfaces for all N5Lab learning content.
 * Import from here: import type { KanaChar, VocabWord, GrammarLesson } from '@/types'
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Kana ─────────────────────────────────────────────────────────────────────

/** A single kana character entry */
export interface KanaChar {
  /** The kana character itself, e.g. "あ" */
  kana: string
  /** Romaji pronunciation, e.g. "a" */
  romaji: string
  /**
   * Optional: the "paired" counterpart in the other script.
   * Hiragana "あ" ↔ Katakana "ア"
   */
  pair?: string
  /**
   * Mnemonic hint to help memorisation.
   * e.g. "Looks like someone sitting in a chair — 'ah!'"
   */
  mnemonic?: string
  /** Audio clip filename (without extension), relative to /public/audio/kana/ */
  audio?: string
}

/** A named row of related kana characters */
export interface KanaRow {
  /** Row label, e.g. "Vowels", "K-Row" */
  label: string
  /** Short Japanese label shown in the UI */
  labelJa: string
  /** Key used to link back to lesson IDs */
  lessonId: string
  characters: KanaChar[]
}

/** Top-level grouping for a kana script */
export interface KanaScript {
  /** "hiragana" or "katakana" */
  id: 'hiragana' | 'katakana'
  label: string
  labelJa: string
  /** Core 46 characters, organised by row */
  basic: KanaRow[]
  /** Voiced / semi-voiced (dakuon / handakuten) variants */
  dakuon: KanaRow[]
  /** Digraphs / combination sounds (e.g. きゃ kya) */
  combinations: KanaRow[]
}

// ─── Vocabulary ───────────────────────────────────────────────────────────────

/** JLPT N5 vocabulary category labels */
export type VocabCategory =
  | 'Greetings'
  | 'Numbers'
  | 'Time'
  | 'Family'
  | 'Food & Drink'
  | 'Transport'
  | 'Directions'
  | 'Shopping'
  | 'Accommodation'
  | 'Body & Health'
  | 'Colors'
  | 'Nature'
  | 'Adjectives'
  | 'Verbs'
  | 'Particles'
  | 'Question Words'
  | 'Places'
  | 'Objects'
  | 'Emotions'
  | 'Emergency'

/** Part of speech for a vocabulary word */
export type PartOfSpeech =
  | 'noun'
  | 'verb-u'       // godan / u-verb
  | 'verb-ru'      // ichidan / ru-verb
  | 'verb-irreg'   // irregular (する, くる)
  | 'i-adj'        // い-adjective
  | 'na-adj'       // な-adjective
  | 'adverb'
  | 'particle'
  | 'conjunction'
  | 'interjection'
  | 'counter'
  | 'expression'
  | 'pronoun'
  | 'prefix'
  | 'suffix'

/** A single example sentence for a vocabulary word */
export interface VocabExample {
  /** Japanese sentence (may include kanji) */
  japanese: string
  /** Kana-only reading of the sentence */
  reading?: string
  /** English translation */
  english: string
}

/** A single N5 vocabulary word */
export interface VocabWord {
  /** Unique identifier, e.g. "v001" */
  id: string
  /** Kanji form (may be identical to kana if no kanji used) */
  kanji: string
  /** Kana reading */
  kana: string
  /** Romaji transliteration */
  romaji: string
  /** Primary English definition */
  english: string
  /** Additional / alternate meanings */
  altMeanings?: string[]
  category: VocabCategory
  pos: PartOfSpeech
  /** JLPT level — always N5 for this file, but typed for future expansion */
  jlpt: 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
  /** Travel relevance 1–5 (5 = most useful for Japan trip) */
  travelPriority: 1 | 2 | 3 | 4 | 5
  examples: VocabExample[]
  /** Tags for filtering, e.g. ["airport", "polite"] */
  tags?: string[]
  /** Audio clip filename (without extension), relative to /public/audio/vocab/ */
  audio?: string
}

// ─── Grammar ──────────────────────────────────────────────────────────────────

/** A single grammar example sentence */
export interface GrammarExample {
  japanese: string
  /** Furigana / kana reading of the Japanese */
  reading?: string
  english: string
  /** Optional breakdown of the sentence structure */
  breakdown?: GrammarBreakdown[]
  /** Highlight which part of the sentence demonstrates the grammar point */
  highlight?: string
}

/** Word-level breakdown used for colour-coded sentence analysis */
export interface GrammarBreakdown {
  /** The Japanese fragment */
  fragment: string
  /** What it is, e.g. "subject", "topic marker", "predicate" */
  role: string
  /** Short explanation */
  note?: string
}

/** Quiz question types */
export type QuizType =
  | 'multiple-choice'   // Pick one correct answer from 4 options
  | 'fill-blank'        // Fill in the blank (typed or selected)
  | 'translate-jp-en'   // Translate Japanese → English
  | 'translate-en-jp'   // Translate English → Japanese
  | 'true-false'        // True / False about a grammar rule
  | 'reorder'           // Drag words into correct order

/** A single quiz question */
export interface QuizQuestion {
  id: string
  type: QuizType
  /** The question prompt shown to the user */
  question: string
  /** For fill-blank: the sentence with ___ where the answer goes */
  sentence?: string
  /** Correct answer(s) — array to allow alternate accepted answers */
  answer: string[]
  /** For multiple-choice: the distractors (wrong options) */
  options?: string[]
  /** Explanation shown after answering */
  explanation: string
  /** XP awarded for correct answer */
  xp: number
}

/** A full grammar lesson */
export interface GrammarLesson {
  /** Unique identifier, e.g. "grammar_wa_desu" — matches curriculum lessonId */
  id: string
  /** Short display title */
  title: string
  /** Japanese title */
  titleJa: string
  /**
   * Markdown-formatted explanation.
   * Supports: **bold**, *italic*, `inline code`, > blockquotes, ## headings.
   * Render with a markdown library or custom parser.
   */
  explanation: string
  /** 2–4 core examples demonstrating the point */
  examples: GrammarExample[]
  /**
   * Key grammar points as bullet strings.
   * Shown as a quick-reference summary card.
   */
  keyPoints: string[]
  /** Common mistakes learners make with this pattern */
  commonMistakes?: string[]
  /** 4–6 quiz questions */
  quizQuestions: QuizQuestion[]
  /** Lesson order within the grammar module */
  order: number
  /** IDs of lessons this one builds on */
  prerequisiteIds?: string[]
  /** Reference to Tae Kim's Guide section (for attribution / further reading) */
  taeKimRef?: string
}

// ─── Shared Utility Types ─────────────────────────────────────────────────────

/** Generic paginated response wrapper (for future API use) */
export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

/** A flashcard derived from either a VocabWord or KanaChar */
export interface Flashcard {
  id: string
  front: string
  back: string
  reading?: string
  hint?: string
  sourceType: 'kana' | 'vocab' | 'grammar'
  sourceId: string
}
