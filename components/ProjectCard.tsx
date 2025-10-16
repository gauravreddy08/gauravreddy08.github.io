'use client';

import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link: string;
  github?: string;
  youtube?: string;
  blog?: string;
}

const ProjectCard = ({ title, description, image, link, github, youtube, blog }: ProjectCardProps) => {
  return (
    <div className="block">
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {image && (
          <div className="relative h-64 bg-gray-100 overflow-hidden mb-3 rounded-2xl">
            <Image
              src={image}
              alt={description}
              fill
              className="object-cover"
            />
          </div>
        )}
      </a>
      <div className="flex items-start justify-between gap-4 mb-1">
        <h3 className="text-base font-medium text-gray-900">
          {title}
        </h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          {github && (
            <>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                github
              </a>
              {(youtube || blog) && <span className="text-xs text-gray-400">·</span>}
            </>
          )}
          {youtube && (
            <>
              <a
                href={youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                youtube
              </a>
              {blog && <span className="text-xs text-gray-400">·</span>}
            </>
          )}
          {blog && (
            <a
              href={blog}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              blog
            </a>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ProjectCard;
