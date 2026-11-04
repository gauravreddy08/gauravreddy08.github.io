import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { SITE_URL } from '@/lib/seo';

// Served at /writeups/<slug>.md through a rewrite in next.config.ts.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs('writeups').map((slug) => ({ slug: slug.split('/') }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const post = getPostBySlug('writeups', slug.join('/'));
  const body = `---\ntitle: ${JSON.stringify(post.title)}\ndate: ${JSON.stringify(post.date)}\nurl: ${SITE_URL}/writeups/${post.slug}\nauthor: Gaurav Tadkapally\n---\n\n${post.content.trim()}\n`;
  return new Response(body, { headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Link: `<${SITE_URL}/writeups/${post.slug}>; rel="canonical"`,
    } });
}
