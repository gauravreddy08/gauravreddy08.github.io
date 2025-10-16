import 'katex/dist/katex.min.css';

interface MarkdownContentProps {
  children: React.ReactElement;
}

export default function MarkdownContent({ children }: MarkdownContentProps) {
  return <>{children}</>;
}
