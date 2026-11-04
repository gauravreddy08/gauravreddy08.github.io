import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, getAllWriteups } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const posts = getAllWriteups()
    .map((p) => `# ${p.title}\n\nURL: ${SITE_URL}/writeups/${p.slug}\nDate: ${p.date}\n\n${p.content.trim()}`)
    .join('\n\n---\n\n');

  const body = `# ${SITE_NAME}\n\n> ${SITE_DESCRIPTION}\n\n---\n\n${posts}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
