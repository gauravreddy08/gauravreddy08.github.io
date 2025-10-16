import { getPostBySlug, getPostSlugs, processMarkdownToReact } from '@/lib/mdx';
import MarkdownContent from '@/components/MarkdownContent';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getPostSlugs('everything-from-scratch');
  return slugs.map((slug) => ({ slug }));
}

export default async function EverythingFromScratchPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug('everything-from-scratch', slug);
  const processedContent = await processMarkdownToReact(post.content);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-16">
      <Link
        href="/everything-from-scratch"
        className="text-sm text-gray-600 underline mb-6 inline-block"
      >
        ← Back
      </Link>

      <article className="prose max-w-none">
        <MarkdownContent>{processedContent}</MarkdownContent>
      </article>
    </div>
  );
}
