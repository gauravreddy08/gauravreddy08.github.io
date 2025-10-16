import ProjectCard from '@/components/ProjectCard';
import projectsData from '@/content/projects.json';

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-16">
      {/* Featured projects with cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {projectsData.slice(0, 6).map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            link={project.link}
            github={project.github}
            youtube={project.youtube}
            blog={project.blog}
          />
        ))}
      </div>

      {/* Remaining projects as simple list */}
      {projectsData.length > 6 && (
        <div className="mx-auto max-w-2xl">
          <h2 className="text-base font-medium text-gray-900 mb-6">More projects</h2>
          <div className="space-y-4">
            {projectsData.slice(6).map((project: any, index) => (
              <div key={index} className="flex items-baseline justify-between gap-4">
                <p className="text-sm">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900"
                  >
                    {project.title}:
                  </a>{' '}
                  <span className="text-gray-600">{project.description}</span>
                </p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {project.github && (
                    <>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-gray-700"
                      >
                        github
                      </a>
                      {(project.youtube || project.blog || project.paper) && <span className="text-xs text-gray-400">·</span>}
                    </>
                  )}
                  {project.youtube && (
                    <>
                      <a
                        href={project.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-gray-700"
                      >
                        youtube
                      </a>
                      {(project.blog || project.paper) && <span className="text-xs text-gray-400">·</span>}
                    </>
                  )}
                  {project.blog && (
                    <>
                      <a
                        href={project.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-gray-700"
                      >
                        blog
                      </a>
                      {project.paper && <span className="text-xs text-gray-400">·</span>}
                    </>
                  )}
                  {project.paper && (
                    <a
                      href={project.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-gray-700"
                    >
                      paper
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
