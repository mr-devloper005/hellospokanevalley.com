'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const displayLabels: Partial<Record<TaskKey, string>> = {
  listing: 'Places',
  sbm: 'Reads',
}

function labelFor(task: { key: TaskKey; label: string }) {
  return displayLabels[task.key] || task.label
}

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--slot4-dark-text)] text-[var(--slot4-dark-bg)]"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h6l4 6-4 6H4l4-6-4-6z" />
        <path d="M14 4h6l-4 6 4 6h-6" />
      </svg>
    </span>
  )
}

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="dark-surface mt-24 overflow-hidden bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className="border-b border-white/10 py-6">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center gap-8 overflow-hidden whitespace-nowrap px-5 sm:px-6 lg:px-10">
          <div className="editable-display flex shrink-0 items-center gap-8 text-3xl italic tracking-[-0.01em] sm:text-4xl lg:text-5xl">
            {Array.from({ length: 6 }).map((_, index) => (
              <span key={index} className="inline-flex shrink-0 items-center gap-8">
                Share what matters <Sparkles className="h-6 w-6" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] lg:px-10 lg:py-24">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            
              <img src="/favicon.ico" alt="Logo" className="h-10 w-10 object-contain" />
           
            <span className="editable-display text-3xl font-normal">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
            {globalContent.footer?.description || SITE_CONFIG.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Local signal', 'Curated context', 'Fresh submissions'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Discovery</h3>
          <div className="mt-6 grid gap-3">
            {taskLinks.map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
              >
                {labelFor(task)} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Resources</h3>
          <div className="mt-6 grid gap-3">
            {[
              ['Search', '/search'],
              ['About', '/about'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/80 transition hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">Account</h3>
          <div className="mt-6 grid gap-3">
            {(session ? [['Submit', '/create']] : [['Sign in', '/login'], ['Get started', '/signup']]).map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/80 transition hover:text-white">
                {label}
              </Link>
            ))}
            {session ? (
              <button
                type="button"
                onClick={logout}
                className="text-left text-sm font-medium text-white/80 transition hover:text-white"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[var(--editable-container)] px-5 pb-10 sm:px-6 lg:px-10">
        <div className="border-t border-white/10 pt-6 text-xs font-medium text-white/50">
          © {year} {SITE_CONFIG.name}. Built for useful local discovery.
        </div>
      </div>
    </footer>
  )
}
