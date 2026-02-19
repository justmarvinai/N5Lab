/**
 * LearningContext.jsx
 * ─────────────────────────────────────────────────────────────────
 * Central state management for N5Lab.
 * Handles: XP, Levels, Streaks, Completed lessons, Settings.
 * Persistence: 100% localStorage, with export/import utilities.
 * ─────────────────────────────────────────────────────────────────
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'n5lab_progress_v1'

/**
 * XP required to reach each level.
 * Level 1 = 0 XP, Level 2 = 100 XP, etc.
 */
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3300,
  4000, 4800, 5700, 6700, 7800, 9000, 10300, 11700, 13200, 15000,
]

export const MAX_LEVEL = LEVEL_THRESHOLDS.length

// ─── XP Rewards ───────────────────────────────────────────────────────────────

export const XP_REWARDS = {
  COMPLETE_LESSON: 20,
  PERFECT_QUIZ: 50,
  FIRST_LESSON_OF_DAY: 15,
  STREAK_BONUS_PER_DAY: 5,    // multiplied by streak length (capped at 7)
  UNLOCK_MODULE: 10,
  REVIEW_SESSION: 10,
}

// ─── Module / Curriculum Definition ──────────────────────────────────────────

/**
 * Ordered curriculum.
 * Each module has lessons; lessons have a unique `id`.
 * Lesson IDs follow: [module_slug]_[lesson_slug]
 */
export const CURRICULUM = [
  {
    id: 'hiragana',
    title: 'Hiragana',
    titleJa: 'ひらがな',
    description: 'The first 46 characters — the foundation of everything.',
    color: 'lacquer',
    order: 1,
    lessons: [
      { id: 'hiragana_vowels', title: 'Vowels', titleJa: 'あいうえお', lessonType: 'kana' },
      { id: 'hiragana_k', title: 'K-Row', titleJa: 'かきくけこ', lessonType: 'kana' },
      { id: 'hiragana_s', title: 'S-Row', titleJa: 'さしすせそ', lessonType: 'kana' },
      { id: 'hiragana_t', title: 'T-Row', titleJa: 'たちつてと', lessonType: 'kana' },
      { id: 'hiragana_n', title: 'N-Row', titleJa: 'なにぬねの', lessonType: 'kana' },
      { id: 'hiragana_h', title: 'H-Row', titleJa: 'はひふへほ', lessonType: 'kana' },
      { id: 'hiragana_m', title: 'M-Row', titleJa: 'まみむめも', lessonType: 'kana' },
      { id: 'hiragana_y', title: 'Y-Row', titleJa: 'やゆよ', lessonType: 'kana' },
      { id: 'hiragana_r', title: 'R-Row', titleJa: 'らりるれろ', lessonType: 'kana' },
      { id: 'hiragana_w', title: 'W-Row + ん', titleJa: 'わをん', lessonType: 'kana' },
      { id: 'hiragana_dakuten', title: 'Dakuten & Handakuten', titleJa: 'がざだばぱ...', lessonType: 'kana' },
      { id: 'hiragana_combo', title: 'Combination Sounds', titleJa: 'きゃきゅきょ...', lessonType: 'kana' },
      { id: 'hiragana_quiz', title: 'Full Hiragana Quiz', titleJa: 'テスト', lessonType: 'quiz' },
    ],
  },
  {
    id: 'katakana',
    title: 'Katakana',
    titleJa: 'カタカナ',
    description: 'Foreign words, menus, and modern Japanese.',
    color: 'mist',
    order: 2,
    lessons: [
      { id: 'katakana_vowels', title: 'Vowels', titleJa: 'アイウエオ', lessonType: 'kana' },
      { id: 'katakana_k', title: 'K-Row', titleJa: 'カキクケコ', lessonType: 'kana' },
      { id: 'katakana_s', title: 'S-Row', titleJa: 'サシスセソ', lessonType: 'kana' },
      { id: 'katakana_t', title: 'T-Row', titleJa: 'タチツテト', lessonType: 'kana' },
      { id: 'katakana_n', title: 'N-Row', titleJa: 'ナニヌネノ', lessonType: 'kana' },
      { id: 'katakana_h', title: 'H-Row', titleJa: 'ハヒフヘホ', lessonType: 'kana' },
      { id: 'katakana_m', title: 'M-Row', titleJa: 'マミムメモ', lessonType: 'kana' },
      { id: 'katakana_y', title: 'Y-Row', titleJa: 'ヤユヨ', lessonType: 'kana' },
      { id: 'katakana_r', title: 'R-Row', titleJa: 'ラリルレロ', lessonType: 'kana' },
      { id: 'katakana_w', title: 'W-Row + ン', titleJa: 'ワヲン', lessonType: 'kana' },
      { id: 'katakana_dakuten', title: 'Dakuten & Extensions', titleJa: 'ガザダバパ...', lessonType: 'kana' },
      { id: 'katakana_quiz', title: 'Full Katakana Quiz', titleJa: 'テスト', lessonType: 'quiz' },
    ],
  },
  {
    id: 'vocab_travel',
    title: 'Travel Vocabulary',
    titleJa: '旅行語彙',
    description: 'Essential words for your trip — airports, trains, hotels.',
    color: 'gold',
    order: 3,
    lessons: [
      { id: 'vocab_greetings', title: 'Greetings & Politeness', titleJa: 'あいさつ', lessonType: 'vocab' },
      { id: 'vocab_numbers', title: 'Numbers & Counting', titleJa: '数字', lessonType: 'vocab' },
      { id: 'vocab_transport', title: 'Transport', titleJa: '交通', lessonType: 'vocab' },
      { id: 'vocab_food', title: 'Food & Ordering', titleJa: '食べ物', lessonType: 'vocab' },
      { id: 'vocab_shopping', title: 'Shopping', titleJa: 'かいもの', lessonType: 'vocab' },
      { id: 'vocab_directions', title: 'Directions & Places', titleJa: 'ばしょ', lessonType: 'vocab' },
      { id: 'vocab_hotel', title: 'Hotel & Accommodation', titleJa: 'ホテル', lessonType: 'vocab' },
      { id: 'vocab_emergency', title: 'Emergency Phrases', titleJa: 'きんきゅう', lessonType: 'vocab' },
    ],
  },
  {
    id: 'grammar_n5',
    title: 'N5 Grammar',
    titleJa: '文法 N5',
    description: 'Core sentence patterns to express yourself.',
    color: 'moss',
    order: 4,
    lessons: [
      { id: 'grammar_wa_desu', title: '〜は〜です', titleJa: 'Identity & State', lessonType: 'grammar' },
      { id: 'grammar_ka', title: 'Question Particle か', titleJa: 'Questions', lessonType: 'grammar' },
      { id: 'grammar_no', title: 'Possession の', titleJa: 'Possession', lessonType: 'grammar' },
      { id: 'grammar_ni_de', title: 'に & で Particles', titleJa: 'Location & Means', lessonType: 'grammar' },
      { id: 'grammar_te_form', title: 'Te-form', titleJa: 'て-form', lessonType: 'grammar' },
      { id: 'grammar_past', title: 'Past Tense', titleJa: 'Past tense', lessonType: 'grammar' },
      { id: 'grammar_adjectives', title: 'い & な Adjectives', titleJa: 'Adjectives', lessonType: 'grammar' },
      { id: 'grammar_quiz', title: 'Grammar Review Quiz', titleJa: '文法テスト', lessonType: 'quiz' },
    ],
  },
  {
    id: 'listening',
    title: 'Listening & Speaking',
    titleJa: 'ちょうかい',
    description: 'Real-world dialogues and pronunciation practice.',
    color: 'lacquer',
    order: 5,
    lessons: [
      { id: 'listening_intro', title: 'Japanese Sounds', titleJa: '音', lessonType: 'listening' },
      { id: 'listening_airport', title: 'At the Airport', titleJa: 'くうこう', lessonType: 'listening' },
      { id: 'listening_restaurant', title: 'At the Restaurant', titleJa: 'レストラン', lessonType: 'listening' },
      { id: 'listening_station', title: 'At the Station', titleJa: 'えき', lessonType: 'listening' },
      { id: 'listening_shopping', title: 'Shopping Dialogue', titleJa: 'かいもの', lessonType: 'listening' },
    ],
  },
  {
    id: 'reading',
    title: 'Reading Practice',
    titleJa: 'どっかい',
    description: 'Signs, menus, and simple texts in the wild.',
    color: 'gold',
    order: 6,
    lessons: [
      { id: 'reading_signs', title: 'Common Signs', titleJa: 'かんばん', lessonType: 'reading' },
      { id: 'reading_menus', title: 'Reading Menus', titleJa: 'メニュー', lessonType: 'reading' },
      { id: 'reading_texts', title: 'Short Paragraphs', titleJa: 'ぶんしょう', lessonType: 'reading' },
      { id: 'reading_n5_exam', title: 'N5 Practice Exam', titleJa: 'N5 テスト', lessonType: 'quiz' },
    ],
  },
]

// ─── Helper Functions ─────────────────────────────────────────────────────────

/** Calculate level from total XP */
export function getLevelFromXP(xp) {
  let level = 1
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1
    else break
  }
  return Math.min(level, MAX_LEVEL)
}

/** Get XP needed for the NEXT level */
export function getXPForNextLevel(level) {
  if (level >= MAX_LEVEL) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  return LEVEL_THRESHOLDS[level] // level is 1-indexed, thresholds 0-indexed
}

/** Get XP progress within current level (0–1) */
export function getLevelProgress(xp) {
  const level = getLevelFromXP(xp)
  if (level >= MAX_LEVEL) return 1
  const currentLevelXP = LEVEL_THRESHOLDS[level - 1]
  const nextLevelXP = LEVEL_THRESHOLDS[level]
  return (xp - currentLevelXP) / (nextLevelXP - currentLevelXP)
}

/** Get today's date string (YYYY-MM-DD) */
function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

/** Get yesterday's date string */
function getYesterdayStr() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

/** Calculate total lessons across curriculum */
export function getTotalLessons() {
  return CURRICULUM.reduce((acc, module) => acc + module.lessons.length, 0)
}

// ─── Initial State ─────────────────────────────────────────────────────────────

function createInitialState() {
  return {
    // Progress
    xp: 0,
    completedLessons: [],     // Array of lesson IDs
    lessonScores: {},         // { lessonId: { score: 0-100, completedAt: ISO, attempts: 1 } }

    // Streak tracking
    streak: 0,
    longestStreak: 0,
    lastActiveDate: null,     // 'YYYY-MM-DD'
    activeDates: [],          // Array of 'YYYY-MM-DD' strings (for heatmap)

    // Gamification
    achievements: [],         // Array of achievement IDs
    studyMode: 'guided',      // 'guided' | 'open'

    // Meta
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    version: 1,
  }
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

function learningReducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...action.payload }

    case 'COMPLETE_LESSON': {
      const { lessonId, score = 100, xpEarned = XP_REWARDS.COMPLETE_LESSON } = action.payload
      const alreadyCompleted = state.completedLessons.includes(lessonId)
      const newCompletedLessons = alreadyCompleted
        ? state.completedLessons
        : [...state.completedLessons, lessonId]

      const existingScore = state.lessonScores[lessonId]
      const newLessonScores = {
        ...state.lessonScores,
        [lessonId]: {
          score: existingScore ? Math.max(existingScore.score, score) : score,
          lastScore: score,
          completedAt: existingScore?.completedAt ?? new Date().toISOString(),
          lastAttemptAt: new Date().toISOString(),
          attempts: (existingScore?.attempts ?? 0) + 1,
        },
      }

      const newXP = state.xp + (alreadyCompleted ? Math.floor(xpEarned * 0.3) : xpEarned)

      return {
        ...state,
        xp: newXP,
        completedLessons: newCompletedLessons,
        lessonScores: newLessonScores,
        lastUpdated: new Date().toISOString(),
      }
    }

    case 'AWARD_XP': {
      return {
        ...state,
        xp: state.xp + action.payload.amount,
        lastUpdated: new Date().toISOString(),
      }
    }

    case 'UPDATE_STREAK': {
      const today = getTodayStr()
      const yesterday = getYesterdayStr()

      if (state.lastActiveDate === today) {
        // Already logged in today, no streak change
        return state
      }

      let newStreak
      if (state.lastActiveDate === yesterday) {
        // Continuing streak
        newStreak = state.streak + 1
      } else if (state.lastActiveDate === null || state.lastActiveDate < yesterday) {
        // Broken streak or first login
        newStreak = 1
      } else {
        newStreak = state.streak
      }

      // Streak bonus XP (capped at 7 days)
      const streakBonus = Math.min(newStreak, 7) * XP_REWARDS.STREAK_BONUS_PER_DAY

      const newActiveDates = state.activeDates.includes(today)
        ? state.activeDates
        : [...state.activeDates, today]

      return {
        ...state,
        streak: newStreak,
        longestStreak: Math.max(state.longestStreak, newStreak),
        lastActiveDate: today,
        activeDates: newActiveDates,
        xp: state.xp + streakBonus,
        lastUpdated: new Date().toISOString(),
      }
    }

    case 'UNLOCK_ACHIEVEMENT': {
      const { achievementId } = action.payload
      if (state.achievements.includes(achievementId)) return state
      return {
        ...state,
        achievements: [...state.achievements, achievementId],
        lastUpdated: new Date().toISOString(),
      }
    }

    case 'SET_STUDY_MODE': {
      return { ...state, studyMode: action.payload.mode }
    }

    case 'RESET_PROGRESS': {
      return createInitialState()
    }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const LearningContext = createContext(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LearningProvider({ children }) {
  const [state, dispatch] = useReducer(learningReducer, null, createInitialState)

  // ── Load from localStorage on mount ──────────────────────────────────────

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw)
        // Basic version/schema guard
        if (saved && saved.version === 1) {
          dispatch({ type: 'HYDRATE', payload: saved })
        }
      }
    } catch (err) {
      console.warn('[N5Lab] Failed to load progress from localStorage:', err)
    }
  }, [])

  // ── Save to localStorage whenever state changes ───────────────────────────

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (err) {
      console.warn('[N5Lab] Failed to save progress to localStorage:', err)
    }
  }, [state])

  // ── Update streak on mount (daily login) ─────────────────────────────────

  useEffect(() => {
    dispatch({ type: 'UPDATE_STREAK' })
  }, []) // Only on mount (first render of the day)

  // ─── Derived / Computed Values ──────────────────────────────────────────

  const level = useMemo(() => getLevelFromXP(state.xp), [state.xp])
  const levelProgress = useMemo(() => getLevelProgress(state.xp), [state.xp])
  const xpForNextLevel = useMemo(() => getXPForNextLevel(level), [level])
  const totalLessons = useMemo(() => getTotalLessons(), [])
  const completionRate = useMemo(
    () => (totalLessons > 0 ? state.completedLessons.length / totalLessons : 0),
    [state.completedLessons.length, totalLessons]
  )

  /** Whether a specific lesson is unlocked (previous lesson in module completed) */
  const isLessonUnlocked = useCallback(
    (moduleId, lessonId) => {
      const module = CURRICULUM.find((m) => m.id === moduleId)
      if (!module) return false
      const lessonIndex = module.lessons.findIndex((l) => l.id === lessonId)
      if (lessonIndex === 0) {
        // First lesson of module — check if previous MODULE is completed
        const moduleIndex = CURRICULUM.findIndex((m) => m.id === moduleId)
        if (moduleIndex === 0) return true // Hiragana vowels always unlocked
        const prevModule = CURRICULUM[moduleIndex - 1]
        const prevModuleLessons = prevModule.lessons.map((l) => l.id)
        // Need at least 80% of prev module completed
        const prevCompleted = prevModuleLessons.filter((id) =>
          state.completedLessons.includes(id)
        ).length
        return prevCompleted / prevModuleLessons.length >= 0.8
      }
      // Subsequent lessons need previous lesson completed
      const prevLessonId = module.lessons[lessonIndex - 1].id
      return state.completedLessons.includes(prevLessonId)
    },
    [state.completedLessons]
  )

  /** Module completion percentage */
  const getModuleProgress = useCallback(
    (moduleId) => {
      const module = CURRICULUM.find((m) => m.id === moduleId)
      if (!module) return 0
      const completed = module.lessons.filter((l) =>
        state.completedLessons.includes(l.id)
      ).length
      return completed / module.lessons.length
    },
    [state.completedLessons]
  )

  // ─── Actions ─────────────────────────────────────────────────────────────

  const completeLesson = useCallback((lessonId, score = 100) => {
    const xpEarned =
      score === 100
        ? XP_REWARDS.COMPLETE_LESSON + XP_REWARDS.PERFECT_QUIZ
        : XP_REWARDS.COMPLETE_LESSON
    dispatch({ type: 'COMPLETE_LESSON', payload: { lessonId, score, xpEarned } })
  }, [])

  const awardXP = useCallback((amount, reason = '') => {
    dispatch({ type: 'AWARD_XP', payload: { amount, reason } })
  }, [])

  const setStudyMode = useCallback((mode) => {
    dispatch({ type: 'SET_STUDY_MODE', payload: { mode } })
  }, [])

  const resetProgress = useCallback(() => {
    if (window.confirm('Are you sure? This will erase ALL your progress. This cannot be undone.')) {
      dispatch({ type: 'RESET_PROGRESS' })
    }
  }, [])

  // ─── Export / Import ──────────────────────────────────────────────────────

  const exportData = useCallback(() => {
    try {
      const exportPayload = {
        ...state,
        exportedAt: new Date().toISOString(),
        appVersion: '0.1.0',
      }
      const jsonStr = JSON.stringify(exportPayload, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const date = new Date().toISOString().split('T')[0]
      a.href = url
      a.download = `n5lab_progress_${date}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      return { success: true }
    } catch (err) {
      console.error('[N5Lab] Export failed:', err)
      return { success: false, error: err.message }
    }
  }, [state])

  const importData = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result)
          // Schema validation
          if (!parsed || typeof parsed.xp !== 'number' || !Array.isArray(parsed.completedLessons)) {
            throw new Error('Invalid progress file format.')
          }
          if (parsed.version !== 1) {
            throw new Error(`Unsupported progress file version: ${parsed.version}`)
          }
          // Hydrate with imported data
          dispatch({ type: 'HYDRATE', payload: { ...parsed, lastUpdated: new Date().toISOString() } })
          resolve({ success: true, xp: parsed.xp, completedLessons: parsed.completedLessons.length })
        } catch (err) {
          console.error('[N5Lab] Import failed:', err)
          reject({ success: false, error: err.message })
        }
      }
      reader.onerror = () => reject({ success: false, error: 'Could not read file.' })
      reader.readAsText(file)
    })
  }, [])

  // ─── Context Value ────────────────────────────────────────────────────────

  const value = useMemo(
    () => ({
      // Raw state
      ...state,
      // Derived
      level,
      levelProgress,
      xpForNextLevel,
      totalLessons,
      completionRate,
      // Actions
      completeLesson,
      awardXP,
      setStudyMode,
      resetProgress,
      exportData,
      importData,
      // Selectors
      isLessonUnlocked,
      getModuleProgress,
      // Curriculum
      curriculum: CURRICULUM,
    }),
    [
      state,
      level,
      levelProgress,
      xpForNextLevel,
      totalLessons,
      completionRate,
      completeLesson,
      awardXP,
      setStudyMode,
      resetProgress,
      exportData,
      importData,
      isLessonUnlocked,
      getModuleProgress,
    ]
  )

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLearning() {
  const ctx = useContext(LearningContext)
  if (!ctx) throw new Error('useLearning must be used within a LearningProvider')
  return ctx
}

export default LearningContext
