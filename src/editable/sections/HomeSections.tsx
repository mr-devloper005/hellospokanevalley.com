import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, Building2, FileText, Image as ImageIcon,
  Megaphone, Play, Search, Sparkles, Star, UserRound,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Megaphone,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}

const displayLabels: Partial<Record<TaskKey, string>> = {
  listing: 'Places',
  sbm: 'Reads',
}

function taskLabel(task: TaskKey) {
  const item = SITE_CONFIG.tasks.find((entry) => entry.key === task)
  return displayLabels[task] || item?.label || task
}

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((3.7 + (h % 13) / 10) * 10) / 10
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function Stars({ rating, className = 'h-4 w-4' }: { rating: number; className?: string }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-[3px]" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`${className} ${
            i < rounded ? 'fill-[var(--slot4-page-text)] text-[var(--slot4-page-text)]' : 'fill-black/10 text-black/10'
          }`}
        />
      ))}
    </span>
  )
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  return (
    <div className="mt-3 flex items-center gap-2">
      <Stars rating={rating} className="h-4 w-4" />
      <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = dc.shell.section

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* ------------------------------------------------------------------
   HERO — Neura Nova style: centered, huge serif with italic accent,
   pill badge above, dark CTA + outlined watch demo, avatar rating.
------------------------------------------------------------------ */
export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const rawTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`
  const words = rawTitle.trim().split(/\s+/)
  const split = Math.max(1, Math.ceil(words.length / 2))
  const firstLine = words.slice(0, split).join(' ')
  const secondLine = words.slice(split).join(' ')
  const avatarPool = pool.slice(0, 5)

  return (
    <section className="relative overflow-hidden">
      <div className={`${container} pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28`}>
        <EditableReveal>
          <div className="mx-auto max-w-4xl text-center">
            <span className={dc.badge.pill}>
              {pagesContent.home.hero.badge || `Trusted by ${SITE_CONFIG.name} community`}
            </span>
            <h1 className={`${dc.type.heroTitle} mt-8 text-[var(--slot4-page-text)]`}>
              {firstLine}
              {secondLine ? (
                <>
                  {' '}
                  <span className="editable-accent italic">
                    <span className="editable-highlight">{secondLine}</span>
                  </span>
                </>
              ) : null}
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
              {pagesContent.home.hero.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href="/signup" className={dc.button.primary}>
                Start Free Trial <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href={primaryRoute} className={dc.button.secondary}>
                <Play className="h-4 w-4" /> Watch Demo
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <div className="flex -space-x-2.5">
                {avatarPool.map((post, i) => {
                  const img = getEditablePostImage(post)
                  return (
                    <span
                      key={post.id || post.slug || i}
                      className="on-media inline-block h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--slot4-page-bg)] bg-[var(--slot4-media-bg)]"
                    >
                      {img ? <img src={img} alt="" className="h-full w-full object-cover" /> : null}
                    </span>
                  )
                })}
              </div>
              <div className="text-left">
                <p className="editable-display text-xl italic text-[var(--slot4-page-text)]">4.9/5 stars</p>
                <p className="text-sm text-[var(--slot4-muted-text)]">From {SITE_CONFIG.name} community</p>
              </div>
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   PLATFORM OVERVIEW rail — soft rounded feature cards with the
   subtle gradient wash Neura Nova uses on their agent tiles.
------------------------------------------------------------------ */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null

  return (
    <section className="relative">
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <EditableReveal className="text-center">
          <span className={dc.badge.pill}>Platform Overview</span>
          <h2 className={`${dc.type.sectionTitle} mx-auto mt-6 max-w-3xl text-[var(--slot4-page-text)]`}>
            Our Specialized {SITE_CONFIG.name}
            <br />
            <span className="editable-accent italic"><span className="editable-highlight">Unlimited Possibilities.</span></span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
            Every category unlocks a different way to explore — automating what slows discovery so you can browse without limits.
          </p>
        </EditableReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((task, index) => {
            const Icon = taskIcon[task.key] || FileText
            return (
              <EditableReveal key={task.key} index={index}>
                <Link
                  href={task.route}
                  className="editable-card-glow group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[28px] border border-[var(--editable-border)] p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,22,20,0.10)]"
                >
                  <div>
                    <span className="editable-display text-3xl italic text-[var(--slot4-page-text)]">
                      {taskLabel(task.key)}
                    </span>
                    <p className="mt-4 text-base leading-relaxed text-[var(--slot4-muted-text)]">
                      Instantly surfaces fresh submissions and community context — always up to date, always on.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-[var(--slot4-page-text)] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              </EditableReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   FEATURED SIGNAL — capabilities layout: pill + display heading +
   large card with copy left, media/preview right.
------------------------------------------------------------------ */
function ActivityCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <EditableReveal index={index}>
      <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,22,20,0.10)]">
        <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
          {category ? (
            <span className="on-media absolute left-4 top-4 rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
              {category}
            </span>
          ) : null}
        </Link>
        <div className="flex flex-1 flex-col p-6">
          <Link href={href} className="editable-display text-2xl leading-snug text-[var(--slot4-page-text)] transition group-hover:opacity-70">
            {post.title}
          </Link>
          <RatingRow post={post} />
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 140)}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
            Read more <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </article>
    </EditableReveal>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const activity = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 9)
  if (!activity.length) return null
  const lead = activity[0]
  return (
    <section className="relative">
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <EditableReveal className="text-center">
          <span className={dc.badge.pill}>Platform Capabilities</span>
          <h2 className={`${dc.type.sectionTitle} mx-auto mt-6 max-w-3xl text-[var(--slot4-page-text)]`}>
            Designed for Simplicity
            <br />
            <span className="editable-accent italic"><span className="editable-highlight">Built for Scale</span></span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
            Powerful enough to handle deep archives, simple enough for anyone to browse — no manual curation required.
          </p>
        </EditableReveal>

        {lead ? (
          <EditableReveal index={1}>
            <Link
              href={postHref(primaryTask, lead, primaryRoute)}
              className="editable-card-glow group mt-14 grid overflow-hidden rounded-[32px] border border-[var(--editable-border)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(26,22,20,0.12)] lg:grid-cols-[1fr_1fr]"
            >
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                <span className={dc.badge.pill}>Spotlight</span>
                <h3 className="editable-display mt-6 text-4xl leading-[1.06] text-[var(--slot4-page-text)] sm:text-5xl">
                  {lead.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-[var(--slot4-muted-text)]">{getExcerpt(lead, 220)}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
                  Open spotlight <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="relative min-h-[320px] overflow-hidden bg-[var(--slot4-media-bg)] lg:min-h-[440px]">
                <img
                  src={getEditablePostImage(lead)}
                  alt={lead.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
            </Link>
          </EditableReveal>
        ) : null}

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activity.slice(1).map((post, index) => (
            <ActivityCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   TIME COLLECTIONS — "Latest Insights"-style grid.
------------------------------------------------------------------ */
function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <EditableReveal index={index}>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,22,20,0.10)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
          {category ? (
            <span className="on-media absolute left-3 top-3 rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
              {category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="editable-display line-clamp-2 text-xl leading-snug text-[var(--slot4-page-text)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 110)}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--slot4-page-text)]">
            Read blog <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </EditableReveal>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string; italic: string }> = {
  spotlight: { eyebrow: 'Latest Insights', title: 'Stay Ahead with', italic: 'fresh signal.' },
  browse: { eyebrow: 'Trending Now', title: 'Popular Reads this', italic: 'month.' },
  index: { eyebrow: 'Evergreen', title: 'Still Worth', italic: 'opening.' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sectionIndex) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to', italic: 'explore.' }
        return (
          <section key={section.key} className="relative">
            <div className={`${container} py-16 sm:py-20`}>
              <EditableReveal index={sectionIndex} className="text-center">
                <span className={dc.badge.pill}>{copy.eyebrow}</span>
                <h2 className={`${dc.type.sectionTitle} mx-auto mt-6 max-w-3xl text-[var(--slot4-page-text)]`}>
                  {copy.title} <span className="editable-accent italic"><span className="editable-highlight">{copy.italic}</span></span>
                </h2>
              </EditableReveal>
              <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {section.posts.slice(0, 8).map((post, index) => (
                  <CompactCard
                    key={post.id || post.slug}
                    post={post}
                    href={postHref(primaryTask, post, primaryRoute)}
                    index={index}
                  />
                ))}
              </div>
              <div className="mt-12 flex justify-center">
                <Link href={section.href || primaryRoute} className={dc.button.primary}>
                  View All <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ------------------------------------------------------------------
   CTA — "How It Works"-style closing panel, cream card with peach
   corner glow and dark CTA button.
------------------------------------------------------------------ */
export function EditableHomeCta() {
  return (
    <section id="get-app" className="relative">
      <div className={`${container} py-16 sm:py-20 lg:py-24`}>
        <EditableReveal>
          <div className="editable-card-glow relative overflow-hidden rounded-[32px] border border-[var(--editable-border)] px-6 py-16 text-center sm:px-10 sm:py-20 lg:px-16 lg:py-24">
            <span className={dc.badge.pill}>How It Works</span>
            <h2 className={`${dc.type.sectionTitle} mx-auto mt-6 max-w-3xl text-[var(--slot4-page-text)]`}>
              Discover the Effortless
              <br />
              <span className="editable-accent italic"><span className="editable-highlight">deployment &amp; results.</span></span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
              {SITE_CONFIG.name} is built for discoveries that deserve more than a passing mention — pick, connect, and share in minutes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/create" className={dc.button.primary}>
                Submit <Sparkles className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={dc.button.secondary}>
                Contact
              </Link>
            </div>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
