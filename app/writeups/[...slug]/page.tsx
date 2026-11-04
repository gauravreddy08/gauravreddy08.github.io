import { getPostBySlug, getPostSlugs, processMarkdownToReact } from '@/lib/mdx';
import MarkdownContent from '@/components/MarkdownContent';
import TweetEmbeds from '@/components/TweetEmbeds';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, TWITTER_HANDLE, postDescription, firstImage } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug('writeups', slug.join('/'));
  const description = postDescription(post);
  const image = firstImage(post.content);
  const path = `/writeups/${post.slug}`;
  return {
    title: post.title,
    description,
    alternates: {
      canonical: path,
      types: { 'text/markdown': [{ url: `${path}.md`, title: post.title }] },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      publishedTime: post.date || undefined,
      authors: [SITE_URL],
      images: image ? [image] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs('writeups');
  return slugs.map((slug) => ({ 
    slug: slug.split('/') 
  }));
}

export default async function WriteupPost({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const post = getPostBySlug('writeups', slug.join('/'));
  const processedContent = await processMarkdownToReact(post.content);
  const image = firstImage(post.content);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: postDescription(post),
    url: `${SITE_URL}/writeups/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/writeups/${post.slug}`,
    datePublished: post.date || undefined,
    image: image || undefined,
    author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    ...(post.github ? { isBasedOn: post.github } : {}),
  };
  
  // Determine back link based on slug depth
  const backHref = slug.length > 1 
    ? `/writeups/${slug[0]}` // Go back to main article if this is a sub-part
    : '/writeups'; // Go back to writeups list if this is a main article

  return (
    <div className="mx-auto max-w-2xl px-6 pb-16 pt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Link
        href={backHref}
        className="text-sm text-gray-600 underline mb-6 inline-block"
      >
        ← Back
      </Link>

      <article className="prose prose-gray max-w-none">
        <MarkdownContent>{processedContent}</MarkdownContent>
      </article>
      <TweetEmbeds />
    </div>
  );
}
