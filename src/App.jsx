/**
 * App.jsx
 * ─────────────────────────────────────────────────────────────────
 * Root application component. Defines routes and wraps everything
 * in AppLayout. Each page is lazy-loaded for performance.
 * ─────────────────────────────────────────────────────────────────
 */

import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'

// Lazy-loaded pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Learn = lazy(() => import('./pages/Learn'))
const Dictionary = lazy(() => import('./pages/Dictionary'))
const Profile = lazy(() => import('./pages/Profile'))
const LessonView = lazy(() => import('./pages/LessonView'))

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="
          w-10 h-10 rounded-xl bg-ink flex items-center justify-center
          text-washi font-japanese font-700 text-lg
          animate-pulse-soft
        ">
          N5
        </div>
        <p className="text-mist text-sm font-body">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:moduleId/:lessonId" element={<LessonView />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </AppLayout>
  )
}
