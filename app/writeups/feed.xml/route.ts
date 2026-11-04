import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, getAllWriteups, postDescription } from '@/lib/seo';

export const dynamic = 'force-static';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = getAllWriteups()
    .filter((p) => !p.slug.includes('/'))
    .map((p) => {
      const url = `${SITE_URL}/writeups/${p.slug}`;
      const date = p.date ? new Date(p.date).toUTCString() : '';
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      ${date ? `<pubDate>${date}</pubDate>` : ''}
      <description>${esc(postDescription(p))}</description>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)} · write-ups</title>
    <link>${SITE_URL}/writeups</link>
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/writeups/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
