'use client'

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Check, ChevronsUpDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Category } from '@/lib/data';

interface FilterBarProps {
  categories: Category[];
  hasScore?: boolean;
}

export function FilterBar({ categories, hasScore = true }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [openCategory, setOpenCategory] = React.useState(false);
  const [query, setQuery] = React.useState(searchParams.get('q') || '');

  const currentCategory = searchParams.get('category');
  const currentSort = searchParams.get('sort') || 'newest';

  const updateParam = React.useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);

  React.useEffect(() => {
    const handler = setTimeout(() => {
        updateParam('q', query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query, updateParam]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-11 h-11 bg-background/50 border-border/60 hover:border-border focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 transition-all duration-200"
        />
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                size="sm"
                className="h-11 px-4 justify-between font-medium flex-1 sm:flex-none sm:w-auto border-border/60 hover:border-border hover:bg-accent/50 transition-all duration-200"
            >
                {currentCategory
                ? categories.find((c) => c.slug === currentCategory)?.name
                : "Category"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-60" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem
                            onSelect={() => {
                                updateParam('category', null);
                                setOpenCategory(false);
                            }}
                        >
                            <Check className={cn("mr-2 h-4 w-4", !currentCategory ? "opacity-100" : "opacity-0")} />
                            All Categories
                        </CommandItem>
                        {categories.map((category) => (
                            <CommandItem
                            key={category.slug}
                            onSelect={() => {
                                updateParam('category', category.slug === currentCategory ? null : category.slug);
                                setOpenCategory(false);
                            }}
                            >
                            <Check className={cn("mr-2 h-4 w-4", currentCategory === category.slug ? "opacity-100" : "opacity-0")} />
                            {category.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
            </PopoverContent>
        </Popover>

        <Select value={currentSort} onValueChange={(val) => updateParam('sort', val)}>
            <SelectTrigger className="w-[140px] h-11 text-sm font-medium border-border/60 hover:border-border transition-all duration-200">
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                {hasScore && <SelectItem value="score_desc">Popular</SelectItem>}
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
        </Select>

        {(currentCategory || query) && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-11 w-11 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 shrink-0" 
              onClick={() => {
                setQuery('');
                router.replace(pathname);
              }}
              aria-label="Clear filters"
            >
                <X className="h-4 w-4" />
            </Button>
        )}
      </div>
    </div>
  );
}
