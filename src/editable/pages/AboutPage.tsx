import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="relative">
        <section className={`${dc.shell.section} pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24`}>
          <div className="mx-auto max-w-4xl text-center">
            <span className={dc.badge.pill}>{pagesContent.about.badge}</span>
            <h1 className={`${dc.type.heroTitle} mt-8`}>
              About <span className="editable-accent italic"><span className="editable-highlight">{SITE_CONFIG.name}.</span></span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
              {pagesContent.about.description}
            </p>
          </div>
        </section>

        <section className={`${dc.shell.section} pb-24`}>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <article className="editable-card-glow rounded-[28px] border border-[var(--editable-border)] p-8 sm:p-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Our story</p>
              <h2 className="editable-display mt-4 text-4xl leading-[1.08] sm:text-5xl">
                Built for signal, <span className="editable-accent italic">not noise.</span>
              </h2>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--slot4-muted-text)]">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <aside className="grid gap-4">
              {pagesContent.about.values.map((value, index) => (
                <div
                  key={value.title}
                  className="rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(26,22,20,0.08)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)] text-sm font-semibold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="editable-display mt-5 text-2xl leading-tight">{value.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
