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
    <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap">
        <Link href="/" className="text-lg sm:text-xl font-medium text-gray-900">
          Gaurav Tadkapally
        </Link>
        
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm ${
                isActive(link.href) ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
