import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { Ads, getSlotSizes } from '@/lib/ads'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { formatRichHtml } from '@/components/shared/rich-content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''
const pickRandom = (sizes: string[]) => sizes[Math.floor(Math.random() * sizes.length)]
const displayTaskLabel = (task: TaskKey | null | undefined, fallback: string) => task === 'listing' ? 'Places' : task === 'sbm' ? 'Reads' : fallback

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = displayTaskLabel(task, SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post')
  const strong = index % 5 === 0

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(26,22,20,0.10)] ${
        strong ? 'md:col-span-2' : ''
      }`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          <span className="on-media absolute left-4 top-4 rounded-full bg-[var(--slot4-page-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
            {taskLabel}
          </span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {!image ? (
          <span className={dc.badge.pill}>{taskLabel}</span>
        ) : null}
        <h2 className="editable-display mt-4 line-clamp-3 text-2xl leading-tight text-[var(--slot4-page-text)]">
          {post.title}
        </h2>
        {summary ? (
          <div
            className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]"
            dangerouslySetInnerHTML={{ __html: formatRichHtml(summary) }}
          />
        ) : null}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
          Open result <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="relative">
        <section className={`${dc.shell.section} pt-32 pb-14 sm:pt-40 lg:pt-44`}>
          <div className="mx-auto max-w-4xl text-center">
            <span className={dc.badge.pill}>{pagesContent.search.hero.badge}</span>
            <h1 className={`${dc.type.heroTitle} mt-8`}>
              {pagesContent.search.hero.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="editable-accent italic">
                <span className="editable-highlight">{pagesContent.search.hero.title.split(' ').slice(-1)}</span>
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
              {pagesContent.search.hero.description}
            </p>
          </div>

          <form
            action="/search"
            className="editable-card-glow mx-auto mt-12 max-w-3xl rounded-[28px] border border-[var(--editable-border)] p-4 sm:p-6"
          >
            <input type="hidden" name="master" value="1" />
            <label className="flex items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-5 py-3">
              <Search className="h-5 w-5 text-[var(--slot4-page-text)]" />
              <input
                name="q"
                defaultValue={query}
                placeholder={pagesContent.search.hero.placeholder}
                className="min-w-0 flex-1 bg-transparent text-base font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
              />
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3">
                <Filter className="h-4 w-4 text-[var(--slot4-page-text)]" />
                <input
                  name="category"
                  defaultValue={category}
                  placeholder="Category"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
                />
              </label>
              <select
                name="task"
                defaultValue={task}
                className="rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3 text-sm font-medium text-[var(--slot4-page-text)] outline-none"
              >
                <option value="">All content types</option>
                {enabledTasks.map((item) => (
                  <option key={item.key} value={item.key}>
                    {displayTaskLabel(item.key, item.label)}
                  </option>
                ))}
              </select>
              <button className={dc.button.primary} type="submit">
                Search <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </section>

        <section className={`${dc.shell.section} pb-24`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">
                {results.length} results
              </p>
              <h2 className="editable-display mt-2 text-3xl leading-tight sm:text-4xl">
                {query ? (
                  <>
                    Results for <span className="editable-accent italic"><span className="editable-highlight">&ldquo;{query}&rdquo;</span></span>
                  </>
                ) : (
                  pagesContent.search.resultsTitle
                )}
              </h2>
            </div>
            <Link href="/article" className={dc.button.secondary}>
              Browse latest <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => (
                <SearchResultCard key={post.id || post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-[28px] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-12 text-center">
              <p className="editable-display text-3xl leading-tight">No matching posts found.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, task type, or category.</p>
            </div>
          )}
          <div className="mt-12">
            <Ads slot="footer" size={pickRandom(getSlotSizes('footer'))} showLabel />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
