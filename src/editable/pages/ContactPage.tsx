'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell>
      <main className="relative">
        <section className={`${dc.shell.section} pt-32 pb-14 sm:pt-40 lg:pt-44`}>
          <div className="mx-auto max-w-4xl text-center">
            <span className={dc.badge.pill}>{pagesContent.contact.eyebrow}</span>
            <h1 className={`${dc.type.heroTitle} mt-8`}>
              {pagesContent.contact.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="editable-accent italic">
                <span className="editable-highlight">{pagesContent.contact.title.split(' ').slice(-1)}</span>
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">
              {pagesContent.contact.description}
            </p>
          </div>
        </section>

        <section className={`${dc.shell.section} pb-24`}>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="grid gap-4">
              {lanes.map((lane) => (
                <div
                  key={lane.title}
                  className="group rounded-[24px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-7 transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(26,22,20,0.08)]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--slot4-page-text)] text-[var(--slot4-page-bg)]">
                    <lane.icon className="h-5 w-5" />
                  </span>
                  <h2 className="editable-display mt-5 text-2xl leading-tight">{lane.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--slot4-muted-text)]">{lane.body}</p>
                </div>
              ))}
            </div>

            <div className="editable-card-glow rounded-[28px] border border-[var(--editable-border)] p-8 sm:p-10">
              <span className={dc.badge.pill}>Send a message</span>
              <h2 className="editable-display mt-5 text-3xl leading-tight sm:text-4xl">
                {pagesContent.contact.formTitle}
              </h2>
              <div className="mt-6">
                <EditableContactLeadForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
