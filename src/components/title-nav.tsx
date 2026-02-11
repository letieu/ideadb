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
    <motion.nav layout className="flex flex-wrap items-baseline gap-x-8 gap-y-3 mb-3">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link 
            key={item.href} 
            href={item.href}
            className="relative group"
          >
            <motion.span
              layoutId={item.label}
              className={cn(
                "inline-block font-serif tracking-[-0.02em] transition-colors duration-200",
                isActive 
                  ? "text-5xl sm:text-6xl font-bold text-foreground" 
                  : "text-3xl sm:text-4xl font-semibold text-muted-foreground/30 group-hover:text-muted-foreground/70"
              )}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 32
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