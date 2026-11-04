import projects from '@/content/projects.json';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SAME_AS, getAllWriteups, postDescription } from '@/lib/seo';

export const dynamic = 'force-static';

export function GET() {
  const writeups = getAllWriteups()
    .map((p) => `- [${p.title}](${SITE_URL}/writeups/${p.slug}.md): ${postDescription(p)}`)
    .join('\n');

  const projectList = projects
    .map((p: { title: string; description: string; github?: string; link?: string }) => {
      const url = p.github || p.link || `${SITE_URL}/projects`;
      return `- [${p.title}](${url}): ${p.description}`;
    })
    .join('\n');

  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

Every write-up is also available as plain markdown by adding \`.md\` to its URL. The full text of all write-ups is at ${SITE_URL}/llms-full.txt.

## Write-ups

${writeups}

## Projects

${projectList}

## Other pages

- [Projects](${SITE_URL}/projects): all projects with code and demo videos
- [Everything from scratch](${SITE_URL}/everything-from-scratch): from-scratch implementations of GPT-2, Llama, LSTMs and classic ML models
- [Learn CS](${SITE_URL}/learn-cs): Workbench, a 63-lesson hands-on CS course from memory to serving LLMs
- [H1B wage map](${SITE_URL}/h1b-data): H1B salary data explorer
- [Resume](${SITE_URL}/resume.pdf)

## Contact

- Email: gtadkapally@gmail.com
${SAME_AS.map((u) => `- ${u}`).join('\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
