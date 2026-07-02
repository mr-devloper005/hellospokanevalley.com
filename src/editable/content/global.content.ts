import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Local discovery index',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: 'Articles', href: '/articles' },
      { label: 'Visuals', href: '/image-sharing' },
      { label: 'Places', href: '/Places' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start exploring', href: '/' },
      secondary: { label: 'Submit', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Places, reads, and useful local context',
    description: 'A connected publishing surface for articles, visuals, Places, profiles, reads, and downloadable resources.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Articles', href: '/articles' },
          { label: 'Places', href: '/Places' },
          { label: 'Images', href: '/image-sharing' },
          { label: 'PDF Library', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean discovery and connected publishing.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const

