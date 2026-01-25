'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/problems', label: 'Problems' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/products', label: 'Products' },
];

export function NavItems() {
  const pathname = usePathname();

  return (
    <div className="hidden sm:flex gap-1">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className={cn(
              "cursor-pointer h-9 px-3 text-sm font-medium transition-colors relative inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground",
              isActive 
                ? "text-foreground font-semibold" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
            {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-foreground rounded-full pointer-events-none" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
