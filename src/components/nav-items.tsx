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
              "cursor-pointer h-9 px-4 text-sm font-medium transition-all inline-flex items-center justify-center rounded-lg",
              isActive 
                ? "bg-accent text-foreground font-semibold shadow-sm" 
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
