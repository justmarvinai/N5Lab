/**
 * hooks/useChat.js — Conversation state + streaming for AI Sensei
 */
import { useState, useCallback, useRef } from 'react'
import { streamChat, buildTutorPrompt, buildRoleplayPrompt, ROLEPLAY_SCENARIOS, friendlyError, getSelectedModel } from '../services/aiService'

const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2,6)}`
const MAX_HISTORY = 18

export function useChat({ mode = 'tutor', lessonContext = null, scenarioId = 'airport' } = {}) {
  const [messages,    setMessages]    = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error,       setError]       = useState(null)
  const streamingId = useRef(null)

  const systemPrompt = () =>
    mode === 'roleplay' ? buildRoleplayPrompt(scenarioId) : buildTutorPrompt(lessonContext)

  const startRoleplay = useCallback(() => {
    const s = ROLEPLAY_SCENARIOS[scenarioId]
    if (!s) return
    setMessages([{ id: uid(), role: 'assistant', content: s.firstLine, timestamp: Date.now() }])
    setError(null)
  }, [scenarioId])

  const clearChat = useCallback(() => {
    setMessages([]); setError(null); setIsStreaming(false); streamingId.current = null
  }, [])

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return
    setError(null)
    const userMsg = { id: uid(), role: 'user', content: trimmed, timestamp: Date.now() }
    const aiId    = uid()
    setMessages(prev => [...prev, userMsg, { id: aiId, role: 'assistant', content: '', timestamp: Date.now(), streaming: true }])
    setIsStreaming(true)
    streamingId.current = aiId
    const api = [
      { role: 'system', content: systemPrompt() },
      ...messages.filter(m => !m.streaming).slice(-MAX_HISTORY).map(({ role, content }) => ({ role, content })),
      { role: 'user', content: trimmed },
    ]
    try {
      await streamChat(api, (chunk, done) => {
        if (done) {
          setMessages(prev => prev.map(m => m.id === aiId ? { ...m, streaming: false } : m))
          setIsStreaming(false); streamingId.current = null
        } else {
          setMessages(prev => prev.map(m => m.id === aiId ? { ...m, content: m.content + chunk } : m))
        }
      }, { model: getSelectedModel() })
    } catch (err) {
      setMessages(prev => prev.filter(m => m.id !== aiId))
      setError(friendlyError(err)); setIsStreaming(false); streamingId.current = null
    }
  }, [isStreaming, messages, mode, lessonContext, scenarioId])

  const suggestions = (() => {
    if (mode === 'roleplay') {
      const m = { airport: ['I need help finding my gate.','Where is baggage claim?','I missed my flight.'], restaurant: ['What do you recommend?','I\'d like ramen.','Can I see the menu?'], konbini: ['Where are the drinks?','How much is this?','Do you have an ATM?'], station: ['One ticket to Shibuya.','Which platform?','Is this the express?'], hotel: ['I have a reservation.','What time is checkout?','Extra towels please.'] }
      return m[scenarioId] ?? []
    }
    if (lessonContext?.lessonType === 'kana')    return ['How do I remember this?','What words use this?','How is this pronounced?']
    if (lessonContext?.lessonType === 'grammar')  return ['Give me another example.','When do I use this?','Difference between は and が?']
    if (lessonContext?.lessonType === 'vocab')    return ['Use this in a sentence.','Is this formal or casual?','What\'s a related word?']
    return ['Why is は pronounced "wa"?','Difference between に and で?','How do I say "Excuse me"?','How do I count things?']
  })()

  return { messages, isStreaming, error, sendMessage, startRoleplay, clearChat, suggestions, streamingId: streamingId.current }
}
