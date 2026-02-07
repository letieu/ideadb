'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { href: '/problems', label: 'Problems' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/products', label: 'Products' },
];

export function TitleNav() {
  const pathname = usePathname();

  return (
    <motion.nav layout className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-2">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className="relative"
          >
            <motion.span
              layoutId={item.label}
              className={cn(
                "inline-block font-serif tracking-tight transition-colors duration-300",
                isActive 
                  ? "text-4xl sm:text-5xl font-bold text-foreground" 
                  : "text-2xl sm:text-3xl font-medium text-muted-foreground/40 hover:text-muted-foreground"
              )}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {item.label}
            </motion.span>
          </Link>
        );
      })}
    </motion.nav>
  );
}