/**
 * data/kanaData.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Complete Hiragana and Katakana charts.
 * Includes: Basic 46, Dakuon / Handakuten variants, Combination sounds.
 * Each character has: kana, romaji, paired counterpart, mnemonic hint.
 *
 * Source: Standard Japanese kana charts (Hepburn romanisation).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { KanaScript } from '../types'

// ─── HIRAGANA ─────────────────────────────────────────────────────────────────

export const hiragana: KanaScript = {
  id: 'hiragana',
  label: 'Hiragana',
  labelJa: 'ひらがな',

  // ── Basic 46 ────────────────────────────────────────────────────────────────
  basic: [
    {
      label: 'Vowels',
      labelJa: 'あいうえお',
      lessonId: 'hiragana_vowels',
      characters: [
        { kana: 'あ', romaji: 'a',  pair: 'ア', mnemonic: 'Looks like someone crossing their arms — "Ah!"' },
        { kana: 'い', romaji: 'i',  pair: 'イ', mnemonic: 'Two strokes like two people standing — "ee"' },
        { kana: 'う', romaji: 'u',  pair: 'ウ', mnemonic: 'A small whirlpool — pursed lips for "oo"' },
        { kana: 'え', romaji: 'e',  pair: 'エ', mnemonic: 'Looks like the letter E with a hat — "eh"' },
        { kana: 'お', romaji: 'o',  pair: 'オ', mnemonic: 'Like the letter O with a tail — "oh"' },
      ],
    },
    {
      label: 'K-Row',
      labelJa: 'かきくけこ',
      lessonId: 'hiragana_k',
      characters: [
        { kana: 'か', romaji: 'ka', pair: 'カ', mnemonic: 'Looks like a KArt (go-kart) turning — "ka"' },
        { kana: 'き', romaji: 'ki', pair: 'キ', mnemonic: 'A KEY with a cross — "ki"' },
        { kana: 'く', romaji: 'ku', pair: 'ク', mnemonic: 'Like a bird beak COOing — "ku"' },
        { kana: 'け', romaji: 'ke', pair: 'ケ', mnemonic: 'A KETtle — "ke"' },
        { kana: 'こ', romaji: 'ko', pair: 'コ', mnemonic: 'Two horizontal lines — like a COt seen from above — "ko"' },
      ],
    },
    {
      label: 'S-Row',
      labelJa: 'さしすせそ',
      lessonId: 'hiragana_s',
      characters: [
        { kana: 'さ', romaji: 'sa', pair: 'サ', mnemonic: 'Like a person SAying hello with a wave — "sa"' },
        { kana: 'し', romaji: 'shi', pair: 'シ', mnemonic: 'A fishing hook — SHEep curve — "shi"' },
        { kana: 'す', romaji: 'su', pair: 'ス', mnemonic: 'Superman swinging — "su"' },
        { kana: 'せ', romaji: 'se', pair: 'セ', mnemonic: 'Looks like the katakana セ — "se"' },
        { kana: 'そ', romaji: 'so', pair: 'ソ', mnemonic: 'Like a river flowing — SO peaceful — "so"' },
      ],
    },
    {
      label: 'T-Row',
      labelJa: 'たちつてと',
      lessonId: 'hiragana_t',
      characters: [
        { kana: 'た', romaji: 'ta', pair: 'タ', mnemonic: 'Looks like a TAll person — "ta"' },
        { kana: 'ち', romaji: 'chi', pair: 'チ', mnemonic: 'A CHEerleader with arms up — "chi"' },
        { kana: 'つ', romaji: 'tsu', pair: 'ツ', mnemonic: 'A wave TSUnami — "tsu"' },
        { kana: 'て', romaji: 'te', pair: 'テ', mnemonic: 'Like a TEacup with a handle — "te"' },
        { kana: 'と', romaji: 'to', pair: 'ト', mnemonic: 'A TOtem pole — "to"' },
      ],
    },
    {
      label: 'N-Row',
      labelJa: 'なにぬねの',
      lessonId: 'hiragana_n',
      characters: [
        { kana: 'な', romaji: 'na', pair: 'ナ', mnemonic: 'Looks like two NAtural lines crossing — "na"' },
        { kana: 'に', romaji: 'ni', pair: 'ニ', mnemonic: 'Two lines like a NEEdle — "ni"' },
        { kana: 'ぬ', romaji: 'nu', pair: 'ヌ', mnemonic: 'Like NEWdles (noodles) being swirled — "nu"' },
        { kana: 'ね', romaji: 'ne', pair: 'ネ', mnemonic: 'Like a cat NEsting — "ne"' },
        { kana: 'の', romaji: 'no', pair: 'ノ', mnemonic: 'A simple loop — NO worries — "no"' },
      ],
    },
    {
      label: 'H-Row',
      labelJa: 'はひふへほ',
      lessonId: 'hiragana_h',
      characters: [
        { kana: 'は', romaji: 'ha', pair: 'ハ', mnemonic: 'Like someone HAhaha laughing — "ha"' },
        { kana: 'ひ', romaji: 'hi', pair: 'ヒ', mnemonic: 'Like a HEEd (listen!) shape — "hi"' },
        { kana: 'ふ', romaji: 'fu', pair: 'フ', mnemonic: 'Like Mt. FUji — "fu"' },
        { kana: 'へ', romaji: 'he', pair: 'ヘ', mnemonic: 'Like a mountain HEadband — "he"' },
        { kana: 'ほ', romaji: 'ho', pair: 'ホ', mnemonic: 'Like HOly cross with arms — "ho"' },
      ],
    },
    {
      label: 'M-Row',
      labelJa: 'まみむめも',
      lessonId: 'hiragana_m',
      characters: [
        { kana: 'ま', romaji: 'ma', pair: 'マ', mnemonic: 'Like a MAma holding a child — "ma"' },
        { kana: 'み', romaji: 'mi', pair: 'ミ', mnemonic: 'Three lines like MEeow whiskers — "mi"' },
        { kana: 'む', romaji: 'mu', pair: 'ム', mnemonic: 'Like a MOO-ing cow head — "mu"' },
        { kana: 'め', romaji: 'me', pair: 'メ', mnemonic: 'Like an eye (ME = eye) — "me"' },
        { kana: 'も', romaji: 'mo', pair: 'モ', mnemonic: 'Like MORE (more strokes) — "mo"' },
      ],
    },
    {
      label: 'Y-Row',
      labelJa: 'やゆよ',
      lessonId: 'hiragana_y',
      characters: [
        { kana: 'や', romaji: 'ya', pair: 'ヤ', mnemonic: 'Like a YAk — "ya"' },
        { kana: 'ゆ', romaji: 'yu', pair: 'ユ', mnemonic: 'Like a YOU-niverse swirl — "yu"' },
        { kana: 'よ', romaji: 'yo', pair: 'ヨ', mnemonic: 'Like YO-ga pose — "yo"' },
      ],
    },
    {
      label: 'R-Row',
      labelJa: 'らりるれろ',
      lessonId: 'hiragana_r',
      characters: [
        { kana: 'ら', romaji: 'ra', pair: 'ラ', mnemonic: 'Like a RAdio antenna — "ra"' },
        { kana: 'り', romaji: 'ri', pair: 'リ', mnemonic: 'Two strokes like a REEd — "ri"' },
        { kana: 'る', romaji: 'ru', pair: 'ル', mnemonic: 'Like a ROOster tail — "ru"' },
        { kana: 'れ', romaji: 're', pair: 'レ', mnemonic: 'Like a REd flag on a pole — "re"' },
        { kana: 'ろ', romaji: 'ro', pair: 'ロ', mnemonic: 'Like a ROad loop — "ro"' },
      ],
    },
    {
      label: 'W-Row + ん',
      labelJa: 'わをん',
      lessonId: 'hiragana_w',
      characters: [
        { kana: 'わ', romaji: 'wa', pair: 'ワ', mnemonic: 'Like WAtching — arm stretched out — "wa"' },
        { kana: 'を', romaji: 'wo', pair: 'ヲ', mnemonic: 'Like a WOman leaning — "wo" (object particle)' },
        { kana: 'ん', romaji: 'n',  pair: 'ン', mnemonic: 'Like a backwards N — stands alone — "n"' },
      ],
    },
  ],

  // ── Dakuon (voiced) & Handakuten (semi-voiced) ───────────────────────────
  dakuon: [
    {
      label: 'G-Row (voiced K)',
      labelJa: 'がぎぐげご',
      lessonId: 'hiragana_dakuten',
      characters: [
        { kana: 'が', romaji: 'ga', pair: 'ガ', mnemonic: 'か + ゛ = voiced "ga"' },
        { kana: 'ぎ', romaji: 'gi', pair: 'ギ', mnemonic: 'き + ゛ = voiced "gi"' },
        { kana: 'ぐ', romaji: 'gu', pair: 'グ', mnemonic: 'く + ゛ = voiced "gu"' },
        { kana: 'げ', romaji: 'ge', pair: 'ゲ', mnemonic: 'け + ゛ = voiced "ge"' },
        { kana: 'ご', romaji: 'go', pair: 'ゴ', mnemonic: 'こ + ゛ = voiced "go"' },
      ],
    },
    {
      label: 'Z-Row (voiced S)',
      labelJa: 'ざじずぜぞ',
      lessonId: 'hiragana_dakuten',
      characters: [
        { kana: 'ざ', romaji: 'za', pair: 'ザ', mnemonic: 'さ + ゛ = voiced "za"' },
        { kana: 'じ', romaji: 'ji', pair: 'ジ', mnemonic: 'し + ゛ = voiced "ji"' },
        { kana: 'ず', romaji: 'zu', pair: 'ズ', mnemonic: 'す + ゛ = voiced "zu"' },
        { kana: 'ぜ', romaji: 'ze', pair: 'ゼ', mnemonic: 'せ + ゛ = voiced "ze"' },
        { kana: 'ぞ', romaji: 'zo', pair: 'ゾ', mnemonic: 'そ + ゛ = voiced "zo"' },
      ],
    },
    {
      label: 'D-Row (voiced T)',
      labelJa: 'だぢづでど',
      lessonId: 'hiragana_dakuten',
      characters: [
        { kana: 'だ', romaji: 'da', pair: 'ダ', mnemonic: 'た + ゛ = voiced "da"' },
        { kana: 'ぢ', romaji: 'ji', pair: 'ヂ', mnemonic: 'ち + ゛ = "ji" (rare variant)' },
        { kana: 'づ', romaji: 'zu', pair: 'ヅ', mnemonic: 'つ + ゛ = "zu" (rare variant)' },
        { kana: 'で', romaji: 'de', pair: 'デ', mnemonic: 'て + ゛ = voiced "de"' },
        { kana: 'ど', romaji: 'do', pair: 'ド', mnemonic: 'と + ゛ = voiced "do"' },
      ],
    },
    {
      label: 'B-Row (voiced H)',
      labelJa: 'ばびぶべぼ',
      lessonId: 'hiragana_dakuten',
      characters: [
        { kana: 'ば', romaji: 'ba', pair: 'バ', mnemonic: 'は + ゛ = voiced "ba"' },
        { kana: 'び', romaji: 'bi', pair: 'ビ', mnemonic: 'ひ + ゛ = voiced "bi"' },
        { kana: 'ぶ', romaji: 'bu', pair: 'ブ', mnemonic: 'ふ + ゛ = voiced "bu"' },
        { kana: 'べ', romaji: 'be', pair: 'ベ', mnemonic: 'へ + ゛ = voiced "be"' },
        { kana: 'ぼ', romaji: 'bo', pair: 'ボ', mnemonic: 'ほ + ゛ = voiced "bo"' },
      ],
    },
    {
      label: 'P-Row (semi-voiced H)',
      labelJa: 'ぱぴぷぺぽ',
      lessonId: 'hiragana_dakuten',
      characters: [
        { kana: 'ぱ', romaji: 'pa', pair: 'パ', mnemonic: 'は + ゜ = semi-voiced "pa"' },
        { kana: 'ぴ', romaji: 'pi', pair: 'ピ', mnemonic: 'ひ + ゜ = semi-voiced "pi"' },
        { kana: 'ぷ', romaji: 'pu', pair: 'プ', mnemonic: 'ふ + ゜ = semi-voiced "pu"' },
        { kana: 'ぺ', romaji: 'pe', pair: 'ペ', mnemonic: 'へ + ゜ = semi-voiced "pe"' },
        { kana: 'ぽ', romaji: 'po', pair: 'ポ', mnemonic: 'ほ + ゜ = semi-voiced "po"' },
      ],
    },
  ],

  // ── Combination sounds (digraphs) ────────────────────────────────────────
  combinations: [
    {
      label: 'KY- Combinations',
      labelJa: 'きゃきゅきょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'きゃ', romaji: 'kya', pair: 'キャ', mnemonic: 'き + small や → kya' },
        { kana: 'きゅ', romaji: 'kyu', pair: 'キュ', mnemonic: 'き + small ゆ → kyu' },
        { kana: 'きょ', romaji: 'kyo', pair: 'キョ', mnemonic: 'き + small よ → kyo' },
      ],
    },
    {
      label: 'SH- Combinations',
      labelJa: 'しゃしゅしょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'しゃ', romaji: 'sha', pair: 'シャ', mnemonic: 'し + small や → sha' },
        { kana: 'しゅ', romaji: 'shu', pair: 'シュ', mnemonic: 'し + small ゆ → shu' },
        { kana: 'しょ', romaji: 'sho', pair: 'ショ', mnemonic: 'し + small よ → sho' },
      ],
    },
    {
      label: 'CH- Combinations',
      labelJa: 'ちゃちゅちょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'ちゃ', romaji: 'cha', pair: 'チャ', mnemonic: 'ち + small や → cha' },
        { kana: 'ちゅ', romaji: 'chu', pair: 'チュ', mnemonic: 'ち + small ゆ → chu' },
        { kana: 'ちょ', romaji: 'cho', pair: 'チョ', mnemonic: 'ち + small よ → cho' },
      ],
    },
    {
      label: 'NY- Combinations',
      labelJa: 'にゃにゅにょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'にゃ', romaji: 'nya', pair: 'ニャ', mnemonic: 'に + small や → nya' },
        { kana: 'にゅ', romaji: 'nyu', pair: 'ニュ', mnemonic: 'に + small ゆ → nyu' },
        { kana: 'にょ', romaji: 'nyo', pair: 'ニョ', mnemonic: 'に + small よ → nyo' },
      ],
    },
    {
      label: 'HY- Combinations',
      labelJa: 'ひゃひゅひょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'ひゃ', romaji: 'hya', pair: 'ヒャ', mnemonic: 'ひ + small や → hya' },
        { kana: 'ひゅ', romaji: 'hyu', pair: 'ヒュ', mnemonic: 'ひ + small ゆ → hyu' },
        { kana: 'ひょ', romaji: 'hyo', pair: 'ヒョ', mnemonic: 'ひ + small よ → hyo' },
      ],
    },
    {
      label: 'MY- Combinations',
      labelJa: 'みゃみゅみょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'みゃ', romaji: 'mya', pair: 'ミャ', mnemonic: 'み + small や → mya' },
        { kana: 'みゅ', romaji: 'myu', pair: 'ミュ', mnemonic: 'み + small ゆ → myu' },
        { kana: 'みょ', romaji: 'myo', pair: 'ミョ', mnemonic: 'み + small よ → myo' },
      ],
    },
    {
      label: 'RY- Combinations',
      labelJa: 'りゃりゅりょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'りゃ', romaji: 'rya', pair: 'リャ', mnemonic: 'り + small や → rya' },
        { kana: 'りゅ', romaji: 'ryu', pair: 'リュ', mnemonic: 'り + small ゆ → ryu' },
        { kana: 'りょ', romaji: 'ryo', pair: 'リョ', mnemonic: 'り + small よ → ryo' },
      ],
    },
    {
      label: 'GY- Combinations',
      labelJa: 'ぎゃぎゅぎょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'ぎゃ', romaji: 'gya', pair: 'ギャ', mnemonic: 'ぎ + small や → gya' },
        { kana: 'ぎゅ', romaji: 'gyu', pair: 'ギュ', mnemonic: 'ぎ + small ゆ → gyu' },
        { kana: 'ぎょ', romaji: 'gyo', pair: 'ギョ', mnemonic: 'ぎ + small よ → gyo' },
      ],
    },
    {
      label: 'J- Combinations',
      labelJa: 'じゃじゅじょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'じゃ', romaji: 'ja', pair: 'ジャ', mnemonic: 'じ + small や → ja' },
        { kana: 'じゅ', romaji: 'ju', pair: 'ジュ', mnemonic: 'じ + small ゆ → ju' },
        { kana: 'じょ', romaji: 'jo', pair: 'ジョ', mnemonic: 'じ + small よ → jo' },
      ],
    },
    {
      label: 'BY- Combinations',
      labelJa: 'びゃびゅびょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'びゃ', romaji: 'bya', pair: 'ビャ', mnemonic: 'び + small や → bya' },
        { kana: 'びゅ', romaji: 'byu', pair: 'ビュ', mnemonic: 'び + small ゆ → byu' },
        { kana: 'びょ', romaji: 'byo', pair: 'ビョ', mnemonic: 'び + small よ → byo' },
      ],
    },
    {
      label: 'PY- Combinations',
      labelJa: 'ぴゃぴゅぴょ',
      lessonId: 'hiragana_combo',
      characters: [
        { kana: 'ぴゃ', romaji: 'pya', pair: 'ピャ', mnemonic: 'ぴ + small や → pya' },
        { kana: 'ぴゅ', romaji: 'pyu', pair: 'ピュ', mnemonic: 'ぴ + small ゆ → pyu' },
        { kana: 'ぴょ', romaji: 'pyo', pair: 'ピョ', mnemonic: 'ぴ + small よ → pyo' },
      ],
    },
  ],
}

// ─── KATAKANA ─────────────────────────────────────────────────────────────────

export const katakana: KanaScript = {
  id: 'katakana',
  label: 'Katakana',
  labelJa: 'カタカナ',

  // ── Basic 46 ────────────────────────────────────────────────────────────────
  basic: [
    {
      label: 'Vowels',
      labelJa: 'アイウエオ',
      lessonId: 'katakana_vowels',
      characters: [
        { kana: 'ア', romaji: 'a',   pair: 'あ', mnemonic: 'Like a capital A without the crossbar — "ah"' },
        { kana: 'イ', romaji: 'i',   pair: 'い', mnemonic: 'Like the number 1 with a slant — "ee"' },
        { kana: 'ウ', romaji: 'u',   pair: 'う', mnemonic: 'Like a crown — "oo"' },
        { kana: 'エ', romaji: 'e',   pair: 'え', mnemonic: 'Like the letter I with crossbars — "eh"' },
        { kana: 'オ', romaji: 'o',   pair: 'お', mnemonic: 'Like an antenna — "oh"' },
      ],
    },
    {
      label: 'K-Row',
      labelJa: 'カキクケコ',
      lessonId: 'katakana_k',
      characters: [
        { kana: 'カ', romaji: 'ka',  pair: 'か', mnemonic: 'Like a KArate chop — "ka"' },
        { kana: 'キ', romaji: 'ki',  pair: 'き', mnemonic: 'Like a KEY — "ki"' },
        { kana: 'ク', romaji: 'ku',  pair: 'く', mnemonic: 'Like a bird beak COOing — "ku"' },
        { kana: 'ケ', romaji: 'ke',  pair: 'け', mnemonic: 'Like a KETtle with a handle — "ke"' },
        { kana: 'コ', romaji: 'ko',  pair: 'こ', mnemonic: 'Like two parallel lines — COrner — "ko"' },
      ],
    },
    {
      label: 'S-Row',
      labelJa: 'サシスセソ',
      lessonId: 'katakana_s',
      characters: [
        { kana: 'サ', romaji: 'sa',  pair: 'さ', mnemonic: 'Like a person SAying hi — "sa"' },
        { kana: 'シ', romaji: 'shi', pair: 'し', mnemonic: 'Three lines like a SHEep — "shi"' },
        { kana: 'ス', romaji: 'su',  pair: 'す', mnemonic: 'Like a SWing — "su"' },
        { kana: 'セ', romaji: 'se',  pair: 'せ', mnemonic: 'Like a SAY sign — "se"' },
        { kana: 'ソ', romaji: 'so',  pair: 'そ', mnemonic: 'Like a simple slash — SO easy — "so"' },
      ],
    },
    {
      label: 'T-Row',
      labelJa: 'タチツテト',
      lessonId: 'katakana_t',
      characters: [
        { kana: 'タ', romaji: 'ta',  pair: 'た', mnemonic: 'Like a TArget — "ta"' },
        { kana: 'チ', romaji: 'chi', pair: 'ち', mnemonic: 'Like a CHEer shape — "chi"' },
        { kana: 'ツ', romaji: 'tsu', pair: 'つ', mnemonic: 'Like a smiling face — TSUnami grin — "tsu"' },
        { kana: 'テ', romaji: 'te',  pair: 'て', mnemonic: 'Like a TElevision antenna — "te"' },
        { kana: 'ト', romaji: 'to',  pair: 'と', mnemonic: 'Like a TOtem — "to"' },
      ],
    },
    {
      label: 'N-Row',
      labelJa: 'ナニヌネノ',
      lessonId: 'katakana_n',
      characters: [
        { kana: 'ナ', romaji: 'na',  pair: 'な', mnemonic: 'Like a plus sign — NAturally — "na"' },
        { kana: 'ニ', romaji: 'ni',  pair: 'に', mnemonic: 'Like two parallel lines — NIce and even — "ni"' },
        { kana: 'ヌ', romaji: 'nu',  pair: 'ぬ', mnemonic: 'Like a NEW noodle shape — "nu"' },
        { kana: 'ネ', romaji: 'ne',  pair: 'ね', mnemonic: 'Like a NEst on a post — "ne"' },
        { kana: 'ノ', romaji: 'no',  pair: 'の', mnemonic: 'A single diagonal stroke — NO doubt — "no"' },
      ],
    },
    {
      label: 'H-Row',
      labelJa: 'ハヒフヘホ',
      lessonId: 'katakana_h',
      characters: [
        { kana: 'ハ', romaji: 'ha',  pair: 'は', mnemonic: 'Like legs spread wide — HAhaha — "ha"' },
        { kana: 'ヒ', romaji: 'hi',  pair: 'ひ', mnemonic: 'Like HEE (laugh) — "hi"' },
        { kana: 'フ', romaji: 'fu',  pair: 'ふ', mnemonic: 'Like a FU (FUji) hook — "fu"' },
        { kana: 'ヘ', romaji: 'he',  pair: 'へ', mnemonic: 'Like a mountain peak — HEight — "he"' },
        { kana: 'ホ', romaji: 'ho',  pair: 'ほ', mnemonic: 'Like a HOly cross — "ho"' },
      ],
    },
    {
      label: 'M-Row',
      labelJa: 'マミムメモ',
      lessonId: 'katakana_m',
      characters: [
        { kana: 'マ', romaji: 'ma',  pair: 'ま', mnemonic: 'Like MAma with a hook — "ma"' },
        { kana: 'ミ', romaji: 'mi',  pair: 'み', mnemonic: 'Three lines — MEeow whiskers — "mi"' },
        { kana: 'ム', romaji: 'mu',  pair: 'む', mnemonic: 'Like a MOO from a cow — "mu"' },
        { kana: 'メ', romaji: 'me',  pair: 'め', mnemonic: 'Like the letter X — MEmorise — "me"' },
        { kana: 'モ', romaji: 'mo',  pair: 'も', mnemonic: 'Like MORE lines — "mo"' },
      ],
    },
    {
      label: 'Y-Row',
      labelJa: 'ヤユヨ',
      lessonId: 'katakana_y',
      characters: [
        { kana: 'ヤ', romaji: 'ya',  pair: 'や', mnemonic: 'Like a YArd post — "ya"' },
        { kana: 'ユ', romaji: 'yu',  pair: 'ゆ', mnemonic: 'Like a U-turn — YOU — "yu"' },
        { kana: 'ヨ', romaji: 'yo',  pair: 'よ', mnemonic: 'Like the letter E — YOga — "yo"' },
      ],
    },
    {
      label: 'R-Row',
      labelJa: 'ラリルレロ',
      lessonId: 'katakana_r',
      characters: [
        { kana: 'ラ', romaji: 'ra',  pair: 'ら', mnemonic: 'Like a RAdio with a hook — "ra"' },
        { kana: 'リ', romaji: 'ri',  pair: 'り', mnemonic: 'Like two parallel lines — REEds — "ri"' },
        { kana: 'ル', romaji: 'ru',  pair: 'る', mnemonic: 'Like RULE — lines branching — "ru"' },
        { kana: 'レ', romaji: 're',  pair: 'れ', mnemonic: 'Like a LEaning stroke — REd — "re"' },
        { kana: 'ロ', romaji: 'ro',  pair: 'ろ', mnemonic: 'Like a ROom — square shape — "ro"' },
      ],
    },
    {
      label: 'W-Row + ン',
      labelJa: 'ワヲン',
      lessonId: 'katakana_w',
      characters: [
        { kana: 'ワ', romaji: 'wa',  pair: 'わ', mnemonic: 'Like WAtching — wide open — "wa"' },
        { kana: 'ヲ', romaji: 'wo',  pair: 'を', mnemonic: 'Like a WOrking man — "wo" (object particle)' },
        { kana: 'ン', romaji: 'n',   pair: 'ん', mnemonic: 'Like a backwards ソ — "n"' },
      ],
    },
  ],

  // ── Dakuon ───────────────────────────────────────────────────────────────
  dakuon: [
    {
      label: 'G-Row',
      labelJa: 'ガギグゲゴ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ガ', romaji: 'ga',  pair: 'が' },
        { kana: 'ギ', romaji: 'gi',  pair: 'ぎ' },
        { kana: 'グ', romaji: 'gu',  pair: 'ぐ' },
        { kana: 'ゲ', romaji: 'ge',  pair: 'げ' },
        { kana: 'ゴ', romaji: 'go',  pair: 'ご' },
      ],
    },
    {
      label: 'Z-Row',
      labelJa: 'ザジズゼゾ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ザ', romaji: 'za',  pair: 'ざ' },
        { kana: 'ジ', romaji: 'ji',  pair: 'じ' },
        { kana: 'ズ', romaji: 'zu',  pair: 'ず' },
        { kana: 'ゼ', romaji: 'ze',  pair: 'ぜ' },
        { kana: 'ゾ', romaji: 'zo',  pair: 'ぞ' },
      ],
    },
    {
      label: 'D-Row',
      labelJa: 'ダヂヅデド',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ダ', romaji: 'da',  pair: 'だ' },
        { kana: 'ヂ', romaji: 'ji',  pair: 'ぢ' },
        { kana: 'ヅ', romaji: 'zu',  pair: 'づ' },
        { kana: 'デ', romaji: 'de',  pair: 'で' },
        { kana: 'ド', romaji: 'do',  pair: 'ど' },
      ],
    },
    {
      label: 'B-Row',
      labelJa: 'バビブベボ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'バ', romaji: 'ba',  pair: 'ば' },
        { kana: 'ビ', romaji: 'bi',  pair: 'び' },
        { kana: 'ブ', romaji: 'bu',  pair: 'ぶ' },
        { kana: 'ベ', romaji: 'be',  pair: 'べ' },
        { kana: 'ボ', romaji: 'bo',  pair: 'ぼ' },
      ],
    },
    {
      label: 'P-Row',
      labelJa: 'パピプペポ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'パ', romaji: 'pa',  pair: 'ぱ' },
        { kana: 'ピ', romaji: 'pi',  pair: 'ぴ' },
        { kana: 'プ', romaji: 'pu',  pair: 'ぷ' },
        { kana: 'ペ', romaji: 'pe',  pair: 'ぺ' },
        { kana: 'ポ', romaji: 'po',  pair: 'ぽ' },
      ],
    },
    // ── Katakana-only extensions (for foreign loanwords) ──────────────────
    {
      label: 'Extended: V-Sounds',
      labelJa: 'ヴ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ヴ', romaji: 'vu', mnemonic: 'ウ + ゛ = "vu" — used in loanwords like ヴァイオリン (violin)' },
      ],
    },
    {
      label: 'Extended: F/T/D Loanwords',
      labelJa: 'ファティディ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ファ', romaji: 'fa',  mnemonic: 'フ + small ア — for foreign "fa" sounds' },
        { kana: 'フィ', romaji: 'fi',  mnemonic: 'フ + small イ — for foreign "fi" sounds' },
        { kana: 'フェ', romaji: 'fe',  mnemonic: 'フ + small エ — for foreign "fe" sounds' },
        { kana: 'フォ', romaji: 'fo',  mnemonic: 'フ + small オ — for foreign "fo" sounds' },
        { kana: 'ティ', romaji: 'ti',  mnemonic: 'テ + small イ — for foreign "ti" sounds' },
        { kana: 'ディ', romaji: 'di',  mnemonic: 'デ + small イ — for foreign "di" sounds' },
        { kana: 'トゥ', romaji: 'tu',  mnemonic: 'ト + small ウ — for foreign "tu" sounds' },
        { kana: 'ドゥ', romaji: 'du',  mnemonic: 'ド + small ウ — for foreign "du" sounds' },
        { kana: 'ウィ', romaji: 'wi',  mnemonic: 'ウ + small イ — for foreign "wi" sounds' },
        { kana: 'ウェ', romaji: 'we',  mnemonic: 'ウ + small エ — for foreign "we" sounds' },
        { kana: 'ウォ', romaji: 'wo',  mnemonic: 'ウ + small オ — for foreign "wo" sounds' },
      ],
    },
  ],

  // ── Combinations (mirrors hiragana) ──────────────────────────────────────
  combinations: [
    {
      label: 'KY- Combinations',
      labelJa: 'キャキュキョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'キャ', romaji: 'kya', pair: 'きゃ' },
        { kana: 'キュ', romaji: 'kyu', pair: 'きゅ' },
        { kana: 'キョ', romaji: 'kyo', pair: 'きょ' },
      ],
    },
    {
      label: 'SH- Combinations',
      labelJa: 'シャシュショ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'シャ', romaji: 'sha', pair: 'しゃ' },
        { kana: 'シュ', romaji: 'shu', pair: 'しゅ' },
        { kana: 'ショ', romaji: 'sho', pair: 'しょ' },
      ],
    },
    {
      label: 'CH- Combinations',
      labelJa: 'チャチュチョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'チャ', romaji: 'cha', pair: 'ちゃ' },
        { kana: 'チュ', romaji: 'chu', pair: 'ちゅ' },
        { kana: 'チョ', romaji: 'cho', pair: 'ちょ' },
      ],
    },
    {
      label: 'NY- Combinations',
      labelJa: 'ニャニュニョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ニャ', romaji: 'nya', pair: 'にゃ' },
        { kana: 'ニュ', romaji: 'nyu', pair: 'にゅ' },
        { kana: 'ニョ', romaji: 'nyo', pair: 'にょ' },
      ],
    },
    {
      label: 'HY- Combinations',
      labelJa: 'ヒャヒュヒョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ヒャ', romaji: 'hya', pair: 'ひゃ' },
        { kana: 'ヒュ', romaji: 'hyu', pair: 'ひゅ' },
        { kana: 'ヒョ', romaji: 'hyo', pair: 'ひょ' },
      ],
    },
    {
      label: 'MY- Combinations',
      labelJa: 'ミャミュミョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ミャ', romaji: 'mya', pair: 'みゃ' },
        { kana: 'ミュ', romaji: 'myu', pair: 'みゅ' },
        { kana: 'ミョ', romaji: 'myo', pair: 'みょ' },
      ],
    },
    {
      label: 'RY- Combinations',
      labelJa: 'リャリュリョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'リャ', romaji: 'rya', pair: 'りゃ' },
        { kana: 'リュ', romaji: 'ryu', pair: 'りゅ' },
        { kana: 'リョ', romaji: 'ryo', pair: 'りょ' },
      ],
    },
    {
      label: 'GY- Combinations',
      labelJa: 'ギャギュギョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ギャ', romaji: 'gya', pair: 'ぎゃ' },
        { kana: 'ギュ', romaji: 'gyu', pair: 'ぎゅ' },
        { kana: 'ギョ', romaji: 'gyo', pair: 'ぎょ' },
      ],
    },
    {
      label: 'J- Combinations',
      labelJa: 'ジャジュジョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ジャ', romaji: 'ja', pair: 'じゃ' },
        { kana: 'ジュ', romaji: 'ju', pair: 'じゅ' },
        { kana: 'ジョ', romaji: 'jo', pair: 'じょ' },
      ],
    },
    {
      label: 'BY- Combinations',
      labelJa: 'ビャビュビョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ビャ', romaji: 'bya', pair: 'びゃ' },
        { kana: 'ビュ', romaji: 'byu', pair: 'びゅ' },
        { kana: 'ビョ', romaji: 'byo', pair: 'びょ' },
      ],
    },
    {
      label: 'PY- Combinations',
      labelJa: 'ピャピュピョ',
      lessonId: 'katakana_dakuten',
      characters: [
        { kana: 'ピャ', romaji: 'pya', pair: 'ぴゃ' },
        { kana: 'ピュ', romaji: 'pyu', pair: 'ぴゅ' },
        { kana: 'ピョ', romaji: 'pyo', pair: 'ぴょ' },
      ],
    },
  ],
}

// ─── Convenience exports ──────────────────────────────────────────────────────

/** All hiragana characters flattened to a single array (basic only) */
export const allHiraganaBasic: import('../types').KanaChar[] = hiragana.basic.flatMap((r) => r.characters)

/** All katakana characters flattened to a single array (basic only) */
export const allKatakanaBasic: import('../types').KanaChar[] = katakana.basic.flatMap((r) => r.characters)

/** Both scripts together */
export const kanaData = { hiragana, katakana } as const
