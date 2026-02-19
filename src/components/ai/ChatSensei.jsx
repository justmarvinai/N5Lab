/**
 * components/ai/ChatSensei.jsx
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Send, RotateCcw, ChevronLeft,
  Sparkles, MessagesSquare, AlertCircle, Settings, ArrowRight,
} from 'lucide-react'
import { useChat } from '../../hooks/useChat'
import { hasApiKey, ROLEPLAY_SCENARIOS } from '../../services/aiService'
import SettingsModal from '../settings/SettingsModal'

// ─── Sensei avatar ────────────────────────────────────────────────────────────

function Avatar({ size = 32, pulse = false }) {
  return (
    <motion.div
      animate={pulse ? { scale: [1, 1.1, 1] } : {}}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      className="rounded-xl bg-ink border border-gold/40 flex items-center justify-center shrink-0 shadow-sm"
      style={{ width: size, height: size }}
    >
      <span className="font-japanese text-gold" style={{ fontSize: size * 0.44 }}>先</span>
    </motion.div>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex gap-1 py-0.5">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-mist"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

// ─── Cursor blink (for streaming) ─────────────────────────────────────────────

function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.55, repeat: Infinity }}
      className="inline-block w-0.5 h-[1.1em] bg-ink ml-0.5 align-[-0.15em]"
    />
  )
}

// ─── Inline markdown (bold, code, newlines) ───────────────────────────────────

function MsgText({ text, isStreaming }) {
  if (!text && isStreaming) return <TypingDots />
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, li) => {
        const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
        return (
          <span key={li}>
            {parts.map((p, pi) => {
              if (p.startsWith('**') && p.endsWith('**'))
                return <strong key={pi} className="font-600">{p.slice(2, -2)}</strong>
              if (p.startsWith('`') && p.endsWith('`'))
                return <code key={pi} className="font-mono text-[0.85em] px-1 py-0.5 rounded bg-black/10">{p.slice(1, -1)}</code>
              return p
            })}
            {li < lines.length - 1 && <br />}
          </span>
        )
      })}
      {isStreaming && text && <Cursor />}
    </>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function Bubble({ msg, isStreaming }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {!isUser && <Avatar size={30} pulse={isStreaming} />}

      <div className={`max-w-[82%] flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-0.5`}>
        <div className={`
          px-3.5 py-2.5 text-sm leading-relaxed
          ${isUser
            ? 'bg-ink text-washi rounded-2xl rounded-tr-sm'
            : 'bg-white border border-washi-warm text-ink rounded-2xl rounded-tl-sm shadow-paper'
          }
          ${isStreaming && !msg.content ? 'min-w-[56px]' : ''}
        `}>
          <MsgText text={msg.content} isStreaming={isStreaming && !msg.content ? false : isStreaming} />
        </div>
        <span className="text-[9px] text-mist px-1">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Suggestion chips ─────────────────────────────────────────────────────────

function Chips({ items, onPick }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
      {items.map(s => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-washi-warm bg-white text-ink-muted
                     hover:bg-washi-soft hover:text-ink hover:border-mist transition-all duration-150 whitespace-nowrap"
        >
          {s}
        </button>
      ))}
    </div>
  )
}

// ─── No API key gate ──────────────────────────────────────────────────────────

function NoKeyGate({ onSetup }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-5">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.05 }}
        className="w-20 h-20 rounded-2xl bg-ink border-2 border-gold/40 flex items-center justify-center shadow-lifted"
      >
        <span className="font-japanese text-gold text-3xl">先</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h3 className="font-display text-xl font-400 text-ink mb-2">Meet your AI Sensei</h3>
        <p className="text-sm text-mist leading-relaxed max-w-xs">
          Add a <strong className="text-ink font-500">free Groq API key</strong> to unlock your personal Japanese tutor and immersive conversation practice.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex flex-col items-center gap-3"
      >
        <button onClick={onSetup} className="btn-primary gap-2 px-6 py-3">
          <Settings size={15} />
          Add Groq API Key
          <ArrowRight size={13} />
        </button>
        <a
          href="https://console.groq.com/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-mist hover:text-ink transition-colors"
        >
          Get a free key at console.groq.com →
        </a>
      </motion.div>
    </div>
  )
}

// ─── Roleplay scenario picker ─────────────────────────────────────────────────

function ScenarioPicker({ selected, onChange, onStart }) {
  return (
    <div className="flex-1 flex flex-col px-4 py-4 gap-4 overflow-y-auto">
      <div>
        <p className="text-xs font-mono text-mist uppercase tracking-widest mb-3">Choose a scenario</p>
        <div className="space-y-2">
          {Object.entries(ROLEPLAY_SCENARIOS).map(([id, s]) => (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`
                w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border-2 text-left
                transition-all duration-150
                ${selected === id ? 'border-lacquer bg-lacquer-muted' : 'border-washi-warm bg-white hover:border-mist'}
              `}
            >
              <span className="text-xl shrink-0">{s.emoji}</span>
              <div className="flex-1">
                <div className="text-sm font-500 text-ink">{s.label}</div>
                <div className="text-[11px] font-japanese text-mist">{s.labelJa}</div>
              </div>
              <motion.div
                animate={{ opacity: selected === id ? 1 : 0, scale: selected === id ? 1 : 0.5 }}
                className="w-4 h-4 rounded-full bg-lacquer flex items-center justify-center shrink-0"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </motion.div>
            </button>
          ))}
        </div>
      </div>
      <button onClick={onStart} className="btn-primary w-full py-3.5 gap-2 text-base mt-auto">
        始めましょう！Start Conversation
        <ArrowRight size={15} />
      </button>
    </div>
  )
}

// ─── Mode pill tabs ───────────────────────────────────────────────────────────

function ModeTabs({ mode, onChange }) {
  return (
    <div className="flex gap-1 bg-washi-soft rounded-2xl p-1">
      {[
        { id: 'tutor', label: 'Ask Sensei', Icon: Sparkles },
        { id: 'roleplay', label: 'Roleplay', Icon: MessagesSquare },
      ].map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`relative flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-500 rounded-xl transition-colors duration-200 ${mode === id ? 'text-ink' : 'text-mist hover:text-ink-muted'}`}
        >
          {mode === id && (
            <motion.div
              layoutId="mode-pill"
              className="absolute inset-0 bg-white rounded-xl shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <Icon size={13} className="relative z-10" />
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </div>
  )
}

// ─── Main ChatSensei ──────────────────────────────────────────────────────────

export default function ChatSensei({ lessonContext = null, initialMode = 'tutor', onClose }) {
  const [mode, setMode] = useState(initialMode)
  const [scenario, setScenario] = useState('airport')
  const [roleplayReady, setRoleplayReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const bottomRef = useRef(null)
  const configured = hasApiKey()

  const { messages, isStreaming, error, sendMessage, startRoleplay, clearChat, suggestions, streamingId } = useChat({
    mode: mode === 'roleplay' && roleplayReady ? 'roleplay' : 'tutor',
    lessonContext: mode === 'tutor' ? lessonContext : null,
    scenarioId: scenario,
  })

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  const handleSend = useCallback(() => {
    if (!input.trim() || isStreaming) return
    sendMessage(input)
    setInput('')
    inputRef.current?.focus()
  }, [input, isStreaming, sendMessage])

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleStartRoleplay = () => {
    clearChat()
    startRoleplay()
    setRoleplayReady(true)
  }

  const handleModeChange = newMode => {
    setMode(newMode)
    setRoleplayReady(false)
    clearChat()
  }

  const handleBackFromRoleplay = () => {
    setRoleplayReady(false)
    clearChat()
  }

  const showChips = (messages.length === 0 && !isStreaming) || (messages.length <= 1 && mode === 'roleplay')
  const currentScenario = ROLEPLAY_SCENARIOS[scenario]

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden" style={{ background: '#F5F2EB' }}>

        {/* ── Header (ink background) ── */}
        <div className="bg-ink shrink-0">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2.5">
              {mode === 'roleplay' && roleplayReady ? (
                <button onClick={handleBackFromRoleplay} className="text-washi/60 hover:text-washi transition-colors p-1 -ml-1">
                  <ChevronLeft size={18} />
                </button>
              ) : null}
              <Avatar size={34} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-500 text-washi">N5Lab-Sensei</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-moss" style={{ boxShadow: '0 0 6px #4A6741' }} />
                </div>
                <div className="text-[10px] text-washi/50 leading-none mt-0.5">
                  {mode === 'roleplay' && roleplayReady
                    ? `${currentScenario?.emoji} ${currentScenario?.label} · ロールプレイ`
                    : lessonContext
                      ? `${lessonContext.moduleTitle} · ${lessonContext.lessonTitle}`
                      : '日本語チューター · Japanese Tutor'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setSettingsOpen(true)} className="p-2 text-washi/50 hover:text-washi transition-colors rounded-xl">
                <Settings size={16} />
              </button>
              {messages.length > 0 && (
                <button onClick={() => { clearChat(); setRoleplayReady(false) }} className="p-2 text-washi/50 hover:text-washi transition-colors rounded-xl">
                  <RotateCcw size={15} />
                </button>
              )}
              {onClose && (
                <button onClick={onClose} className="p-2 text-washi/50 hover:text-washi transition-colors rounded-xl">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Mode tabs (inside ink header) */}
          <div className="px-4 pb-3">
            <ModeTabs mode={mode} onChange={handleModeChange} />
          </div>
        </div>

        {/* ── Body ── */}
        {!configured ? (
          <NoKeyGate onSetup={() => setSettingsOpen(true)} />
        ) : mode === 'roleplay' && !roleplayReady ? (
          <ScenarioPicker
            selected={scenario}
            onChange={setScenario}
            onStart={handleStartRoleplay}
          />
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

              {/* Empty tutor state */}
              {messages.length === 0 && mode === 'tutor' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center min-h-28 text-center gap-3 py-4"
                >
                  <Avatar size={44} />
                  <div>
                    <p className="text-sm font-500 text-ink mb-1">こんにちは！ 👋</p>
                    <p className="text-xs text-mist leading-relaxed max-w-[200px]">
                      {lessonContext
                        ? `Ask me anything about "${lessonContext.lessonTitle}"`
                        : 'Ask me anything about Japanese!'}
                    </p>
                  </div>
                </motion.div>
              )}

              <AnimatePresence>
                {messages.map(msg => (
                  <Bubble
                    key={msg.id}
                    msg={msg}
                    isStreaming={msg.id === streamingId}
                  />
                ))}
              </AnimatePresence>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 px-3.5 py-3 rounded-2xl bg-lacquer-muted border border-lacquer/20"
                >
                  <AlertCircle size={14} className="text-lacquer shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-lacquer-dark font-500">{error}</p>
                    {error.includes('Settings') && (
                      <button onClick={() => setSettingsOpen(true)} className="text-[10px] text-lacquer underline mt-0.5">
                        Open Settings →
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestion chips */}
            {showChips && suggestions.length > 0 && (
              <div className="px-4 pb-2 shrink-0">
                <Chips items={suggestions} onPick={t => sendMessage(t)} />
              </div>
            )}

            {/* Input */}
            <div className="shrink-0 px-4 py-3 bg-white border-t border-washi-warm">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                  }}
                  onKeyDown={handleKey}
                  placeholder={mode === 'roleplay' ? 'Reply in Japanese (or English)…' : 'Ask about Japanese…'}
                  rows={1}
                  className="flex-1 px-4 py-2.5 rounded-2xl border border-washi-warm bg-washi-soft
                             text-sm text-ink placeholder:text-mist resize-none
                             focus:outline-none focus:ring-2 focus:ring-lacquer/25 focus:border-lacquer/40
                             transition-all duration-200 overflow-hidden"
                  style={{ minHeight: '42px', maxHeight: '120px' }}
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  whileTap={!isStreaming ? { scale: 0.92 } : {}}
                  className="w-10 h-10 rounded-2xl bg-lacquer text-white flex items-center justify-center shrink-0
                             disabled:opacity-35 disabled:cursor-not-allowed
                             hover:bg-lacquer-light active:bg-lacquer-dark
                             transition-colors duration-150"
                >
                  {isStreaming
                    ? <motion.div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                    : <Send size={15} />
                  }
                </motion.button>
              </div>
              <p className="text-center text-[9px] text-mist/60 mt-1.5 font-mono">Enter to send · Shift+Enter for newline</p>
            </div>
          </>
        )}
      </div>

      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  )
}