/**
 * services/aiService.js
 * Groq API client — raw fetch, SSE streaming, no external SDK needed.
 */

const API_KEY_STORAGE = 'n5lab_groq_key'
const MODEL_STORAGE   = 'n5lab_groq_model'
const GROQ_URL        = 'https://api.groq.com/openai/v1/chat/completions'

export const DEFAULT_MODEL = 'llama-3.1-8b-instant'

export const AVAILABLE_MODELS = [
  { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B', description: 'Fast · Best for everyday questions', badge: 'Recommended' },
  { id: 'llama3-70b-8192',      label: 'Llama 3 70B',  description: 'Smarter · Better grammar explanations', badge: 'Powerful' },
  { id: 'gemma2-9b-it',         label: 'Gemma 2 9B',   description: 'Good Japanese understanding', badge: 'Balanced' },
]

// Storage helpers
export const getApiKey        = () => { try { return localStorage.getItem(API_KEY_STORAGE) } catch { return null } }
export const saveApiKey       = k  => { try { localStorage.setItem(API_KEY_STORAGE, k.trim()) } catch {} }
export const clearApiKey      = () => { try { localStorage.removeItem(API_KEY_STORAGE) } catch {} }
export const hasApiKey        = () => { const k = getApiKey(); return !!(k && k.length > 10) }
export const getSelectedModel = () => { try { return localStorage.getItem(MODEL_STORAGE) ?? DEFAULT_MODEL } catch { return DEFAULT_MODEL } }
export const saveSelectedModel = id => { try { localStorage.setItem(MODEL_STORAGE, id) } catch {} }

// System prompts
const BASE = `You are N5Lab-Sensei (先生), a warm and encouraging Japanese tutor for JLPT N5 beginners.

Style:
🎯 Keep explanations SHORT (2–4 sentences) unless asked for more
🌸 Use emojis naturally — they make learning fun  
📝 Always format Japanese as: 日本語 (romaji) — "English"
✅ Give one concrete example sentence per explanation
🙏 Praise effort briefly and genuinely

Rules:
- Never give inaccurate Japanese. If unsure, say so.
- If beyond N5 level, say "That's beyond N5, but simply put..."
- Stay in character as Sensei always.`

export function buildTutorPrompt(ctx) {
  if (!ctx) return BASE
  return BASE + `\n\n📚 CURRENT LESSON:\n• Module: ${ctx.moduleTitle}\n• Lesson: "${ctx.lessonTitle}" (${ctx.lessonType})${ctx.topic ? `\n• Topic: ${ctx.topic}` : ''}\n\nConnect answers to what the student is studying.`
}

export const ROLEPLAY_SCENARIOS = {
  airport: {
    label: 'Airport', labelJa: 'くうこう', emoji: '✈️',
    firstLine: 'いらっしゃいませ！(Irasshaimase!) ✈️ Welcome to Tokyo Narita! How can I help you today?',
    prompt: 'You are friendly airport staff at Tokyo Narita. Student is a tourist practicing Japanese. Keep responses 1–3 sentences. Use polite Japanese + romaji. Gently correct mistakes by modelling correct form. End with a question. N5 vocabulary only.',
  },
  restaurant: {
    label: 'Restaurant', labelJa: 'レストラン', emoji: '🍜',
    firstLine: 'いらっしゃいませ！(Irasshaimase!) 🍜 Welcome! Please have a seat. Do you have a reservation? (予約はありますか？ Yoyaku wa arimasu ka?)',
    prompt: 'You are a cheerful waiter at a Japanese restaurant. Student is ordering in Japanese. 1–3 sentences, polite Japanese + romaji. Correct mistakes naturally. N5 vocabulary.',
  },
  konbini: {
    label: 'Convenience Store', labelJa: 'コンビニ', emoji: '🏪',
    firstLine: 'いらっしゃいませ！(Irasshaimase!) 🏪 Welcome to 7-Eleven! Looking for something? (何かお探しですか？ Nanika osagashi desu ka?)',
    prompt: 'You are a konbini clerk in Japan. Student is shopping. Short, natural Japanese + romaji. N5 vocabulary. Correct gently.',
  },
  station: {
    label: 'Train Station', labelJa: 'えき', emoji: '🚃',
    firstLine: 'こんにちは！(Konnichiwa!) 🚃 Welcome to Shinjuku Station! Need help with tickets or platforms? (切符やホームはいかがですか？)',
    prompt: 'You are a station attendant at Shinjuku. Help student navigate and buy tickets. Polite Japanese + romaji. N5 vocab. End with a question.',
  },
  hotel: {
    label: 'Hotel Check-in', labelJa: 'ホテル', emoji: '🏨',
    firstLine: 'いらっしゃいませ！(Irasshaimase!) 🏨 Welcome to Hotel Sakura! Do you have a reservation? (ご予約はございますか？ Go-yoyaku wa gozaimasu ka?)',
    prompt: 'You are a polite hotel receptionist in Japan. Student is checking in. Very polite Japanese + romaji. 1–3 sentences. N5–N4 vocab. Correct mistakes gently.',
  },
}

export function buildRoleplayPrompt(id) {
  const s = ROLEPLAY_SCENARIOS[id]
  if (!s) return BASE
  return `${BASE}\n\n--- ROLEPLAY: ${s.label.toUpperCase()} ---\n${s.prompt}\n\nStay in character. Be patient — the student is a beginner.`
}

export async function validateApiKey(key) {
  if (!key || key.length < 10) return { valid: false, error: 'Key is too short.' }
  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: DEFAULT_MODEL, messages: [{ role: 'user', content: 'Hi' }], max_tokens: 5 }),
    })
    if (res.status === 401) return { valid: false, error: 'Invalid API key — double-check and try again.' }
    if (res.status === 429) return { valid: true,  warning: 'Rate limited, but key is valid!' }
    if (!res.ok)            return { valid: false, error: `Server error (${res.status})` }
    return { valid: true }
  } catch { return { valid: false, error: 'Network error — check your connection.' } }
}

export async function streamChat(messages, onChunk, { model, temperature = 0.75, maxTokens = 700 } = {}) {
  const key = getApiKey()
  if (!key) throw new Error('NO_API_KEY')
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: model ?? getSelectedModel(), messages, temperature, max_tokens: maxTokens, stream: true }),
  })
  if (!res.ok) {
    if (res.status === 401) throw new Error('INVALID_KEY')
    if (res.status === 429) throw new Error('RATE_LIMITED')
    throw new Error(`HTTP ${res.status}`)
  }
  const reader = res.body.getReader()
  const dec = new TextDecoder()
  let buf = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const line of lines) {
      const t = line.trim()
      if (!t || t === 'data: [DONE]') continue
      if (!t.startsWith('data: ')) continue
      try {
        const delta = JSON.parse(t.slice(6))?.choices?.[0]?.delta?.content
        if (delta) onChunk(delta, false)
      } catch {}
    }
  }
  onChunk('', true)
}

export function friendlyError(err) {
  const m = err?.message ?? String(err)
  if (m === 'NO_API_KEY')   return 'No API key set — add your Groq key in Settings ⚙️'
  if (m === 'INVALID_KEY')  return 'API key rejected — check it in Settings ⚙️'
  if (m === 'RATE_LIMITED') return 'Groq rate limit hit — wait a moment and try again 🙏'
  return m || 'Something went wrong.'
}
