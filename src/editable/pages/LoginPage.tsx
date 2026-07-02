import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="relative">
        <section className={`${dc.shell.section} pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28`}>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <span className={dc.badge.pill}>{pagesContent.auth.login.badge}</span>
              <h1 className={`${dc.type.heroTitle} mt-8`}>
                Welcome{' '}
                <span className="editable-accent italic"><span className="editable-highlight">back.</span></span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-[var(--slot4-muted-text)]">
                {pagesContent.auth.login.description}
              </p>
              <div className="mt-10 grid gap-3 max-w-md">
                {['Personalized feed', 'Save submissions', 'Comment & react'].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[var(--slot4-page-text)]">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)] text-xs font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="editable-card-glow rounded-[28px] border border-[var(--editable-border)] p-8 sm:p-10">
              <span className={dc.badge.pill}>Sign in</span>
              <h2 className="editable-display mt-5 text-3xl leading-tight sm:text-4xl">
                {pagesContent.auth.login.formTitle}
              </h2>
              <div className="mt-6">
                <EditableLocalLoginForm />
              </div>
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                New here?{' '}
                <Link href="/signup" className="font-semibold text-[var(--slot4-page-text)] underline underline-offset-4">
                  {pagesContent.auth.login.createCta}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
