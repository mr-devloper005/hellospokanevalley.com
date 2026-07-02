import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Reading desk',
    headline: 'Long-form articles with a calmer editorial rhythm.',
    description: 'Use this page for essays, guides, explainers, and story-led posts. The layout should feel like a publication, not a directory.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Reading surfaces need space, hierarchy, and fewer distractions.',
    chips: ['Editorial pacing', 'Topic filters', 'Long-read friendly'],
  },
  classified: {
    eyebrow: 'Notice board',
    headline: 'Fast-moving classifieds, offers, and time-sensitive posts.',
    description: 'Classified content should feel quick to scan, practical, and action-oriented with less editorial decoration.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Prioritize urgency, short summaries, and direct browsing.',
    chips: ['Fast scan', 'Offers', 'Action cues'],
  },
  sbm: {
    eyebrow: 'Reads',
    headline: 'Curated reads arranged for quick judgment.',
    description: 'Reads pages should feel like a clear shelf of useful links, references, and context worth opening.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Useful links need grouping, source context, and calm metadata.',
    chips: ['Curated links', 'Source context', 'Reference flow'],
  },
  profile: {
    eyebrow: 'People and profiles',
    headline: 'Profiles with identity, trust, and reputation cues.',
    description: 'Profile pages should make people, brands, and entities feel discoverable rather than buried in a generic feed.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make identity and credibility visible before the grid begins.',
    chips: ['Identity first', 'Trust cues', 'Creator/business cards'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'PDFs and documents presented as a useful library.',
    description: 'PDF pages should feel like downloadable guides, reports, files, and reference material instead of normal articles.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document surfaces need archive cues, file context, and clear browsing.',
    chips: ['Documents', 'Guides', 'Archive ready'],
  },
  listing: {
    eyebrow: 'Places',
    headline: 'Local places built for discovery and comparison.',
    description: 'Places pages should behave like a premium directory with trust cues, metadata, and a practical search rhythm.',
    filterLabel: 'Filter place category',
    secondaryNote: 'Prioritize comparison, location, and direct action paths.',
    chips: ['Directory', 'Compare', 'Local discovery'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image posts with a gallery-first browsing experience.',
    description: 'Image pages should lead with visual impact, stronger cards, and a portfolio-like rhythm.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>

