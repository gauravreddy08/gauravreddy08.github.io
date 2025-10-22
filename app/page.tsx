import ProjectCard from '@/components/ProjectCard';
import projectsData from '@/content/projects.json';

export default function Home() {
  return (
    <div className="pb-8 -mt-12.5">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 mb-6">
        <p className="text-gray-700 leading-relaxed">
          MLE @ TinyFish <a href="https://tinyfish.ai" target="_blank" rel="noopener noreferrer"><img src="/images/tinyfish.png" alt="TinyFish" className="inline-block w-4 h-auto mt-0.5 object-contain align-text-top" /></a>
          <br/> 
        </p>
      </div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 mb-6">
        <p className="text-gray-700 leading-relaxed">
          <i>bayesian inference</i> supports the <i>hypothesis</i> that you're here to look at my work...
          <br /> 
        </p>
      </div>

      {/* Featured projects */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projectsData.slice(0, 2).map((project, index) => (
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
      </div>
    </div>
  );
}
