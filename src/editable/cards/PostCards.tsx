import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="editable-card-glow group relative block min-w-0 overflow-hidden rounded-[32px] border border-[var(--editable-border)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(26,22,20,0.12)]"
    >
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <span className={dc.badge.pill}>{label}</span>
          <h3 className="editable-display mt-6 text-4xl leading-[1.05] text-[var(--slot4-page-text)] sm:text-5xl lg:text-6xl">
            {post.title}
          </h3>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--slot4-muted-text)] sm:text-lg">
            {getEditableExcerpt(post, 190)}
          </p>
          <span className={`${dc.button.primary} mt-8 w-fit`}>
            Open <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <div className="relative min-h-[280px] overflow-hidden bg-[var(--slot4-media-bg)] lg:min-h-[520px]">
          <img
            src={getEditablePostImage(post)}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(26,22,20,0.10)]`}
    >
      <div className={`${dc.media.frame} ${dc.media.ratio} rounded-b-none`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <span className="on-media absolute left-4 top-4 rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
          No. {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">{getEditableCategory(post)}</p>
        <h3 className="editable-display mt-3 line-clamp-3 text-2xl leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className={`mt-3 line-clamp-3 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 135)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group block min-w-0 rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-5 transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(26,22,20,0.08)]"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-sm font-semibold text-[var(--slot4-page-bg)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className="editable-display mt-2 line-clamp-2 text-xl leading-tight text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group grid min-w-0 gap-5 overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-4 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(26,22,20,0.10)] sm:grid-cols-[240px_minmax(0,1fr)]"
    >
      <div className={`${dc.media.frame} aspect-[16/11] sm:aspect-auto sm:min-h-[210px]`}>
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">
          Read {String(index + 1).padStart(2, '0')}
        </p>
        <h2 className="editable-display mt-3 line-clamp-3 text-2xl leading-tight text-[var(--slot4-page-text)] sm:text-3xl">
          {post.title}
        </h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
          Open article <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
