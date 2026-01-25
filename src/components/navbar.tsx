import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Logo } from '@/components/logo';
import { NavItems } from '@/components/nav-items';

export function Navbar() {
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
                <NavItems />
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
