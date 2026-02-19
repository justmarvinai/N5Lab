/**
 * components/settings/SettingsModal.jsx
 */

import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2,
  ExternalLink, Cpu, Trash2, ChevronDown, Shield,
  Info, Download, Upload, RotateCcw,
} from 'lucide-react'
import {
  getApiKey, saveApiKey, clearApiKey, hasApiKey,
  validateApiKey, getSelectedModel, saveSelectedModel, AVAILABLE_MODELS,
} from '../../services/aiService'
import { useLearning } from '../../context/LearningContext'

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const cfg = {
    empty: { cls: 'text-mist', Icon: null, label: 'Not set' },
    checking: { cls: 'text-gold', Icon: Loader2, label: 'Checking…', spin: true },
    valid: { cls: 'text-moss', Icon: CheckCircle2, label: 'Verified ✓' },
    saved: { cls: 'text-moss', Icon: CheckCircle2, label: 'Active ✓' },
    error: { cls: 'text-lacquer', Icon: AlertCircle, label: 'Invalid' },
  }[status] ?? { cls: 'text-mist', label: '' }
  const { cls, Icon, label, spin } = cfg
  return (
    <span className={`flex items-center gap-1 text-[11px] font-mono ${cls}`}>
      {Icon && <Icon size={11} className={spin ? 'animate-spin' : ''} />}
      {label}
    </span>
  )
}

// ─── Model dropdown ───────────────────────────────────────────────────────────

function ModelDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const cur = AVAILABLE_MODELS.find(m => m.id === value) ?? AVAILABLE_MODELS[0]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl border border-washi-warm bg-white hover:border-mist transition-colors text-left"
      >
        <Cpu size={15} className="text-mist shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-500 text-ink">{cur.label}</div>
          <div className="text-[10px] text-mist">{cur.description}</div>
        </div>
        <span className="badge badge-gold text-[9px] shrink-0">{cur.badge}</span>
        <ChevronDown size={13} className={`text-mist transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            className="absolute top-full mt-1.5 inset-x-0 z-20 card shadow-lifted p-1.5"
          >
            {AVAILABLE_MODELS.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => { onChange(m.id); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${m.id === value ? 'bg-washi-soft' : 'hover:bg-washi-soft'}`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${m.id === value ? 'bg-lacquer' : 'bg-washi-warm'}`} />
                <div className="flex-1">
                  <div className="text-sm font-500 text-ink">{m.label}</div>
                  <div className="text-[10px] text-mist">{m.description}</div>
                </div>
                <span className="badge badge-mist text-[9px]">{m.badge}</span>
                {m.id === value && <CheckCircle2 size={12} className="text-moss shrink-0" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SettingsModal({ isOpen, onClose }) {
  const { exportData, importData, resetProgress } = useLearning()

  const [key, setKey] = useState(() => getApiKey() ?? '')
  const [showKey, setShowKey] = useState(false)
  const [status, setStatus] = useState(() => hasApiKey() ? 'saved' : 'empty')
  const [keyErr, setKeyErr] = useState('')
  const [model, setModel] = useState(() => getSelectedModel())
  const [importMsg, setImportMsg] = useState('')
  const fileRef = useRef(null)

  const handleSave = useCallback(async () => {
    const t = key.trim()
    if (!t) { clearApiKey(); setStatus('empty'); return }
    setStatus('checking'); setKeyErr('')
    const r = await validateApiKey(t)
    if (r.valid) {
      saveApiKey(t); setStatus('valid')
      if (r.warning) setKeyErr(r.warning)
    } else {
      setStatus('error'); setKeyErr(r.error ?? 'Invalid key')
    }
  }, [key])

  const handleRemove = () => {
    clearApiKey(); setKey(''); setStatus('empty'); setKeyErr('')
  }

  const handleModel = id => { setModel(id); saveSelectedModel(id) }

  const handleImport = async e => {
    const f = e.target.files?.[0]; if (!f) return
    try { await importData(f); setImportMsg('✓ Imported!') }
    catch { setImportMsg('✗ Import failed') }
    setTimeout(() => setImportMsg(''), 3000)
    e.target.value = ''
  }

  const handleReset = () => {
    if (!window.confirm('Reset ALL progress? This cannot be undone.')) return
    resetProgress(); onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 40 }}
            className="fixed inset-x-0 bottom-0 z-50
                       md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[480px]
                       bg-white rounded-t-3xl md:rounded-3xl shadow-lifted overflow-hidden"
            style={{ maxHeight: '90dvh' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-0.5 md:hidden">
              <div className="w-10 h-1 rounded-full bg-washi-warm" />
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90dvh - 12px)' }}>
              {/* Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-washi-warm">
                <div>
                  <h2 className="font-display text-xl font-400 text-ink">Settings</h2>
                  <p className="font-japanese text-[11px] text-mist">せってい</p>
                </div>
                <button onClick={onClose} className="btn-ghost p-2 -mr-2 text-mist hover:text-ink">
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 py-6 space-y-8 pb-10">

                {/* ─── AI Sensei section ─── */}
                <section>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center shrink-0 border border-gold/30">
                      <span className="font-japanese text-gold text-sm">先</span>
                    </div>
                    <div>
                      <h3 className="font-display text-base font-500 text-ink leading-none">AI Sensei</h3>
                      <p className="text-[10px] text-mist">Powered by Groq (free tier)</p>
                    </div>
                  </div>

                  {/* Groq info box */}
                  <div className="mb-5 p-4 rounded-2xl bg-gold-muted border border-gold/20">
                    <div className="flex gap-2.5 items-start">
                      <Info size={14} className="text-gold shrink-0 mt-0.5" />
                      <div className="text-sm text-ink-muted leading-relaxed">
                        Get a <strong className="text-ink font-500">free Groq API key</strong> — no credit card needed. Up to 30 requests/minute.
                        <a
                          href="https://console.groq.com/keys"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gold-dark hover:text-gold font-500 text-xs mt-2 w-fit transition-colors"
                        >
                          Open console.groq.com <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Key input */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono text-mist uppercase tracking-wide">Groq API Key</label>
                      <StatusBadge status={status} />
                    </div>
                    <div className="relative">
                      <input
                        type={showKey ? 'text' : 'password'}
                        value={key}
                        onChange={e => setKey(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSave()}
                        placeholder="gsk_••••••••••••••••••••••••••••••••"
                        className="w-full pl-4 pr-10 py-3 rounded-2xl border border-washi-warm bg-washi-soft
                                   font-mono text-sm text-ink placeholder:text-mist
                                   focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/60
                                   transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey(v => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mist hover:text-ink transition-colors"
                      >
                        {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {keyErr && (
                      <p className="flex items-center gap-1.5 text-xs mt-1.5 text-lacquer">
                        <AlertCircle size={11} /> {keyErr}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={handleSave}
                      disabled={status === 'checking' || !key.trim()}
                      className="btn-primary flex-1 py-2.5 text-sm gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {status === 'checking'
                        ? <><Loader2 size={13} className="animate-spin" /> Verifying…</>
                        : 'Save & Verify Key'}
                    </button>
                    {(status === 'valid' || status === 'saved') && (
                      <button
                        onClick={handleRemove}
                        className="px-3.5 py-2.5 rounded-2xl border border-lacquer/25 bg-lacquer-muted text-lacquer hover:bg-lacquer/20 transition-colors"
                        title="Remove key"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <p className="flex items-center gap-1.5 text-[10px] text-mist mb-5">
                    <Shield size={10} className="shrink-0" />
                    Stored only on your device · never sent to N5Lab servers
                  </p>

                  {/* Model selector */}
                  <div>
                    <label className="block text-xs font-mono text-mist uppercase tracking-wide mb-2">AI Model</label>
                    <ModelDropdown value={model} onChange={handleModel} />
                  </div>
                </section>

                {/* ─── Progress data section ─── */}
                <section>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-washi-soft border border-washi-warm flex items-center justify-center shrink-0">
                      <span className="text-sm text-mist font-japanese">進</span>
                    </div>
                    <h3 className="font-display text-base font-500 text-ink">Progress Data</h3>
                  </div>
                  <div className="space-y-2">
                    <button
                      onClick={exportData}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-washi-warm bg-white hover:bg-washi-soft transition-colors text-left"
                    >
                      <Download size={15} className="text-mist shrink-0" />
                      <div>
                        <div className="text-sm font-500 text-ink">Export Progress</div>
                        <div className="text-[11px] text-mist">Download JSON backup file</div>
                      </div>
                    </button>

                    <button
                      onClick={() => fileRef.current?.click()}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-washi-warm bg-white hover:bg-washi-soft transition-colors text-left"
                    >
                      <Upload size={15} className="text-mist shrink-0" />
                      <div>
                        <div className="text-sm font-500 text-ink">Import Progress</div>
                        <div className={`text-[11px] transition-colors ${importMsg.startsWith('✓') ? 'text-moss' : importMsg.startsWith('✗') ? 'text-lacquer' : 'text-mist'}`}>
                          {importMsg || 'Restore from backup file'}
                        </div>
                      </div>
                    </button>
                    <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

                    <button
                      onClick={handleReset}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-lacquer/20 bg-lacquer-muted hover:bg-lacquer/15 transition-colors text-left"
                    >
                      <RotateCcw size={15} className="text-lacquer shrink-0" />
                      <div>
                        <div className="text-sm font-500 text-lacquer-dark">Reset All Progress</div>
                        <div className="text-[11px] text-lacquer/60">This action cannot be undone</div>
                      </div>
                    </button>
                  </div>
                </section>

                {/* ─── App info ─── */}
                <section className="text-center space-y-1 pt-2">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-ink flex items-center justify-center">
                      <span className="text-gold font-japanese text-[11px]">N5</span>
                    </div>
                    <span className="font-display text-sm text-ink">N5Lab</span>
                  </div>
                  <p className="text-[10px] text-mist">v0.1.0 · 日本語学習 · Vercel Hobby Plan</p>
                  <p className="text-[10px] text-mist">Grammar: Tae Kim's Guide · AI: Groq Free Tier</p>
                </section>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}