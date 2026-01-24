'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/problems', label: 'Problems' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-5xl flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <div className="flex items-center">
            <Link href="/" className="font-bold text-xl mr-8 tracking-tighter">ideaDB</Link>
            <div className="flex gap-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "transition-colors",
                        isActive 
                          ? "bg-secondary text-foreground font-medium" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
}