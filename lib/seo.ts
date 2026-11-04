import { getAllPosts, getPostBySlug, type Post } from '@/lib/mdx';
import projects from '@/content/projects.json';

export const SITE_URL = 'https://www.gtadkapally.com';
export const SITE_NAME = 'Gaurav Tadkapally';
export const SITE_DESCRIPTION =
  'Gaurav Tadkapally, machine learning engineer at TinyFish. Projects, write-ups and from-scratch implementations of LLMs, agents and ML models.';
export const TWITTER_HANDLE = '@gtadkapally';

export const SAME_AS = [
  'https://github.com/gauravreddy08',
  'https://www.linkedin.com/in/gauravreddy08/',
  'https://x.com/gtadkapally',
];

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Machine Learning Engineer',
  worksFor: { '@type': 'Organization', name: 'TinyFish', url: 'https://tinyfish.ai' },
  sameAs: SAME_AS,
};

// Plain-text summary from the start of a markdown body, for posts without a description.
export function excerpt(markdown: string, max = 160): string {
  const text = markdown
    .replace(/<[^>]+>/g, ' ')
    .replace(/^(\?\?\?|!!!).*$/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/^\s*[-*>]\s+/gm, ' ')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

export function postDescription(post: Post): string {
  if (post.description) return post.description;
  // A project card that links to this write-up has a hand-written one-liner.
  const project = projects.find((p: { blog?: string }) => p.blog === `/writeups/${post.slug}`);
  if (project?.description) return project.description;
  const text = excerpt(post.content);
  return text.length > 40 ? text : post.title;
}

// First image in the post, as an absolute URL, for link previews.
export function firstImage(markdown: string): string | undefined {
  const md = markdown.match(/!\[[^\]]*\]\(([^)\s]+)/);
  const html = markdown.match(/<img[^>]+src="([^"]+)"/);
  const src = md?.[1] || html?.[1];
  if (!src) return undefined;
  return src.startsWith('http') ? src : `${SITE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
}

export function getAllWriteups(): Post[] {
  return getAllPosts('writeups').map((p) => getPostBySlug('writeups', p.slug));
}
