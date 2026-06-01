import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Stir & Simmer'

interface BrokenUrl {
  url: string
  status: number
}

interface SitemapGroup {
  sitemap: string
  checked?: number
  ok?: number
  broken?: BrokenUrl[]
  error?: string
}

interface SitemapHealthAlertProps {
  checkedAt?: string
  totalChecked?: number
  totalBroken?: number
  sitemaps?: SitemapGroup[]
}

const SitemapHealthAlertEmail = ({
  checkedAt,
  totalChecked,
  totalBroken,
  sitemaps,
}: SitemapHealthAlertProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>
      Sitemap health check found {totalBroken ?? 0} broken URL
      {totalBroken === 1 ? '' : 's'}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Sitemap health check — issues found</Heading>
        <Text style={intro}>
          The scheduled sitemap health check on {SITE_NAME} found{' '}
          {totalBroken ?? 0} broken URL{totalBroken === 1 ? '' : 's'} out of{' '}
          {totalChecked ?? 0} checked
          {checkedAt ? ` at ${checkedAt}` : ''}.
        </Text>

        {(sitemaps ?? []).map((group, gi) => {
          const hasIssues =
            !!group.error || (group.broken && group.broken.length > 0)
          if (!hasIssues) return null
          return (
            <Section key={gi} style={detailsBox}>
              <Text style={label}>Sitemap</Text>
              <Text style={value}>{group.sitemap}</Text>
              {group.error ? (
                <>
                  <Hr style={divider} />
                  <Text style={label}>Error</Text>
                  <Text style={value}>{group.error}</Text>
                </>
              ) : null}
              {group.broken && group.broken.length > 0 ? (
                <>
                  <Hr style={divider} />
                  <Text style={label}>Broken URLs</Text>
                  {group.broken.map((b, i) => (
                    <Text key={i} style={brokenLine}>
                      [{b.status || 'no response'}] {b.url}
                    </Text>
                  ))}
                </>
              ) : null}
            </Section>
          )
        })}

        <Text style={footer}>
          This alert was triggered automatically by the daily sitemap health
          check. If broken URLs persist, update the sitemap source or add
          redirects.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: SitemapHealthAlertEmail,
  subject: (data: Record<string, any>) =>
    `Sitemap alert: ${data?.totalBroken ?? 0} broken URL${
      data?.totalBroken === 1 ? '' : 's'
    } on ${SITE_NAME}`,
  to: 'hello@stirandsimmer.co.uk',
  displayName: 'Sitemap health alert',
  previewData: {
    checkedAt: '1 June 2026, 03:00 UTC',
    totalChecked: 124,
    totalBroken: 2,
    sitemaps: [
      {
        sitemap: 'https://stirandsimmer.co.uk/sitemap-recipes.xml',
        checked: 80,
        ok: 78,
        broken: [
          { url: 'https://stirandsimmer.co.uk/recipes/old-slug', status: 404 },
          { url: 'https://stirandsimmer.co.uk/recipes/missing', status: 410 },
        ],
      },
    ],
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
}
const container = { maxWidth: '640px', margin: '0 auto', padding: '32px 24px' }
const h1 = {
  fontSize: '22px',
  fontWeight: '600',
  color: '#1a1a1a',
  margin: '0 0 12px',
  letterSpacing: '-0.01em',
}
const intro = { fontSize: '15px', color: '#55575d', lineHeight: '1.6', margin: '0 0 24px' }
const detailsBox = {
  backgroundColor: '#fafafa',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '0 0 16px',
}
const label = {
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: '#8a8a8a',
  fontWeight: '600',
  margin: '0 0 4px',
}
const value = {
  fontSize: '14px',
  color: '#1a1a1a',
  margin: '0 0 4px',
  lineHeight: '1.5',
  wordBreak: 'break-all' as const,
}
const brokenLine = {
  fontSize: '13px',
  color: '#1a1a1a',
  margin: '0 0 4px',
  lineHeight: '1.5',
  wordBreak: 'break-all' as const,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
}
const divider = { borderColor: '#e5e5e5', margin: '12px 0' }
const footer = {
  fontSize: '13px',
  color: '#8a8a8a',
  margin: '24px 0 0',
  fontStyle: 'italic' as const,
}
