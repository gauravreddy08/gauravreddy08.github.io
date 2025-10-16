import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { codeToHtml } from 'shiki';

const contentDirectory = path.join(process.cwd(), 'content');

// Simple preprocessing for mkdocs cleanup
function preprocessContent(content: string): string {
  let processed = content;
  
  // Convert admonitions to simple blockquotes: !!! type "title" -> >
  processed = processed.replace(/^!!! (\w+)(?: "(.*?)")?\s*$/gm, '>');
  
  // Convert collapsible admonitions to <details>: ??? or ???+
  const lines = processed.split('\n');
  const result: string[] = [];
  let inCollapsible = false;
  let collapsibleIndent = 0;
  let collapsibleContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for collapsible start: ??? or ???+
    const collapsibleMatch = line.match(/^(\?\?\?(\+)?)\s+(\w+)\s+"([^"]+)"/);
    if (collapsibleMatch) {
      // If we were already in a collapsible, close it first
      if (inCollapsible) {
        result.push('<details>');
        result.push(`<summary>${collapsibleContent[0]}</summary>`);
        result.push('');
        result.push(...collapsibleContent.slice(1));
        result.push('</details>');
        result.push('');
      }
      
      const isOpen = collapsibleMatch[2] === '+';
      const title = collapsibleMatch[4];
      inCollapsible = true;
      collapsibleIndent = 4;
      collapsibleContent = [title];
      continue;
    }
    
    // If we're in a collapsible section
    if (inCollapsible) {
      const indent = line.match(/^(\s*)/)?.[1].length || 0;
      
      // Check if this line starts a new non-indented section (end of collapsible)
      if (indent < collapsibleIndent && line.trim() !== '') {
        // Close the collapsible
        result.push('<details>');
        result.push(`<summary>${collapsibleContent[0]}</summary>`);
        result.push('');
        result.push(...collapsibleContent.slice(1));
        result.push('</details>');
        result.push('');
        inCollapsible = false;
        collapsibleContent = [];
        result.push(line);
      } else {
        // Add to collapsible content (removing indent)
        if (indent >= collapsibleIndent) {
          collapsibleContent.push(line.substring(collapsibleIndent));
        } else {
          collapsibleContent.push(line);
        }
      }
    } else {
      result.push(line);
    }
  }
  
  // Close any remaining collapsible
  if (inCollapsible && collapsibleContent.length > 0) {
    result.push('<details>');
    result.push(`<summary>${collapsibleContent[0]}</summary>`);
    result.push('');
    result.push(...collapsibleContent.slice(1));
    result.push('</details>');
  }
  
  processed = result.join('\n');
  
  // Remove mkdocs-specific annotations marker
  processed = processed.replace(/\{ \.annotate \}/g, '');
  
  // Remove link attributes like {:target="_blank"}
  processed = processed.replace(/\{:[^}]+\}/g, '');
  
  // Convert material icons to text: [:material-file-document: Resume]
  processed = processed.replace(/\[:material-[\w-]+:\s*([^\]]+)\]/g, '$1');
  
  // Remove mkdocs frontmatter "hide" sections
  processed = processed.replace(/^---\nhide:[\s\S]*?---\n/m, '');
  
  return processed;
}

// Custom rehype plugin to handle code blocks with shiki
function rehypeShiki() {
  return async (tree: any) => {
    // Traverse the tree and find code blocks
    const visit = async (node: any) => {
      if (node.type === 'element' && node.tagName === 'pre') {
        const codeNode = node.children?.[0];
        if (codeNode && codeNode.tagName === 'code') {
          const className = codeNode.properties?.className?.[0];
          const match = /language-(\w+)/.exec(className || '');
          
          if (match) {
            const lang = match[1];
            const code = codeNode.children?.[0]?.value || '';
            
            try {
              const html = await codeToHtml(code, {
                lang: lang,
                theme: 'one-dark-pro'
              });
              
              // Replace the pre node with the shiki-generated HTML
              node.type = 'raw';
              node.value = html;
            } catch (error) {
              // If language is not supported, keep the original code block
              console.warn(`Shiki: Language '${lang}' not supported, falling back to plain code`);
            }
          }
        }
      }
      
      if (node.children) {
        for (const child of node.children) {
          await visit(child);
        }
      }
    };
    
    await visit(tree);
  };
}

// Process markdown to React components
export async function processMarkdownToReact(content: string): Promise<React.ReactElement> {
  const processedContent = preprocessContent(content);
  
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeShiki)
    .use(rehypeKatex);
  
  const ast = await processor.parse(processedContent);
  const hast = await processor.run(ast);
  
  // Convert HAST to React elements
  const reactElement = toJsxRuntime(hast, {
    Fragment,
    jsx,
    jsxs,
    development: false
  });
  
  return reactElement as React.ReactElement;
}

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  slug: string;
  github?: string;
}

export interface Post extends PostMetadata {
  content: string;
}

export function getPostSlugs(category: 'writeups' | 'everything-from-scratch'): string[] {
  const categoryPath = path.join(contentDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  
  const slugs: string[] = [];
  
  function collectSlugs(dir: string, prefix: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subDir = path.join(dir, entry.name);
        const indexPath = path.join(subDir, 'index.md');
        
        if (fs.existsSync(indexPath)) {
          // This directory has an index.md, add it as a slug
          const slug = prefix ? `${prefix}/${entry.name}` : entry.name;
          slugs.push(slug);
          
          // Check for sub-directories (like Part-I, Part-II)
          collectSlugs(subDir, slug);
        }
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        // Standalone markdown file
        const slug = prefix ? `${prefix}/${entry.name.replace(/\.mdx?$/, '')}` : entry.name.replace(/\.mdx?$/, '');
        if (entry.name !== 'index.md') {
          slugs.push(slug);
        }
      }
    }
  }
  
  collectSlugs(categoryPath);
  return slugs;
}

export function getPostBySlug(
  category: 'writeups' | 'everything-from-scratch',
  slug: string | string[]
): Post {
  const categoryPath = path.join(contentDirectory, category);
  const realSlug = Array.isArray(slug) ? slug.join('/') : slug.replace(/\.mdx?$/, '');
  
  // Try different path combinations
  let fullPath = path.join(categoryPath, realSlug, 'index.md');
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(categoryPath, realSlug, 'index.mdx');
  }
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(categoryPath, `${realSlug}.md`);
  }
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(categoryPath, `${realSlug}.mdx`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    github: data.github || undefined,
    content,
  };
}

export function getAllPosts(category: 'writeups' | 'everything-from-scratch'): PostMetadata[] {
  const slugs = getPostSlugs(category);
  const posts = slugs
    .map(slug => {
      const post = getPostBySlug(category, slug);
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        description: post.description,
        github: post.github,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

