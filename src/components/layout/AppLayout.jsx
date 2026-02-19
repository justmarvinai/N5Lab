/**
 * AppLayout.jsx (FINAL — Tasks 1+4 integrated)
 * Sidebar/TopBar navigation + SenseiFAB + SettingsModal wired in.
 */
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, BookOpen, Search, User, Flame, Zap, ChevronRight, ChevronLeft, Settings } from 'lucide-react'
import { useLearning } from '../../context/LearningContext'
import LevelBadge from '../ui/LevelBadge'
import SenseiFAB from '../ai/SenseiFAB'
import SettingsModal from '../settings/SettingsModal'

const NAV = [
  { to: '/',           icon: LayoutDashboard, label: 'Dashboard', labelJa: 'ダッシュボード', end: true },
  { to: '/learn',      icon: BookOpen,         label: 'Learn',     labelJa: 'まなぶ' },
  { to: '/dictionary', icon: Search,           label: 'Dictionary',labelJa: '辞書' },
  { to: '/profile',    icon: User,             label: 'Profile',   labelJa: 'プロフィール' },
]

function NavItem({ item, expanded }) {
  const Icon = item.icon
  return (
    <NavLink to={item.to} end={item.end}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 no-tap-highlight
         ${isActive ? 'bg-lacquer text-white shadow-glow-red' : 'text-ink-muted hover:bg-washi-soft hover:text-ink'}`}
    >
      {({ isActive }) => (
        <>
          <Icon size={20} strokeWidth={isActive ? 2.5 : 1.75} className="shrink-0" />
          <AnimatePresence mode="wait">
            {expanded && (
              <motion.span key="lbl" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.14 }} className="text-sm font-500 whitespace-nowrap">
                {item.label}
                <span className="block text-[10px] font-japanese opacity-60 leading-none mt-0.5">{item.labelJa}</span>
              </motion.span>
            )}
          </AnimatePresence>
          {!expanded && <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-ink text-washi text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">{item.label}</div>}
        </>
      )}
    </NavLink>
  )
}

function Sidebar({ expanded, onToggle, onSettings }) {
  const { xp, level, streak, levelProgress } = useLearning()
  return (
    <motion.aside animate={{ width: expanded ? 224 : 72 }} transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
      className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-washi-warm shadow-paper overflow-hidden">
      <div className="flex items-center gap-3 px-3 pt-5 pb-4 border-b border-washi-warm min-h-[72px]">
        <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center shrink-0 text-gold font-japanese text-lg">N5</div>
        <AnimatePresence mode="wait">
          {expanded && <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.14 }}><div className="font-display text-lg font-600 text-ink">N5Lab</div><div className="text-[10px] font-japanese text-mist">日本語学習</div></motion.div>}
        </AnimatePresence>
      </div>
      <nav className="flex-1 flex flex-col gap-1 px-2 py-4">{NAV.map(i => <NavItem key={i.to} item={i} expanded={expanded} />)}</nav>
      <div className="border-t border-washi-warm px-2 py-3 space-y-2">
        {streak > 0 && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-lacquer-muted">
            <Flame size={16} className="text-lacquer fill-lacquer shrink-0" />
            {expanded && <div><div className="text-xs font-500 text-ink">{streak} day streak</div><div className="text-[10px] text-mist">Keep going!</div></div>}
          </div>
        )}
        <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gold-muted">
          <Zap size={16} className="text-gold shrink-0" />
          {expanded && <div className="flex-1"><div className="flex justify-between mb-1"><span className="text-xs font-500 text-ink">Lv. {level}</span><span className="text-[10px] font-mono text-gold">{xp} XP</span></div><div className="progress-bar h-1"><div className="progress-fill bg-gold" style={{ width: `${levelProgress*100}%` }} /></div></div>}
        </div>
        <button onClick={onSettings} className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-mist hover:bg-washi-soft hover:text-ink transition-all">
          <Settings size={18} strokeWidth={1.75} className="shrink-0" />
          {expanded && <span className="text-sm">Settings</span>}
        </button>
      </div>
      <button onClick={onToggle} className="flex items-center justify-center h-10 border-t border-washi-warm text-mist hover:text-ink hover:bg-washi-soft transition-colors">
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </motion.aside>
  )
}

function MobileNav() {
  const loc = useLocation()
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-washi-warm flex pb-safe">
      {NAV.map(item => {
        const Icon = item.icon
        const active = item.end ? loc.pathname === item.to : loc.pathname.startsWith(item.to)
        return (
          <NavLink key={item.to} to={item.to} end={item.end} className="flex-1 no-tap-highlight">
            <motion.div className={`flex flex-col items-center justify-center gap-1 py-3 transition-colors ${active ? 'text-lacquer' : 'text-mist'}`} whileTap={{ scale: 0.92 }}>
              <div className="relative"><Icon size={22} strokeWidth={active ? 2.5 : 1.75} />{active && <motion.div layoutId="mob-dot" className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lacquer" />}</div>
              <span className="text-[10px] font-500">{item.label}</span>
            </motion.div>
          </NavLink>
        )
      })}
    </nav>
  )
}

function TopBar({ onSettings }) {
  const { xp, level, streak } = useLearning()
  const loc = useLocation()
  const page = NAV.find(i => i.end ? loc.pathname === i.to : loc.pathname.startsWith(i.to))
  return (
    <header className="md:hidden fixed top-0 inset-x-0 z-30 bg-white/90 backdrop-blur-md border-b border-washi-warm flex items-center justify-between px-4 h-14 pt-safe">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-ink flex items-center justify-center text-gold font-japanese text-xs">N5</div>
        <span className="font-display text-base font-600 text-ink">{page?.label ?? 'N5Lab'}</span>
      </div>
      <div className="flex items-center gap-2">
        {streak > 0 && <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-lacquer-muted"><Flame size={12} className="text-lacquer fill-lacquer" /><span className="text-xs font-500 text-lacquer-dark">{streak}</span></div>}
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gold-muted"><Zap size={12} className="text-gold" /><span className="text-xs font-mono font-500 text-gold-dark">{xp}</span></div>
        <LevelBadge level={level} size="sm" />
        <button onClick={onSettings} className="p-1.5 text-mist hover:text-ink transition-colors"><Settings size={16} /></button>
      </div>
    </header>
  )
}

export default function AppLayout({ children }) {
  const [expanded, setExpanded] = useState(true)
  const [settings, setSettings] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const check = () => setExpanded(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div className="min-h-dvh bg-washi">
      <Sidebar expanded={expanded} onToggle={() => setExpanded(v => !v)} onSettings={() => setSettings(true)} />
      <TopBar onSettings={() => setSettings(true)} />
      <motion.main
        animate={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 768 ? (expanded ? 224 : 72) : 0 }}
        transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
        className="min-h-dvh pt-14 md:pt-0 pb-24 md:pb-8 px-4 md:px-8 lg:px-10"
      >
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}>
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>
      <MobileNav />
      <SenseiFAB />
      <SettingsModal isOpen={settings} onClose={() => setSettings(false)} />
    </div>
  )
}
