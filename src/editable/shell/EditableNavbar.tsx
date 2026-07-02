'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, PlusCircle, ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const staticLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function LogoMark() {
  return (
    <span
      aria-hidden
      className="grid h-8 w-8 place-items-center rounded-md bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h6l4 6-4 6H4l4-6-4-6z" />
        <path d="M14 4h6l-4 6 4 6h-6" />
      </svg>
    </span>
  )
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-10">
      <div className="editable-nav-shell relative mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-4 px-4 py-2.5 sm:gap-6 sm:px-5 sm:py-3">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <img src="/favicon.ico" alt="Logo" className="h-12 w-12" />
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[220px] truncate text-xl font-normal leading-none text-[var(--slot4-page-text)]">
              {SITE_CONFIG.name}
            </span>
          </span>
        </Link>

        <nav className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex">
          {staticLinks.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`pointer-events-auto text-sm font-medium transition ${
                  active ? 'text-[var(--slot4-page-text)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <span className="editable-label pointer-events-auto text-[10px] uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">
            {globalContent.nav?.tagline || SITE_CONFIG.tagline}
          </span>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="grid h-9 w-9 place-items-center rounded-full text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-panel-bg)] sm:h-10 sm:w-10"
          >
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-110 sm:inline-flex"
              >
                <PlusCircle className="h-4 w-4" /> Submit
              </Link>
              <button
                type="button"
                onClick={logout}
                className="hidden rounded-full px-3 py-2.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[var(--slot4-page-text)] transition hover:opacity-70 sm:inline-flex"
              >
                <LogIn className="h-4 w-4" /> Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:brightness-110 sm:inline-flex"
              >
                Get started <ArrowUpRight className="h-4 w-4" />
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-panel-bg)] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-[var(--editable-container)]">
          <div className="editable-nav-shell rounded-[28px] px-4 py-4 lg:hidden">
            <div className="grid gap-2">
              {[
                ...staticLinks,
                ...(session
                  ? [{ label: 'Submit', href: '/create' }]
                  : [
                      { label: 'Sign in', href: '/login' },
                      { label: 'Get started', href: '/signup' },
                    ]),
              ].map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-full px-4 py-3 text-sm font-medium ${
                      active
                        ? 'bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)]'
                        : 'text-[var(--slot4-page-text)] hover:bg-[var(--slot4-panel-bg)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
              {session ? (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full px-4 py-3 text-left text-sm font-medium text-[var(--slot4-muted-text)]"
                >
                  Logout
                </button>
              ) : null}
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)]"
              >
                Search <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
