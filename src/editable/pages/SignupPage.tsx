import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="relative">
        <section className={`${dc.shell.section} pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28`}>
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1fr]">
            <div className="editable-card-glow order-2 rounded-[28px] border border-[var(--editable-border)] p-8 sm:p-10 lg:order-1">
              <span className={dc.badge.pill}>Create account</span>
              <h1 className="editable-display mt-5 text-3xl leading-tight sm:text-4xl">
                {pagesContent.auth.signup.formTitle}
              </h1>
              <div className="mt-6">
                <EditableLocalSignupForm />
              </div>
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-[var(--slot4-page-text)] underline underline-offset-4">
                  {pagesContent.auth.signup.loginCta}
                </Link>
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <span className={dc.badge.pill}>{pagesContent.auth.signup.badge}</span>
              <h2 className={`${dc.type.heroTitle} mt-8`}>
                Start{' '}
                <span className="editable-accent italic"><span className="editable-highlight">exploring.</span></span>
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-[var(--slot4-muted-text)]">
                {pagesContent.auth.signup.description}
              </p>
              <div className="mt-10 grid gap-3 max-w-md">
                {['Free forever', 'No credit card', 'Local-first storage'].map((item, i) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[var(--slot4-page-text)]">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)] text-xs font-semibold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
