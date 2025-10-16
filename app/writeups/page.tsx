import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function WriteupsPage() {
  const posts = getAllPosts('writeups');
  
  // Filter to show only main writeups (not sub-parts like part-i, part-ii)
  const mainPosts = posts.filter((post) => !post.slug.includes('/'));

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 pb-16 pt-4">
      <div className="space-y-4">
        {mainPosts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          mainPosts.map((post) => (
            <div key={post.slug} className="flex items-baseline justify-between gap-4">
              <Link
                href={`/writeups/${post.slug}`}
                className="text-gray-900 underline"
              >
                {post.title}
              </Link>
              {post.github && (
                <a
                  href={post.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 underline flex-shrink-0"
                >
                  code
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
