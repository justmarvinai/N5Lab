/**
 * pages/LessonView.jsx  (UPDATED)
 * ─────────────────────────────────────────────────────────────────────────────
 * Individual lesson renderer.
 * Routes to the correct learning component based on lesson type:
 *   'kana'     → FlashCardSession (kana flashcards)
 *   'vocab'    → FlashCardSession (vocab flashcards)
 *   'grammar'  → GrammarLessonView (explanation + quiz)
 *   'quiz'     → QuizEngine
 *   'listening'→ placeholder (Task 4)
 *   'reading'  → placeholder (Task 4)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useMemo, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Construction, BookOpen } from 'lucide-react'

import { useLearning, CURRICULUM } from '../context/LearningContext'
import { hiragana, katakana } from '../data/kanaData'
import { n5Vocab } from '../data/n5Vocab'
import { grammarLessons } from '../data/grammarLessons'
import { generateKanaFlashcards, generateVocabFlashcards } from '../data/dataUtils'

import FlashCardSession from '../components/flashcard/FlashCardSession'
import QuizEngine from '../components/quiz/QuizEngine'
import GrammarLessonView from '../components/grammar/GrammarLessonView'

// ─── Lesson type router ───────────────────────────────────────────────────────

function KanaLesson({ lesson, module, onComplete, onExit }) {
  const script = module.id === 'hiragana' ? hiragana : katakana

  // Get the row(s) that match this lesson
  const cards = useMemo(() => {
    const rowSections = ['basic', 'dakuon', 'combinations']
    let allChars = []
    for (const section of rowSections) {
      for (const row of script[section]) {
        if (row.lessonId === lesson.id) {
          allChars = [...allChars, ...row.characters]
        }
      }
    }
    return generateKanaFlashcards({ ...script, basic: [{ label: '', labelJa: '', lessonId: lesson.id, characters: allChars }], dakuon: [], combinations: [] })
  }, [lesson.id, script])

  return (
    <FlashCardSession
      cards={cards}
      moduleTitle={`${module.title} · ${lesson.title}`}
      onComplete={onComplete}
      onExit={onExit}
    />
  )
}

function VocabLesson({ lesson, module, onComplete, onExit }) {
  // Filter vocab by the lesson's category tags
  const cards = useMemo(() => {
    const categoryMap = {
      vocab_greetings: ['Greetings'],
      vocab_numbers:   ['Numbers'],
      vocab_transport: ['Transport'],
      vocab_food:      ['Food & Drink'],
      vocab_shopping:  ['Shopping'],
      vocab_directions:['Directions', 'Places'],
      vocab_hotel:     ['Accommodation'],
      vocab_emergency: ['Emergency', 'Body & Health'],
    }
    const cats = categoryMap[lesson.id] ?? []
    const filtered = cats.length
      ? n5Vocab.filter((w) => cats.includes(w.category))
      : n5Vocab.slice(0, 10)

    return generateVocabFlashcards(filtered, 'kana-to-english')
  }, [lesson.id])

  return (
    <FlashCardSession
      cards={cards}
      moduleTitle={`${module.title} · ${lesson.title}`}
      onComplete={onComplete}
      onExit={onExit}
    />
  )
}

function QuizLesson({ lesson, module, onComplete, onExit }) {
  // For grammar quizzes, pull questions from the grammar data
  const questions = useMemo(() => {
    if (module.id === 'grammar_n5') {
      return grammarLessons.flatMap((l) => l.quizQuestions)
    }
    // Kana quiz: generate from all kana in the module
    const script = module.id === 'hiragana' ? hiragana : katakana
    if (!script) return []
    return script.basic.flatMap((row) =>
      row.characters.map((char, i) => ({
        id: `${char.kana}_q${i}`,
        type: 'multiple-choice',
        question: `What is the romaji for "${char.kana}"?`,
        answer: [char.romaji],
        options: [
          char.romaji,
          ...script.basic.flatMap((r) => r.characters)
            .filter((c) => c.romaji !== char.romaji)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((c) => c.romaji),
        ].sort(() => Math.random() - 0.5),
        explanation: `${char.kana} is read as "${char.romaji}". ${char.mnemonic ?? ''}`,
        xp: 10,
      }))
    ).slice(0, 15)
  }, [lesson.id, module.id])

  return (
    <QuizEngine
      questions={questions}
      title={`${module.title} · ${lesson.title}`}
      onComplete={onComplete}
      onExit={onExit}
    />
  )
}

// ─── Placeholder for unimplemented lesson types ───────────────────────────────

function PlaceholderLesson({ lesson, module, onExit }) {
  return (
    <div className="min-h-screen bg-washi flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-washi-warm bg-white">
        <button onClick={onExit} className="btn-ghost p-2 -ml-2 flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="card p-8 text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-washi-soft flex items-center justify-center mx-auto mb-4">
            <Construction size={24} className="text-mist" />
          </div>
          <h3 className="font-display text-xl font-400 text-ink mb-2">{lesson.title}</h3>
          <p className="text-mist text-sm mb-1 font-japanese">{lesson.titleJa}</p>
          <p className="text-mist text-sm mt-3">
            {lesson.lessonType} lessons are coming soon in a future update.
          </p>
          <div className="badge badge-mist mt-3">{lesson.lessonType}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Main LessonView ──────────────────────────────────────────────────────────

export default function LessonView() {
  const { moduleId, lessonId } = useParams()
  const navigate = useNavigate()
  const { completeLesson, awardXP } = useLearning()

  const module = CURRICULUM.find((m) => m.id === moduleId)
  const lesson = module?.lessons.find((l) => l.id === lessonId)

  const handleExit = useCallback(() => navigate('/learn'), [navigate])

  const handleComplete = useCallback(
    ({ score = 100, xpEarned = 0 } = {}) => {
      completeLesson(lessonId, score)
      navigate('/learn', { state: { justCompleted: lessonId } })
    },
    [lessonId, completeLesson, navigate]
  )

  if (!module || !lesson) {
    return (
      <div className="py-8 max-w-2xl">
        <Link to="/learn" className="btn-ghost inline-flex mb-6">
          <ArrowLeft size={14} /> Back to Learn
        </Link>
        <div className="card p-8 text-center">
          <BookOpen size={24} className="text-mist mx-auto mb-3" />
          <p className="text-mist">Lesson not found.</p>
        </div>
      </div>
    )
  }

  // Route to correct component
  const sharedProps = { lesson, module, onComplete: handleComplete, onExit: handleExit }

  switch (lesson.lessonType) {
    case 'kana':
      return <KanaLesson {...sharedProps} />
    case 'vocab':
      return <VocabLesson {...sharedProps} />
    case 'quiz':
      return <QuizLesson {...sharedProps} />
    case 'grammar':
      return <GrammarLessonView {...sharedProps} />
    default:
      return <PlaceholderLesson {...sharedProps} />
  }
}
