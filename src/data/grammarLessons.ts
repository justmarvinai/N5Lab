/**
 * data/grammarLessons.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * First 5 N5 Grammar Lessons — based on Tae Kim's Grammar Guide structure.
 *
 * Lessons in this file:
 *   1. Basic Sentence Structure (〜は〜です)
 *   2. The Topic Particle は (wa)
 *   3. The Subject Particle が (ga)
 *   4. The Object Particle を (wo)
 *   5. Negation — じゃない and ではない
 *
 * Each lesson has:
 *   - explanation (Markdown-formatted, render with your markdown library)
 *   - examples (with breakdown for colour-coded display)
 *   - keyPoints (quick-reference card)
 *   - commonMistakes
 *   - quizQuestions (mix of types for gamification)
 *
 * Reference: Tae Kim's Guide to Japanese Grammar (https://guidetojapanese.org)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { GrammarLesson } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 1 — Basic Sentence Structure: 〜は〜です
// ─────────────────────────────────────────────────────────────────────────────

const lesson_wa_desu: GrammarLesson = {
  id: 'grammar_wa_desu',
  title: '〜は〜です',
  titleJa: 'Identity & State',
  order: 1,
  taeKimRef: 'State of being (Section 2.1)',

  explanation: `
## Basic Sentence Structure: 〜は〜です

Japanese sentences follow a completely different order from English.
The most important thing to learn first is the core structure for *stating what something is*:

> **[Topic]は[State]です。**

### What does each part mean?

- **[Topic]** — what you're talking about
- **は** — the *topic marker* particle (pronounced **"wa"**, not "ha")
- **[State]** — what the topic *is* (a noun, adjective, or description)
- **です** — the polite form of "to be" (is / am / are)

### Sentence order: Japanese vs English

| English | Japanese (word order) |
|---------|----------------------|
| I am a student. | わたし は がくせい です。 |
| This is a book. | これ は ほん です。 |
| Tanaka-san is Japanese. | たなかさん は にほんじん です。 |

In Japanese, the **verb (or copula) always comes last**. This is one of the biggest differences from English.

### Breaking down です (desu)

\`です\` is a *copula* — it links the topic to its description. Think of it as "is" / "am" / "are".
It does **not** change based on who is speaking (no "I am" vs "he is" distinction at this level).

> 💡 **Politeness note:** \`です\` is the *polite* form. In casual speech, you can drop it entirely, or use \`だ\` instead. For travel, always use \`です\`.
`,

  examples: [
    {
      japanese: 'わたしは学生です。',
      reading: 'わたしはがくせいです。',
      english: 'I am a student.',
      highlight: 'は',
      breakdown: [
        { fragment: 'わたし', role: 'Topic', note: '"I" / "me" — the subject being described' },
        { fragment: 'は', role: 'Topic marker', note: 'Particle — pronounced "wa" — marks what we\'re talking about' },
        { fragment: '学生', role: 'State/Predicate', note: 'がくせい — "student"' },
        { fragment: 'です', role: 'Copula', note: '"is / am / are" — always at the end' },
      ],
    },
    {
      japanese: 'これは本です。',
      reading: 'これはほんです。',
      english: 'This is a book.',
      highlight: 'は',
      breakdown: [
        { fragment: 'これ', role: 'Topic', note: '"This" — pointing to something nearby' },
        { fragment: 'は', role: 'Topic marker', note: 'Pronounced "wa"' },
        { fragment: '本', role: 'State/Predicate', note: 'ほん — "book"' },
        { fragment: 'です', role: 'Copula', note: '"is"' },
      ],
    },
    {
      japanese: '田中さんは日本人です。',
      reading: 'たなかさんはにほんじんです。',
      english: 'Tanaka-san is Japanese.',
      breakdown: [
        { fragment: '田中さん', role: 'Topic', note: 'たなかさん — "Tanaka-san" (さん is an honorific)' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: '日本人', role: 'State/Predicate', note: 'にほんじん — "Japanese person"' },
        { fragment: 'です', role: 'Copula' },
      ],
    },
    {
      japanese: 'あれはホテルです。',
      reading: 'あれはホテルです。',
      english: 'That over there is a hotel.',
      breakdown: [
        { fragment: 'あれ', role: 'Topic', note: '"That over there" — far from both speaker and listener' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: 'ホテル', role: 'State/Predicate', note: 'Katakana: loanword from English "hotel"' },
        { fragment: 'です', role: 'Copula' },
      ],
    },
  ],

  keyPoints: [
    'Japanese sentence order: **Topic は Predicate です**',
    'は is the topic marker particle — pronounced **"wa"** not "ha"',
    'です (desu) means "is / am / are" and always comes **at the end**',
    'There is no "a" or "the" in Japanese — context determines it',
    'The subject can be dropped if it is clear from context',
  ],

  commonMistakes: [
    'Pronouncing は as "ha" instead of "wa" when used as a particle',
    'Putting です in the middle of the sentence (it always ends the sentence)',
    'Translating word-for-word from English — remember the verb comes last',
  ],

  quizQuestions: [
    {
      id: 'q_wa_desu_01',
      type: 'multiple-choice',
      question: 'How is the particle は pronounced when used as a topic marker?',
      answer: ['wa'],
      options: ['wa', 'ha', 'ka', 'na'],
      explanation: 'は is normally read "ha" but as a grammatical particle it is always pronounced "wa". This is one of the key irregularities to memorise.',
      xp: 10,
    },
    {
      id: 'q_wa_desu_02',
      type: 'multiple-choice',
      question: 'Which is the correct word order for "I am a teacher"?',
      answer: ['わたしは先生です。'],
      options: [
        'わたしは先生です。',
        'です先生はわたし。',
        'わたしです先生は。',
        '先生はわたしです。',
      ],
      explanation: 'Japanese follows Topic → Predicate → です order. "わたしは先生です。" = I (topic) + は + teacher + です.',
      xp: 15,
    },
    {
      id: 'q_wa_desu_03',
      type: 'translate-en-jp',
      question: 'Translate: "This is a train station."',
      sentence: 'Hint: これ (this) / 駅・えき (station)',
      answer: ['これは駅です。', 'これはえきです。'],
      explanation: 'これは駅です。= This (topic) + は + station + です.',
      xp: 20,
    },
    {
      id: 'q_wa_desu_04',
      type: 'translate-jp-en',
      question: 'Translate: あれはバスです。',
      answer: ['That over there is a bus.', 'That is a bus.'],
      explanation: 'あれ = "that over there", バス = bus (katakana loanword).',
      xp: 15,
    },
    {
      id: 'q_wa_desu_05',
      type: 'true-false',
      question: 'True or False: In Japanese, です always comes at the END of the sentence.',
      answer: ['true'],
      explanation: 'TRUE. In Japanese, the predicate (including copulas like です and verbs) always comes at the end. This is the fundamental rule of Japanese sentence structure.',
      xp: 10,
    },
    {
      id: 'q_wa_desu_06',
      type: 'fill-blank',
      question: 'Fill in the blank: わたし___ がくせいです。',
      sentence: 'わたし___ がくせいです。',
      answer: ['は'],
      options: ['は', 'が', 'を', 'に'],
      explanation: 'は is the topic marker. "わたしは" means "As for me / I (topic)".',
      xp: 10,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 2 — The Topic Particle は (wa)
// ─────────────────────────────────────────────────────────────────────────────

const lesson_topic_wa: GrammarLesson = {
  id: 'grammar_ka',
  title: 'Question Particle か',
  titleJa: 'Questions with か',
  order: 2,
  prerequisiteIds: ['grammar_wa_desu'],
  taeKimRef: 'The question marker か (Section 2.2)',

  explanation: `
## Asking Questions with か

In Japanese, turning a statement into a question is remarkably simple:
**just add か to the end of the sentence.**

> **[Statement]です → [Statement]ですか？**

No word order change. No "do you" or "are you" needed. Just か.

### Statements → Questions

| Statement | Question |
|-----------|----------|
| これは本です。(This is a book.) | これは本**ですか**？(Is this a book?) |
| 田中さんは先生です。(Tanaka-san is a teacher.) | 田中さんは先生**ですか**？(Is Tanaka-san a teacher?) |
| バスで行きます。(I will go by bus.) | バスで行きます**か**？(Will you go by bus?) |

### Answering yes/no questions

| | Japanese |
|--|--|
| **Yes** | はい、そうです。(Yes, that's right.) |
| **No** | いいえ、〜じゃないです。(No, it's not...) |
| **Yes (casual)** | うん (un) |
| **No (casual)** | ううん (uun) |

### Information questions (WH- questions)

か also ends WH-questions. The question word replaces the unknown part:

> **どこ**はトイレですか？→ **どこ**がトイレですか？  
> *Where is the bathroom?*

> **いくら**ですか？  
> *How much is it?*

> **何**時ですか？  
> *What time is it?*

> 💡 In **casual speech**, the か can be replaced by rising intonation alone, just like English.
`,

  examples: [
    {
      japanese: 'これはパスポートですか？',
      reading: 'これはパスポートですか？',
      english: 'Is this a passport?',
      highlight: 'か',
      breakdown: [
        { fragment: 'これ', role: 'Topic', note: '"This"' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: 'パスポート', role: 'Predicate', note: 'Katakana: "passport"' },
        { fragment: 'です', role: 'Copula' },
        { fragment: 'か', role: 'Question marker', note: 'Added to the end — turns statement into question' },
      ],
    },
    {
      japanese: 'トイレはどこですか？',
      reading: 'トイレはどこですか？',
      english: 'Where is the bathroom?',
      highlight: 'どこ',
      breakdown: [
        { fragment: 'トイレ', role: 'Topic', note: '"Toilet / bathroom"' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: 'どこ', role: 'Question word', note: '"where" — replaces the unknown location' },
        { fragment: 'です', role: 'Copula' },
        { fragment: 'か', role: 'Question marker' },
      ],
    },
    {
      japanese: 'これはいくらですか？',
      reading: 'これはいくらですか？',
      english: 'How much is this?',
      highlight: 'いくら',
    },
    {
      japanese: 'はい、そうです。',
      reading: 'はい、そうです。',
      english: 'Yes, that\'s right.',
      highlight: 'そうです',
    },
  ],

  keyPoints: [
    'Add **か** to the end of any sentence to make it a question',
    'No word order change needed — just add か',
    'WH-question words (どこ, いくら, 何, いつ, だれ) replace the unknown part',
    '**はい、そうです** = "Yes, that\'s right" — the most polite affirmation',
    '**いいえ** = "No" — more abrupt; use carefully',
  ],

  commonMistakes: [
    'Writing か with a question mark (か？) is fine informally, but か alone is grammatically sufficient',
    'Using "ですか" vs just "か" — always use "ですか" with nouns/adjectives in polite speech',
  ],

  quizQuestions: [
    {
      id: 'q_ka_01',
      type: 'multiple-choice',
      question: 'How do you turn "これは電車です" into a question?',
      answer: ['これは電車ですか？'],
      options: ['これは電車ですか？', 'か、これは電車？', 'ですかこれは電車？', 'これか電車は？'],
      explanation: 'Simply add か to the end: これは電車ですか？ = "Is this a train?"',
      xp: 10,
    },
    {
      id: 'q_ka_02',
      type: 'translate-en-jp',
      question: 'Translate: "Where is the station?"',
      sentence: 'Hint: 駅・えき (station), どこ (where)',
      answer: ['駅はどこですか？', 'えきはどこですか？'],
      explanation: '駅はどこですか？ — Station (topic) + は + where + です + か',
      xp: 20,
    },
    {
      id: 'q_ka_03',
      type: 'multiple-choice',
      question: 'What is the polite way to say "Yes, that\'s right"?',
      answer: ['はい、そうです。'],
      options: ['はい、そうです。', 'うん、そう。', 'はい、ですか。', 'いいえ、そうです。'],
      explanation: 'はい、そうです is the standard polite affirmation. うん、そう is very casual.',
      xp: 10,
    },
    {
      id: 'q_ka_04',
      type: 'fill-blank',
      question: 'Complete the question: これはいくら___？',
      sentence: 'これはいくら___？',
      answer: ['ですか', 'ですか？'],
      explanation: 'いくらですか = "How much is it?" — いくら (how much) + です + か',
      xp: 10,
    },
    {
      id: 'q_ka_05',
      type: 'true-false',
      question: 'True or False: To ask a question in Japanese, you need to change the word order.',
      answer: ['false'],
      explanation: 'FALSE. You simply add か to the end of the statement. No word-order change needed — this is much simpler than English!',
      xp: 10,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 3 — Possession with の (no)
// ─────────────────────────────────────────────────────────────────────────────

const lesson_no: GrammarLesson = {
  id: 'grammar_no',
  title: 'Possession の',
  titleJa: 'The の Particle',
  order: 3,
  prerequisiteIds: ['grammar_wa_desu'],
  taeKimRef: 'Noun modification with の (Section 3.1)',

  explanation: `
## の — The Possessive & Noun-Modifying Particle

の (no) connects two nouns. Its most common use is to show **possession** or **association**, similar to the English apostrophe-s ('s) or the word "of".

> **[Owner / Modifier] の [Thing owned / Modified noun]**

### Possession: "A's B" or "B of A"

| Japanese | Breakdown | English |
|----------|-----------|---------|
| わたしのかばん | I の bag | *My bag* |
| 田中さんのパスポート | Tanaka-san の passport | *Tanaka-san's passport* |
| にほんのでんしゃ | Japan の train | *Japanese trains / trains of Japan* |

### Location / Category association

の can also express that one noun **belongs to** a category or place:

> **駅の近く** — *near the station* (lit. "station's vicinity")  
> **ホテルのフロント** — *hotel front desk* (lit. "hotel's front")

### Chaining の

You can chain multiple の's, but more than two becomes awkward:

> **わたしのだいがくの先生** — *My university's teacher / My professor*

### の as a pronoun

When the second noun is clear from context, の can replace it:

> Q: どのかばんですか？(Which bag?)  
> A: あおいのです。(The blue one.) — あおい + の (replacing かばん)

> 💡 **Common travel phrase:** **きっぷはどこのですか？** — *Where is the ticket from?*
`,

  examples: [
    {
      japanese: 'これはわたしのパスポートです。',
      reading: 'これはわたしのパスポートです。',
      english: 'This is my passport.',
      highlight: 'の',
      breakdown: [
        { fragment: 'これ', role: 'Topic', note: '"This"' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: 'わたし', role: 'Owner/Modifier', note: '"I / me"' },
        { fragment: 'の', role: 'Possessive particle', note: 'Links owner → thing owned' },
        { fragment: 'パスポート', role: 'Thing owned', note: '"passport"' },
        { fragment: 'です', role: 'Copula' },
      ],
    },
    {
      japanese: '駅のトイレはきれいです。',
      reading: 'えきのトイレはきれいです。',
      english: 'The station\'s bathroom is clean.',
      highlight: 'の',
      breakdown: [
        { fragment: '駅', role: 'Modifier', note: 'えき — "station"' },
        { fragment: 'の', role: 'Associative particle', note: '"\'s" — connects location to thing' },
        { fragment: 'トイレ', role: 'Modified noun', note: '"bathroom"' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: 'きれい', role: 'Adjective', note: '"clean / pretty"' },
        { fragment: 'です', role: 'Copula' },
      ],
    },
    {
      japanese: '日本の食べ物はおいしいです。',
      reading: 'にほんのたべものはおいしいです。',
      english: 'Japanese food is delicious.',
      highlight: 'の',
    },
    {
      japanese: 'これはだれのかばんですか？',
      reading: 'これはだれのかばんですか？',
      english: 'Whose bag is this?',
      highlight: 'だれの',
    },
  ],

  keyPoints: [
    'の connects [Modifier] の [Modified noun] — think of it as "\'s" or "of"',
    'Order is the **opposite of English**: "station\'s bathroom" not "bathroom of station"',
    'Can express possession, origin, category, or location association',
    'Can replace a known noun when context is clear (pronoun use)',
    'Common pattern: **だれの [noun]ですか？** = "Whose [noun] is it?"',
  ],

  commonMistakes: [
    'Putting の in the wrong order (English: "my bag" → Japanese: わたし**の**かばん, NOT かばんのわたし)',
    'Confusing の (possessive) with は (topic marker)',
  ],

  quizQuestions: [
    {
      id: 'q_no_01',
      type: 'multiple-choice',
      question: 'How do you say "Tanaka-san\'s ticket" in Japanese?',
      answer: ['田中さんのきっぷ'],
      options: ['田中さんのきっぷ', 'きっぷの田中さん', 'きっぷは田中さん', '田中さんはきっぷ'],
      explanation: 'の connects [owner] → [thing]: 田中さんのきっぷ. The owner comes FIRST, then の, then the thing owned.',
      xp: 10,
    },
    {
      id: 'q_no_02',
      type: 'translate-jp-en',
      question: 'Translate: にほんのでんしゃははやいです。',
      answer: ['Japanese trains are fast.', 'The trains of Japan are fast.'],
      explanation: 'にほんの (Japan\'s / Japanese) + でんしゃ (train) + は (topic) + はやい (fast) + です.',
      xp: 15,
    },
    {
      id: 'q_no_03',
      type: 'fill-blank',
      question: 'Fill in: これはわたし___ きっぷです。',
      sentence: 'これはわたし___ きっぷです。',
      answer: ['の'],
      options: ['の', 'は', 'が', 'を'],
      explanation: 'の is the possessive particle. わたしのきっぷ = "my ticket".',
      xp: 10,
    },
    {
      id: 'q_no_04',
      type: 'translate-en-jp',
      question: 'Translate: "Whose passport is this?"',
      sentence: 'Hint: だれ (who), パスポート (passport)',
      answer: ['これはだれのパスポートですか？'],
      explanation: 'これはだれのパスポートですか？ = This (topic) は + who + の + passport + です + か',
      xp: 20,
    },
    {
      id: 'q_no_05',
      type: 'true-false',
      question: 'True or False: の in "わたしのかばん" means the same as English "\'s" in "my bag".',
      answer: ['true'],
      explanation: 'TRUE. の functions as a possessive marker, similar to English "\'s". わたしのかばん = "my bag" (lit. "I\'s bag").',
      xp: 10,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 4 — Location & Direction Particles: に and で
// ─────────────────────────────────────────────────────────────────────────────

const lesson_ni_de: GrammarLesson = {
  id: 'grammar_ni_de',
  title: 'Particles に & で',
  titleJa: 'Location & Means',
  order: 4,
  prerequisiteIds: ['grammar_wa_desu', 'grammar_no'],
  taeKimRef: 'Particles に and で (Section 4.3)',

  explanation: `
## に and で — Location, Direction, and Means

These two particles are among the most important for travel. They both relate to *places*, but in different ways.

---

### に (ni) — Direction & Destination

に marks:
1. **Where you are going** (destination with movement verbs like 行く, 来る)
2. **Where something exists** (location with いる/ある)
3. **Time** (specific times, days)

> **[Destination] に 行きます / 来ます**  
> "I go **to** [destination]" / "I come **to** [destination]"

| Example | Meaning |
|---------|---------|
| 東京に行きます | I'm going **to** Tokyo |
| えきにいます | I'm **at** the station (lit. I exist at the station) |
| ３時に会いましょう | Let's meet **at** 3 o'clock |

---

### で (de) — Location of Action & Means

で marks:
1. **Where an action takes place** (doing something *at* a place)
2. **Method / Means** (how you do something — by bus, by hand, in Japanese)

> **[Location] で [Action]**  
> "Do [action] **at/in** [location]"

> **[Means] で [Action]**  
> "Do [action] **by/with** [means]"

| Example | Meaning |
|---------|---------|
| レストランで食べます | I eat **at** the restaurant |
| バスで行きます | I go **by** bus |
| 日本語で話します | I speak **in** Japanese |
| カードで払います | I pay **by** card |

---

### Key distinction: に vs で

| | に | で |
|--|---|---|
| **Question** | *Where to? / Where is it?* | *Where is the action happening? / By what means?* |
| **Verbs** | 行く (go), 来る (come), いる/ある (exist) | Most other action verbs |
| **Travel use** | 駅に行きます (go TO the station) | 駅でランチを食べます (eat lunch AT the station) |

> 💡 **Memory trick:** に = **destination pin** (like a map pin 📍), で = **doing in a place** (the action bubble 💬)
`,

  examples: [
    {
      japanese: '東京に行きます。',
      reading: 'とうきょうにいきます。',
      english: 'I am going to Tokyo.',
      highlight: 'に',
      breakdown: [
        { fragment: '東京', role: 'Destination', note: 'とうきょう — "Tokyo"' },
        { fragment: 'に', role: 'Direction particle', note: 'Marks the destination (to / toward)' },
        { fragment: '行きます', role: 'Verb', note: 'いきます — "to go" (polite form)' },
      ],
    },
    {
      japanese: 'バスで行きます。',
      reading: 'バスでいきます。',
      english: 'I will go by bus.',
      highlight: 'で',
      breakdown: [
        { fragment: 'バス', role: 'Means of transport', note: '"bus"' },
        { fragment: 'で', role: 'Means particle', note: 'Marks the method / means of doing something' },
        { fragment: '行きます', role: 'Verb', note: '"to go"' },
      ],
    },
    {
      japanese: 'コンビニでお水を買います。',
      reading: 'コンビニでおみずをかいます。',
      english: 'I will buy water at the convenience store.',
      highlight: 'で',
      breakdown: [
        { fragment: 'コンビニ', role: 'Location of action', note: '"convenience store" (コンビニエンスストア)' },
        { fragment: 'で', role: 'Action-location particle', note: 'Where the buying happens' },
        { fragment: 'お水', role: 'Object', note: 'おみず — "water"' },
        { fragment: 'を', role: 'Object particle', note: 'Marks the direct object' },
        { fragment: '買います', role: 'Verb', note: 'かいます — "to buy"' },
      ],
    },
    {
      japanese: '英語で話してもいいですか？',
      reading: 'えいごではなしてもいいですか？',
      english: 'Is it okay to speak in English?',
      highlight: 'で',
    },
  ],

  keyPoints: [
    '**に** = destination ("go TO X") or existence location ("be AT X with いる/ある")',
    '**で** = where an action happens ("eat AT X") or means ("go BY bus")',
    'Key verbs with に: 行く (go), 来る (come), いる (exist/be), ある (exist - objects)',
    'Key verbs with で: 食べる (eat), 買う (buy), 話す (speak), 払う (pay)',
    'で can mark means/method: バスで (by bus), カードで (by card), 日本語で (in Japanese)',
  ],

  commonMistakes: [
    'Using に where で is needed: ✗ 駅に食べます → ✓ 駅で食べます (eating *at* the station = action location = で)',
    'Forgetting に with movement verbs: ✗ 東京行きます → ✓ 東京に行きます',
    'Confusing いる/ある with action verbs — いる/ある use に, not で',
  ],

  quizQuestions: [
    {
      id: 'q_ni_de_01',
      type: 'multiple-choice',
      question: 'Which is correct for "I am going to the station"?',
      answer: ['駅に行きます。'],
      options: ['駅に行きます。', '駅で行きます。', '駅を行きます。', '駅は行きます。'],
      explanation: 'に marks the destination with movement verbs like 行く (go). 駅に行きます = go TO the station.',
      xp: 15,
    },
    {
      id: 'q_ni_de_02',
      type: 'multiple-choice',
      question: 'How do you say "I\'ll pay by card"?',
      answer: ['カードで払います。'],
      options: ['カードで払います。', 'カードに払います。', 'カードは払います。', 'カードを払います。'],
      explanation: 'で marks the *means* or method. カードで払います = pay BY card.',
      xp: 15,
    },
    {
      id: 'q_ni_de_03',
      type: 'fill-blank',
      question: 'Fill in: レストラン___ ご飯を食べます。(I eat a meal at the restaurant.)',
      sentence: 'レストラン___ ご飯を食べます。',
      answer: ['で'],
      options: ['で', 'に', 'は', 'の'],
      explanation: 'で marks the location where an action (eating) takes place. レストランで = at the restaurant.',
      xp: 10,
    },
    {
      id: 'q_ni_de_04',
      type: 'translate-en-jp',
      question: 'Translate: "I will speak in Japanese."',
      sentence: 'Hint: 日本語 (Japanese language), 話します (to speak)',
      answer: ['日本語で話します。', 'にほんごではなします。'],
      explanation: 'で marks the means/language used. 日本語で話します = speak BY MEANS OF Japanese.',
      xp: 20,
    },
    {
      id: 'q_ni_de_05',
      type: 'true-false',
      question: 'True or False: Both に and で can mark locations, but で is used when an action takes place there.',
      answer: ['true'],
      explanation: 'TRUE. に marks existence location (where something IS) or destination. で marks where an action HAPPENS. Example: えきにいます (I am at the station) vs えきで食べます (I eat at the station).',
      xp: 10,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSON 5 — Negation: 〜じゃない / ではない
// ─────────────────────────────────────────────────────────────────────────────

const lesson_negation: GrammarLesson = {
  id: 'grammar_past',
  title: 'Negation & Past Tense',
  titleJa: 'Negative & Past forms',
  order: 5,
  prerequisiteIds: ['grammar_wa_desu'],
  taeKimRef: 'Negative state of being (Section 2.3) & Past tense (Section 2.4)',

  explanation: `
## Negation and Past Tense with です

Once you know **〜は〜です**, you only need to change one thing to express negation or past tense.

---

### The 4 forms of the copula

| | **Present / Future** | **Past** |
|--|---------------------|---------|
| **Positive** | 〜です | 〜でした |
| **Negative** | 〜じゃないです / 〜ではありません | 〜じゃなかったです / 〜ではありませんでした |

> 💡 **じゃない** is casual. **ではありません** is more formal. Both are correct.

---

### Negation: 〜じゃないです / 〜ではありません

> **これは本じゃないです。** — *This is not a book.* (casual-polite)  
> **これは本ではありません。** — *This is not a book.* (formal)

| Positive | Negative |
|----------|----------|
| がくせいです (am a student) | がくせいじゃないです (am not a student) |
| にほんじんです (am Japanese) | にほんじんじゃないです (am not Japanese) |

---

### Past Tense: 〜でした / 〜じゃなかったです

Simply change **です → でした** for past positive, and **じゃないです → じゃなかったです** for past negative.

| Tense | Form | Example |
|-------|------|---------|
| Present positive | 〜です | 学生**です** — am a student |
| Present negative | 〜じゃないです | 学生**じゃないです** — am not a student |
| Past positive | 〜でした | 学生**でした** — was a student |
| Past negative | 〜じゃなかったです | 学生**じゃなかったです** — was not a student |

---

### Useful travel negations

| Japanese | English |
|----------|---------|
| これはわたしのじゃないです。| This is not mine. |
| まだ食べていません。| I haven't eaten yet. |
| 予約していません。| I don't have a reservation. |
| 日本語はあまりわかりません。| I don't understand Japanese very well. |
`,

  examples: [
    {
      japanese: 'これはわたしのパスポートじゃないです。',
      reading: 'これはわたしのパスポートじゃないです。',
      english: 'This is not my passport.',
      highlight: 'じゃないです',
      breakdown: [
        { fragment: 'これ', role: 'Topic', note: '"This"' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: 'わたしのパスポート', role: 'Predicate noun', note: '"my passport"' },
        { fragment: 'じゃないです', role: 'Negative copula', note: '"is not" — negated form of です' },
      ],
    },
    {
      japanese: 'あの人は田中さんじゃなかったです。',
      reading: 'あのひとはたなかさんじゃなかったです。',
      english: 'That person was not Tanaka-san.',
      highlight: 'じゃなかったです',
      breakdown: [
        { fragment: 'あの人', role: 'Topic', note: 'あのひと — "that person"' },
        { fragment: 'は', role: 'Topic marker' },
        { fragment: '田中さん', role: 'Predicate', note: '"Tanaka-san"' },
        { fragment: 'じゃなかったです', role: 'Past negative copula', note: '"was not"' },
      ],
    },
    {
      japanese: '昨日は月曜日でした。',
      reading: 'きのうはげつようびでした。',
      english: 'Yesterday was Monday.',
      highlight: 'でした',
    },
    {
      japanese: 'わかりません。',
      reading: 'わかりません。',
      english: 'I don\'t understand.',
      highlight: 'ません',
    },
  ],

  keyPoints: [
    '**です → じゃないです** for "is not" (casual-polite)',
    '**です → でした** for "was" (past tense)',
    '**じゃないです → じゃなかったです** for "was not"',
    '**ではありません** is more formal than じゃないです — both are correct',
    'わかりません (do not understand) and できません (cannot do) are travel essentials',
  ],

  commonMistakes: [
    'じゃないです is NOT the casual じゃない — じゃないです is polite, じゃない is casual',
    'Forgetting to use でした for past tense (using です for everything)',
  ],

  quizQuestions: [
    {
      id: 'q_neg_01',
      type: 'multiple-choice',
      question: 'How do you say "This is not a ticket"?',
      answer: ['これはきっぷじゃないです。'],
      options: [
        'これはきっぷじゃないです。',
        'これはきっぷないです。',
        'これはきっぷです。',
        'きっぷはこれです。',
      ],
      explanation: 'じゃないです is the polite negative form of です. これはきっぷじゃないです = "This is not a ticket."',
      xp: 10,
    },
    {
      id: 'q_neg_02',
      type: 'multiple-choice',
      question: 'How do you say "I was a student" (past tense)?',
      answer: ['わたしは学生でした。'],
      options: [
        'わたしは学生でした。',
        'わたしは学生じゃないです。',
        'わたしは学生です。',
        'わたしは学生じゃなかったです。',
      ],
      explanation: 'でした is the past tense of です. わたしは学生でした = "I was a student."',
      xp: 15,
    },
    {
      id: 'q_neg_03',
      type: 'fill-blank',
      question: 'Complete: "It was not Monday." = 月曜日_________。',
      sentence: '月曜日_________。',
      answer: ['じゃなかったです', 'ではありませんでした'],
      explanation: 'じゃなかったです = past negative copula ("was not"). The full sentence: 月曜日じゃなかったです。',
      xp: 15,
    },
    {
      id: 'q_neg_04',
      type: 'translate-en-jp',
      question: 'Translate: "I don\'t understand."',
      answer: ['わかりません。'],
      explanation: 'わかりません is the polite negative of わかる (to understand). An essential travel phrase!',
      xp: 10,
    },
    {
      id: 'q_neg_05',
      type: 'multiple-choice',
      question: 'Which sentence means "I was not Japanese"?',
      answer: ['わたしはにほんじんじゃなかったです。'],
      options: [
        'わたしはにほんじんじゃなかったです。',
        'わたしはにほんじんでした。',
        'わたしはにほんじんじゃないです。',
        'わたしはにほんじんです。',
      ],
      explanation: 'じゃなかったです is the past negative form. わたしはにほんじんじゃなかったです = "I was not Japanese."',
      xp: 15,
    },
    {
      id: 'q_neg_06',
      type: 'true-false',
      question: 'True or False: ではありません is more formal than じゃないです.',
      answer: ['true'],
      explanation: 'TRUE. Both mean "is not" but ではありません is more formal/written-style. じゃないです is the everyday polite form.',
      xp: 10,
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

/** All 5 grammar lessons in curriculum order */
export const grammarLessons: GrammarLesson[] = [
  lesson_wa_desu,
  lesson_topic_wa,
  lesson_no,
  lesson_ni_de,
  lesson_negation,
]

/** Look up a single lesson by ID */
export function getGrammarLessonById(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id)
}

/** Get quiz questions across all lessons (for mixed review mode) */
export function getAllQuizQuestions() {
  return grammarLessons.flatMap((l) =>
    l.quizQuestions.map((q) => ({ ...q, lessonId: l.id, lessonTitle: l.title }))
  )
}

export default grammarLessons
