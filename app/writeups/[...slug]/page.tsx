import { getPostBySlug, getPostSlugs, processMarkdownToReact } from '@/lib/mdx';
import MarkdownContent from '@/components/MarkdownContent';
import Link from 'next/link';

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
  
  // Determine back link based on slug depth
  const backHref = slug.length > 1 
    ? `/writeups/${slug[0]}` // Go back to main article if this is a sub-part
    : '/writeups'; // Go back to writeups list if this is a main article

  return (
    <div className="mx-auto max-w-2xl px-6 pb-16 pt-4">
      <Link
        href={backHref}
        className="text-sm text-gray-600 underline mb-6 inline-block"
      >
        ← Back
      </Link>

      <article className="prose prose-gray max-w-none">
        <MarkdownContent>{processedContent}</MarkdownContent>
      </article>
    </div>
  );
}
