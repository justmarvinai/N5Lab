# N5Lab 🇯🇵

A gamified JLPT N5 Japanese learning app — built with React, Vite, Tailwind CSS, and Groq AI.

**Goal:** Reach conversational travel-level Japanese before September 2026.

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Setup

### 1. AI Sensei (optional but recommended)
Get a **free** Groq API key at [console.groq.com/keys](https://console.groq.com/keys) — no credit card needed.

In the app: click ⚙️ Settings → paste your key → Save & Verify.

### 2. Environment (optional)
Create `.env.local` for team use:
```
VITE_GROQ_KEY=gsk_your_key_here
```
Or just paste it in Settings — it's stored only in your browser's localStorage.

---

## Features (Tasks 1–4)

| Feature | Status |
|---|---|
| Dashboard (XP, streak, progress) | ✅ Task 1 |
| Design system (washi/ink/lacquer palette) | ✅ Task 1 |
| Hiragana & Katakana data (all 236 chars) | ✅ Task 2 |
| N5 Vocabulary (50 travel-essential words) | ✅ Task 2 |
| Grammar lessons (5 core N5 patterns) | ✅ Task 2 |
| Flashcard engine (SM-2 spaced repetition) | ✅ Task 3 |
| Quiz engine (6 question types, XP rewards) | ✅ Task 3 |
| Guided Roadmap (Duolingo-style stages) | ✅ Task 3 |
| Library (Open Mode — study anything freely) | ✅ Task 3 |
| AI Sensei chat (streaming, context-aware) | ✅ Task 4 |
| Roleplay scenarios (airport, restaurant…) | ✅ Task 4 |
| Settings modal (API key + model selector) | ✅ Task 4 |

---

## Project Structure

```
src/
├── services/
│   └── aiService.js          # Groq API client (fetch + SSE streaming)
├── hooks/
│   ├── useSpacedRepetition.js # SM-2 algorithm
│   ├── useSound.js            # Web Audio API sound effects
│   └── useChat.js             # AI conversation state
├── data/
│   ├── kanaData.ts            # All hiragana + katakana with mnemonics
│   ├── n5Vocab.ts             # 50 travel-essential N5 words
│   ├── grammarLessons.ts      # 5 grammar lessons (Tae Kim's guide)
│   └── dataUtils.ts           # Flashcard generators, quiz helpers
├── context/
│   └── LearningContext.jsx    # XP, levels, streaks, progress (localStorage)
├── components/
│   ├── ai/                   # ChatSensei, SenseiFAB
│   ├── settings/             # SettingsModal
│   ├── flashcard/            # FlashCard (3D flip), FlashCardSession
│   ├── quiz/                 # QuizEngine
│   ├── roadmap/              # RoadmapPath (visual stage map)
│   ├── library/              # LibraryView (open mode)
│   ├── grammar/              # GrammarLessonView
│   ├── layout/               # AppLayout (sidebar + mobile nav)
│   └── ui/                   # LevelBadge, XPPopup, StreakFlame
└── pages/
    ├── Dashboard.jsx
    ├── Learn.jsx              # Roadmap ↔ Library toggle
    ├── LessonView.jsx         # Routes to correct engine per lesson type
    ├── Dictionary.jsx
    └── Profile.jsx
```

---

## Tech Stack

- **React 18** + **Vite** — fast dev, instant HMR
- **Tailwind CSS** — custom design tokens (washi, lacquer, gold, ink, mist)
- **Framer Motion** — all animations (3D card flip, page transitions, streaming cursor)
- **Groq API** — free-tier LLM, raw fetch + SSE streaming (no SDK)
- **localStorage** — all persistence (no backend, no database)
- **Web Audio API** — synthesised sound effects (no audio files)

---

## Deployment (Vercel)

```bash
npm run build
vercel --prod
```

The `vercel.json` already configures SPA routing. No environment variables required (API key is set by the user in-app).

---

## Grammar Sources

All grammar lessons based on [Tae Kim's Guide to Japanese](https://guidetojapanese.org/learn/grammar).

