/**
 * data/n5Vocab.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * N5 Vocabulary — Top 50 travel-essential words.
 *
 * HOW TO EXPAND:
 *   Each word follows the VocabWord interface. To add more words:
 *   1. Continue the id sequence (v051, v052 …)
 *   2. Choose a VocabCategory from the union in types/index.ts
 *   3. Set travelPriority 1–5 (5 = most critical for a Japan trip)
 *   4. Add at least one example sentence
 *
 * Categories covered in this file (50 words):
 *   Greetings (8), Numbers (10), Food & Drink (8),
 *   Transport (7), Directions (5), Question Words (5), Emergency (7)
 *
 * Source: Standard JLPT N5 word lists + Japan travel frequency data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { VocabWord } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
// GREETINGS & SOCIAL (v001–v010)
// ─────────────────────────────────────────────────────────────────────────────

const greetings: VocabWord[] = [
  {
    id: 'v001',
    kanji: 'こんにちは',
    kana: 'こんにちは',
    romaji: 'konnichiwa',
    english: 'Hello / Good afternoon',
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['greetings', 'polite', 'everyday'],
    examples: [
      {
        japanese: 'こんにちは！お元気ですか？',
        reading: 'こんにちは！おげんきですか？',
        english: 'Hello! How are you?',
      },
    ],
  },
  {
    id: 'v002',
    kanji: 'ありがとうございます',
    kana: 'ありがとうございます',
    romaji: 'arigatou gozaimasu',
    english: 'Thank you (polite)',
    altMeanings: ['Thank you very much'],
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['greetings', 'polite', 'essential'],
    examples: [
      {
        japanese: 'ありがとうございます。',
        english: 'Thank you very much.',
      },
      {
        japanese: 'どうもありがとうございます。',
        english: 'Thank you so much.',
      },
    ],
  },
  {
    id: 'v003',
    kanji: 'すみません',
    kana: 'すみません',
    romaji: 'sumimasen',
    english: 'Excuse me / I\'m sorry',
    altMeanings: ['Pardon me', 'Thank you (for the trouble)'],
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['greetings', 'polite', 'essential', 'attention'],
    examples: [
      {
        japanese: 'すみません、トイレはどこですか？',
        english: 'Excuse me, where is the bathroom?',
      },
    ],
  },
  {
    id: 'v004',
    kanji: 'おはようございます',
    kana: 'おはようございます',
    romaji: 'ohayou gozaimasu',
    english: 'Good morning (polite)',
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['greetings', 'polite', 'morning'],
    examples: [
      {
        japanese: 'おはようございます！',
        english: 'Good morning!',
      },
    ],
  },
  {
    id: 'v005',
    kanji: 'こんばんは',
    kana: 'こんばんは',
    romaji: 'konbanwa',
    english: 'Good evening',
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['greetings', 'evening'],
    examples: [
      {
        japanese: 'こんばんは！今日はどうでしたか？',
        reading: 'こんばんは！きょうはどうでしたか？',
        english: 'Good evening! How was today?',
      },
    ],
  },
  {
    id: 'v006',
    kanji: 'おやすみなさい',
    kana: 'おやすみなさい',
    romaji: 'oyasuminasai',
    english: 'Good night',
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 3,
    tags: ['greetings', 'night'],
    examples: [
      {
        japanese: 'おやすみなさい。',
        english: 'Good night.',
      },
    ],
  },
  {
    id: 'v007',
    kanji: 'はい',
    kana: 'はい',
    romaji: 'hai',
    english: 'Yes',
    category: 'Greetings',
    pos: 'interjection',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['essential', 'response'],
    examples: [
      {
        japanese: 'はい、わかりました。',
        english: 'Yes, I understand.',
      },
    ],
  },
  {
    id: 'v008',
    kanji: 'いいえ',
    kana: 'いいえ',
    romaji: 'iie',
    english: 'No',
    category: 'Greetings',
    pos: 'interjection',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['essential', 'response'],
    examples: [
      {
        japanese: 'いいえ、けっこうです。',
        english: 'No, thank you (I\'m fine).',
      },
    ],
  },
  {
    id: 'v009',
    kanji: 'わかりません',
    kana: 'わかりません',
    romaji: 'wakarimasen',
    english: 'I don\'t understand',
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['essential', 'communication'],
    examples: [
      {
        japanese: 'すみません、わかりません。',
        english: 'I\'m sorry, I don\'t understand.',
      },
    ],
  },
  {
    id: 'v010',
    kanji: 'もう一度お願いします',
    kana: 'もういちどおねがいします',
    romaji: 'mou ichido onegaishimasu',
    english: 'Please say that again',
    category: 'Greetings',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['essential', 'communication', 'request'],
    examples: [
      {
        japanese: 'すみません、もう一度お願いします。',
        reading: 'すみません、もういちどおねがいします。',
        english: 'Excuse me, please say that again.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// NUMBERS (v011–v020)
// ─────────────────────────────────────────────────────────────────────────────

const numbers: VocabWord[] = [
  {
    id: 'v011',
    kanji: '一',
    kana: 'いち',
    romaji: 'ichi',
    english: 'One (1)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['numbers', 'counting'],
    examples: [{ japanese: '一つください。', reading: 'ひとつください。', english: 'One please.' }],
  },
  {
    id: 'v012',
    kanji: '二',
    kana: 'に',
    romaji: 'ni',
    english: 'Two (2)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['numbers'],
    examples: [{ japanese: '二人です。', reading: 'ふたりです。', english: 'There are two people.' }],
  },
  {
    id: 'v013',
    kanji: '三',
    kana: 'さん',
    romaji: 'san',
    english: 'Three (3)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['numbers'],
    examples: [{ japanese: '三番ホームです。', reading: 'さんばんホームです。', english: 'It\'s Platform 3.' }],
  },
  {
    id: 'v014',
    kanji: '四',
    kana: 'し / よん',
    romaji: 'shi / yon',
    english: 'Four (4)',
    altMeanings: ['よん (yon) preferred in modern usage'],
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['numbers'],
    examples: [{ japanese: '四番出口はどこですか？', reading: 'よんばんでぐちはどこですか？', english: 'Where is Exit 4?' }],
  },
  {
    id: 'v015',
    kanji: '五',
    kana: 'ご',
    romaji: 'go',
    english: 'Five (5)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['numbers'],
    examples: [{ japanese: '五時に会いましょう。', reading: 'ごじにあいましょう。', english: 'Let\'s meet at 5 o\'clock.' }],
  },
  {
    id: 'v016',
    kanji: '十',
    kana: 'じゅう',
    romaji: 'juu',
    english: 'Ten (10)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['numbers'],
    examples: [{ japanese: '十分かかります。', reading: 'じゅっぷんかかります。', english: 'It takes ten minutes.' }],
  },
  {
    id: 'v017',
    kanji: '百',
    kana: 'ひゃく',
    romaji: 'hyaku',
    english: 'One hundred (100)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['numbers', 'money'],
    examples: [{ japanese: '百円ショップ', reading: 'ひゃくえんショップ', english: '100-yen shop (dollar store)' }],
  },
  {
    id: 'v018',
    kanji: '千',
    kana: 'せん',
    romaji: 'sen',
    english: 'One thousand (1,000)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['numbers', 'money'],
    examples: [{ japanese: '千円でいいですか？', reading: 'せんえんでいいですか？', english: 'Is 1,000 yen okay?' }],
  },
  {
    id: 'v019',
    kanji: '円',
    kana: 'えん',
    romaji: 'en',
    english: 'Yen (Japanese currency)',
    category: 'Numbers',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['money', 'shopping', 'essential'],
    examples: [
      { japanese: 'いくらですか？', english: 'How much is it?' },
      { japanese: '三千円です。', reading: 'さんぜんえんです。', english: 'It\'s 3,000 yen.' },
    ],
  },
  {
    id: 'v020',
    kanji: '何',
    kana: 'なん / なに',
    romaji: 'nan / nani',
    english: 'What / How many',
    category: 'Question Words',
    pos: 'pronoun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['question-words', 'essential'],
    examples: [
      { japanese: 'これは何ですか？', reading: 'これはなんですか？', english: 'What is this?' },
      { japanese: '何番ですか？', reading: 'なんばんですか？', english: 'What number is it?' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// FOOD & DRINK (v021–v028)
// ─────────────────────────────────────────────────────────────────────────────

const foodAndDrink: VocabWord[] = [
  {
    id: 'v021',
    kanji: '水',
    kana: 'みず',
    romaji: 'mizu',
    english: 'Water',
    category: 'Food & Drink',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['food', 'restaurant', 'essential'],
    examples: [{ japanese: '水をください。', reading: 'みずをください。', english: 'Water, please.' }],
  },
  {
    id: 'v022',
    kanji: 'お茶',
    kana: 'おちゃ',
    romaji: 'ocha',
    english: 'Tea (green tea)',
    category: 'Food & Drink',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['food', 'drinks'],
    examples: [{ japanese: 'お茶はいかがですか？', reading: 'おちゃはいかがですか？', english: 'Would you like some tea?' }],
  },
  {
    id: 'v023',
    kanji: 'ご飯',
    kana: 'ごはん',
    romaji: 'gohan',
    english: 'Rice / Meal',
    category: 'Food & Drink',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['food', 'staple'],
    examples: [{ japanese: 'ご飯を食べましたか？', reading: 'ごはんをたべましたか？', english: 'Did you eat (a meal)?' }],
  },
  {
    id: 'v024',
    kanji: '食べる',
    kana: 'たべる',
    romaji: 'taberu',
    english: 'To eat',
    category: 'Food & Drink',
    pos: 'verb-ru',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['food', 'verbs'],
    examples: [
      { japanese: 'ラーメンを食べたいです。', reading: 'ラーメンをたべたいです。', english: 'I want to eat ramen.' },
    ],
  },
  {
    id: 'v025',
    kanji: '飲む',
    kana: 'のむ',
    romaji: 'nomu',
    english: 'To drink',
    category: 'Food & Drink',
    pos: 'verb-u',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['food', 'verbs'],
    examples: [{ japanese: 'コーヒーを飲みます。', reading: 'コーヒーをのみます。', english: 'I drink coffee.' }],
  },
  {
    id: 'v026',
    kanji: 'メニュー',
    kana: 'メニュー',
    romaji: 'menyuu',
    english: 'Menu',
    category: 'Food & Drink',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['food', 'restaurant'],
    examples: [{ japanese: 'メニューをください。', english: 'Please give me the menu.' }],
  },
  {
    id: 'v027',
    kanji: 'おいしい',
    kana: 'おいしい',
    romaji: 'oishii',
    english: 'Delicious / Tasty',
    category: 'Food & Drink',
    pos: 'i-adj',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['food', 'adjectives'],
    examples: [
      { japanese: 'これはおいしいです！', english: 'This is delicious!' },
    ],
  },
  {
    id: 'v028',
    kanji: 'お会計',
    kana: 'おかいけい',
    romaji: 'okaikei',
    english: 'The bill / Check (at a restaurant)',
    category: 'Food & Drink',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['food', 'restaurant', 'essential'],
    examples: [
      { japanese: 'お会計をお願いします。', reading: 'おかいけいをおねがいします。', english: 'The bill, please.' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// TRANSPORT (v029–v035)
// ─────────────────────────────────────────────────────────────────────────────

const transport: VocabWord[] = [
  {
    id: 'v029',
    kanji: '電車',
    kana: 'でんしゃ',
    romaji: 'densha',
    english: 'Train (electric)',
    category: 'Transport',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['transport', 'essential', 'train'],
    examples: [{ japanese: '電車に乗ります。', reading: 'でんしゃにのります。', english: 'I will take the train.' }],
  },
  {
    id: 'v030',
    kanji: '駅',
    kana: 'えき',
    romaji: 'eki',
    english: 'Station (train)',
    category: 'Transport',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['transport', 'essential'],
    examples: [
      { japanese: '渋谷駅はどこですか？', reading: 'しぶやえきはどこですか？', english: 'Where is Shibuya station?' },
    ],
  },
  {
    id: 'v031',
    kanji: 'バス',
    kana: 'バス',
    romaji: 'basu',
    english: 'Bus',
    category: 'Transport',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['transport'],
    examples: [{ japanese: 'バスで行きます。', reading: 'バスでいきます。', english: 'I\'ll go by bus.' }],
  },
  {
    id: 'v032',
    kanji: 'タクシー',
    kana: 'タクシー',
    romaji: 'takushii',
    english: 'Taxi',
    category: 'Transport',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['transport'],
    examples: [{ japanese: 'タクシーをお願いします。', english: 'Taxi, please.' }],
  },
  {
    id: 'v033',
    kanji: '空港',
    kana: 'くうこう',
    romaji: 'kuukou',
    english: 'Airport',
    category: 'Transport',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['transport', 'airport'],
    examples: [{ japanese: '空港までいくらですか？', reading: 'くうこうまでいくらですか？', english: 'How much is it to the airport?' }],
  },
  {
    id: 'v034',
    kanji: '切符',
    kana: 'きっぷ',
    romaji: 'kippu',
    english: 'Ticket',
    category: 'Transport',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['transport', 'essential'],
    examples: [{ japanese: '切符を一枚ください。', reading: 'きっぷをいちまいください。', english: 'One ticket, please.' }],
  },
  {
    id: 'v035',
    kanji: '乗る',
    kana: 'のる',
    romaji: 'noru',
    english: 'To ride / To get on (transport)',
    category: 'Transport',
    pos: 'verb-u',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['transport', 'verbs'],
    examples: [{ japanese: 'この電車に乗りますか？', reading: 'このでんしゃにのりますか？', english: 'Are you taking this train?' }],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// DIRECTIONS & PLACES (v036–v040)
// ─────────────────────────────────────────────────────────────────────────────

const directions: VocabWord[] = [
  {
    id: 'v036',
    kanji: '右',
    kana: 'みぎ',
    romaji: 'migi',
    english: 'Right (direction)',
    category: 'Directions',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['directions', 'essential'],
    examples: [{ japanese: '右に曲がってください。', reading: 'みぎにまがってください。', english: 'Please turn right.' }],
  },
  {
    id: 'v037',
    kanji: '左',
    kana: 'ひだり',
    romaji: 'hidari',
    english: 'Left (direction)',
    category: 'Directions',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['directions', 'essential'],
    examples: [{ japanese: '左です。', reading: 'ひだりです。', english: 'It\'s on the left.' }],
  },
  {
    id: 'v038',
    kanji: 'まっすぐ',
    kana: 'まっすぐ',
    romaji: 'massugu',
    english: 'Straight ahead',
    category: 'Directions',
    pos: 'adverb',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['directions', 'essential'],
    examples: [{ japanese: 'まっすぐ行ってください。', reading: 'まっすぐいってください。', english: 'Please go straight ahead.' }],
  },
  {
    id: 'v039',
    kanji: 'トイレ',
    kana: 'トイレ',
    romaji: 'toire',
    english: 'Toilet / Bathroom',
    category: 'Places',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['places', 'essential'],
    examples: [{ japanese: 'トイレはどこですか？', english: 'Where is the bathroom?' }],
  },
  {
    id: 'v040',
    kanji: 'ホテル',
    kana: 'ホテル',
    romaji: 'hoteru',
    english: 'Hotel',
    category: 'Accommodation',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['accommodation'],
    examples: [{ japanese: 'ホテルはどこですか？', english: 'Where is the hotel?' }],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION WORDS (v041–v045)
// ─────────────────────────────────────────────────────────────────────────────

const questionWords: VocabWord[] = [
  {
    id: 'v041',
    kanji: 'どこ',
    kana: 'どこ',
    romaji: 'doko',
    english: 'Where',
    category: 'Question Words',
    pos: 'pronoun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['question-words', 'essential'],
    examples: [
      { japanese: '駅はどこですか？', reading: 'えきはどこですか？', english: 'Where is the station?' },
    ],
  },
  {
    id: 'v042',
    kanji: 'いくら',
    kana: 'いくら',
    romaji: 'ikura',
    english: 'How much (price)',
    category: 'Question Words',
    pos: 'pronoun',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['question-words', 'shopping', 'essential'],
    examples: [{ japanese: 'これはいくらですか？', english: 'How much is this?' }],
  },
  {
    id: 'v043',
    kanji: 'いつ',
    kana: 'いつ',
    romaji: 'itsu',
    english: 'When',
    category: 'Question Words',
    pos: 'pronoun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['question-words'],
    examples: [{ japanese: '電車はいつ来ますか？', reading: 'でんしゃはいつきますか？', english: 'When does the train come?' }],
  },
  {
    id: 'v044',
    kanji: 'どうやって',
    kana: 'どうやって',
    romaji: 'dou yatte',
    english: 'How (to do something)',
    category: 'Question Words',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['question-words'],
    examples: [
      { japanese: '駅にどうやって行きますか？', reading: 'えきにどうやっていきますか？', english: 'How do I get to the station?' },
    ],
  },
  {
    id: 'v045',
    kanji: 'だれ',
    kana: 'だれ',
    romaji: 'dare',
    english: 'Who',
    category: 'Question Words',
    pos: 'pronoun',
    jlpt: 'N5',
    travelPriority: 3,
    tags: ['question-words'],
    examples: [{ japanese: 'あの人はだれですか？', reading: 'あのひとはだれですか？', english: 'Who is that person?' }],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EMERGENCY & SAFETY (v046–v050)
// ─────────────────────────────────────────────────────────────────────────────

const emergency: VocabWord[] = [
  {
    id: 'v046',
    kanji: '助けて',
    kana: 'たすけて',
    romaji: 'tasukete',
    english: 'Help me!',
    category: 'Emergency',
    pos: 'expression',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['emergency', 'essential', 'safety'],
    examples: [{ japanese: '助けて！', reading: 'たすけて！', english: 'Help!' }],
  },
  {
    id: 'v047',
    kanji: '警察',
    kana: 'けいさつ',
    romaji: 'keisatsu',
    english: 'Police',
    category: 'Emergency',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['emergency', 'safety'],
    examples: [{ japanese: '警察を呼んでください。', reading: 'けいさつをよんでください。', english: 'Please call the police.' }],
  },
  {
    id: 'v048',
    kanji: '病院',
    kana: 'びょういん',
    romaji: 'byouin',
    english: 'Hospital',
    category: 'Body & Health',
    pos: 'noun',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['emergency', 'health'],
    examples: [{ japanese: '近くの病院はどこですか？', reading: 'ちかくのびょういんはどこですか？', english: 'Where is the nearest hospital?' }],
  },
  {
    id: 'v049',
    kanji: '痛い',
    kana: 'いたい',
    romaji: 'itai',
    english: 'It hurts / Painful',
    category: 'Body & Health',
    pos: 'i-adj',
    jlpt: 'N5',
    travelPriority: 4,
    tags: ['emergency', 'health'],
    examples: [
      { japanese: 'お腹が痛いです。', reading: 'おなかがいたいです。', english: 'My stomach hurts.' },
    ],
  },
  {
    id: 'v050',
    kanji: '大丈夫',
    kana: 'だいじょうぶ',
    romaji: 'daijoubu',
    english: 'It\'s okay / Are you alright?',
    altMeanings: ['No problem', 'Don\'t worry'],
    category: 'Greetings',
    pos: 'na-adj',
    jlpt: 'N5',
    travelPriority: 5,
    tags: ['essential', 'response', 'emergency'],
    examples: [
      { japanese: '大丈夫ですか？', reading: 'だいじょうぶですか？', english: 'Are you okay?' },
      { japanese: '大丈夫です。', reading: 'だいじょうぶです。', english: 'I\'m okay / It\'s fine.' },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

/** Complete N5 vocabulary list (50 words — expand below v050 in future tasks) */
export const n5Vocab: VocabWord[] = [
  ...greetings,
  ...numbers,
  ...foodAndDrink,
  ...transport,
  ...directions,
  ...questionWords,
  ...emergency,
]

/** Words organised by category for the Dictionary page */
export const vocabByCategory = n5Vocab.reduce<Record<string, VocabWord[]>>((acc, word) => {
  if (!acc[word.category]) acc[word.category] = []
  acc[word.category].push(word)
  return acc
}, {})

/** Travel-priority sorted list (5 = most critical) */
export const vocabByTravelPriority = [...n5Vocab].sort(
  (a, b) => b.travelPriority - a.travelPriority
)

/** Look up a single word by ID */
export function getVocabById(id: string): VocabWord | undefined {
  return n5Vocab.find((w) => w.id === id)
}

/** Search vocab by query (searches kanji, kana, romaji, english) */
export function searchVocab(query: string): VocabWord[] {
  const q = query.toLowerCase().trim()
  if (!q) return n5Vocab
  return n5Vocab.filter(
    (w) =>
      w.kanji.includes(q) ||
      w.kana.includes(q) ||
      w.romaji.toLowerCase().includes(q) ||
      w.english.toLowerCase().includes(q) ||
      w.tags?.some((t) => t.includes(q))
  )
}

export default n5Vocab
