import Link from 'next/link';
import scratchData from '@/content/everything-from-scratch.json';

// Convert camelCase to readable format
function formatCategoryName(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .toLowerCase()
    .trim();
}

export default function EverythingFromScratchPage() {
  // Get all categories dynamically from the JSON
  const categories = Object.entries(scratchData);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-16 pt-4">
      {categories.map(([categoryKey, projects], categoryIndex) => (
        <div key={categoryKey} className={categoryIndex < categories.length - 1 ? "mb-8" : ""}>
          <h2 className="text-base font-medium text-gray-900 mb-4">
            {formatCategoryName(categoryKey)}
          </h2>
          <div className="space-y-2">
            {projects.map((project: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 underline"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="text-gray-600 underline">{project.title}</span>
                )}
                {project.tags && project.tags.length > 0 && (
                  <span className="text-gray-400">
                    {project.tags.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex}>
                        {tagIndex > 0 && ' · '}
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
