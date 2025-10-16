'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const pathname = usePathname();

  const links = [
    { href: '/projects', label: 'projects' },
    { href: '/everything-from-scratch', label: 'everything from scratch' },
    { href: '/writeups', label: 'writeups' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 pt-12 pb-12">
      <div className="flex items-center gap-4 flex-wrap">
        <Link href="/" className="text-xl font-medium text-gray-900">
          Gaurav Tadkapally
        </Link>
        
        {links.map((link, index) => (
          <span key={link.href} className="flex items-center gap-4">
            <Link
              href={link.href}
              className={`text-sm ${
                isActive(link.href) ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {link.label}
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
