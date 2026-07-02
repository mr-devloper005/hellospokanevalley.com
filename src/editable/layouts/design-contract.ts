import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#F7F1E5',
  '--slot4-page-text': '#1A1614',
  '--slot4-panel-bg': '#EFE7D6',
  '--slot4-surface-bg': '#F1EADB',
  '--slot4-muted-text': 'rgba(26,22,20,0.68)',
  '--slot4-soft-muted-text': 'rgba(26,22,20,0.48)',
  '--slot4-accent': '#1A1614',
  '--slot4-accent-fill': '#1A1614',
  '--slot4-accent-soft': '#F5D9C4',
  '--slot4-accent-secondary': '#DDD3F0',
  '--slot4-accent-secondary-soft': 'rgba(221,211,240,0.55)',
  '--slot4-on-accent': '#F7F1E5',
  '--slot4-dark-bg': '#1A1614',
  '--slot4-dark-text': '#F7F1E5',
  '--slot4-media-bg': '#E8DFCC',
  '--slot4-cream': '#F7F1E5',
  '--slot4-warm': '#EFE7D6',
  '--slot4-lavender': '#E6DEEF',
  '--slot4-gray': '#EDE5D3',
  '--slot4-highlight': '#F5D9C4',
  '--slot4-body-gradient':
    'radial-gradient(60rem 40rem at 12% -4%, rgba(245,217,196,0.55), transparent 60%), radial-gradient(60rem 40rem at 92% 6%, rgba(221,211,240,0.45), transparent 60%), #F7F1E5',
  '--editable-page-bg': '#F7F1E5',
  '--editable-page-text': '#1A1614',
  '--editable-container': '1360px',
  '--editable-border': 'rgba(26,22,20,0.10)',
  '--editable-nav-bg': 'rgba(247,241,229,0.86)',
  '--editable-nav-text': '#1A1614',
  '--editable-nav-active': '#1A1614',
  '--editable-nav-active-text': '#F7F1E5',
  '--editable-cta-bg': '#1A1614',
  '--editable-cta-text': '#F7F1E5',
  '--editable-search-bg': '#EFE7D6',
  '--editable-footer-bg': '#F7F1E5',
  '--editable-footer-text': '#1A1614',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-page-text)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-black/10',
  shadow: 'shadow-[0_18px_60px_rgba(26,22,20,0.08)]',
  shadowStrong: 'shadow-[0_30px_100px_rgba(26,22,20,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(26,22,20,0.02),rgba(26,22,20,0.55))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-10',
    sectionY: 'py-16 sm:py-20 lg:py-[120px]',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[260px] shrink-0 snap-start sm:w-[300px]',
  },
  type: {
    eyebrow:
      'inline-flex rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-page-text)]',
    heroTitle:
      'editable-display text-5xl font-normal leading-[1.02] tracking-[-0.02em] sm:text-7xl lg:text-[6.4rem]',
    sectionTitle:
      'editable-display text-4xl font-normal leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[3.75rem]',
    body: 'text-base leading-[1.65] text-[var(--slot4-muted-text)] sm:text-lg',
    emphasis:
      'editable-accent italic bg-[var(--slot4-highlight)] px-2 rounded-[6px] text-[var(--slot4-page-text)]',
  },
  surface: {
    card: `rounded-[24px] border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    soft: `rounded-[28px] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[28px] border border-white/5 ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_rgba(26,22,20,0.25)] active:scale-[0.99]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-page-text)]/40 active:scale-[0.99]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110 active:scale-[0.99]',
    ghost:
      'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:opacity-70',
  },
  badge: {
    pill:
      'inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-page-text)]',
    accentPill:
      'inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-page-text)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[20px] ${editablePalette.mediaBg}`,
    frameFull: `relative overflow-hidden rounded-[28px] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[16/10]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(26,22,20,0.10)]',
    fade: 'transition duration-500 hover:opacity-80',
    zoom: 'transition duration-700 group-hover:scale-[1.035]',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all pages consume those CSS variables.',
  'Neura Nova aesthetic: warm cream background, dark near-black text, serif italic accent for highlighted words, soft peach highlight boxes.',
  'Use rounded-full pill navbar, dark-pill CTAs with cream text, and generous whitespace.',
  'Use horizontal rails for dense post browsing when content wants a showcase rhythm.',
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
