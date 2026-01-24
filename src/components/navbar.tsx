'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/problems', label: 'Problems' },
    { href: '/ideas', label: 'Ideas' },
    { href: '/products', label: 'Products' },
  ];

  return (
    <nav className="bg-background sticky top-0 z-50 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-border/40 after:to-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors group cursor-pointer">
                  <Logo className="h-8 w-8 transition-transform group-hover:scale-110" />
                  <span>ideaDB</span>
                </Link>
                <div className="hidden sm:flex gap-1">
                  {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Link key={item.href} href={item.href}>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={cn(
                            "cursor-pointer h-9 px-3 text-sm font-medium transition-colors relative",
                            isActive 
                              ? "text-foreground font-semibold" 
                              : "text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {item.label}
                          {isActive && (
                              <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-foreground rounded-full" />
                          )}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
