# Portfolio Website

A minimal, modern portfolio website built with Next.js 14, featuring a blog system with MDX support.

## Features

- 🎨 Minimal, clean design with off-white aesthetic
- 📝 Easy blog publishing with Markdown/MDX
- 🚀 Built with Next.js 14 App Router
- 💅 Styled with Tailwind CSS
- 🎯 Three main sections: Projects, Everything from Scratch, Writeups
- 📱 Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Home page
│   ├── projects/                # Projects section
│   ├── writeups/                # Blog posts (writeups)
│   └── everything-from-scratch/ # Implementation tutorials
├── components/                   # React components
│   ├── Navigation.tsx           # Main navigation bar
│   └── ProjectCard.tsx          # Project display card
├── content/                      # Content files
│   ├── writeups/                # Markdown files for writeups
│   ├── everything-from-scratch/ # Markdown files for tutorials
│   └── projects.json            # Project metadata
├── lib/                         # Utility functions
│   └── mdx.ts                   # MDX processing utilities
└── public/                      # Static assets
    └── images/                  # Project images
```

## Adding Content

### Writing a Blog Post

1. Create a new `.md` or `.mdx` file in either:
   - `content/writeups/` for technical articles
   - `content/everything-from-scratch/` for implementation tutorials

2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "2025-10-15"
description: "A brief description of your post"
---

# Your Post Title

Your content here...
```

3. The post will automatically appear on the website!

### Adding a Project

Edit `content/projects.json`:

```json
{
  "title": "Project Name",
  "description": "Brief description",
  "image": "/images/project-image.jpg",
  "tags": ["Tag1", "Tag2"],
  "link": "https://project-url.com",
  "category": "Research",
  "date": "2024"
}
```

## Customization

### Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --background: #fafafa;  /* Main background */
  --foreground: #1a1a1a;  /* Text color */
  --border: #e5e5e5;      /* Border color */
  --card-bg: #ffffff;     /* Card background */
}
```

### Personal Information

Update the following files:
- `app/layout.tsx` - Footer links (GitHub, LinkedIn, Email)
- `app/page.tsx` - Hero section bio and content
- `next.config.ts` - Site metadata

## Markdown Features

The blog supports:
- Syntax highlighting for code blocks
- GitHub Flavored Markdown (GFM)
- Auto-generated heading links
- Tables, task lists, and more

Example:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy!

### Other Platforms

```bash
npm run build
npm start
```

Or deploy the `.next` output directory to any Node.js hosting platform.

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

- GitHub: [gtadkapally](https://github.com/gtadkapally)
- LinkedIn: [gauravreddy08](https://www.linkedin.com/in/gauravreddy08/)
