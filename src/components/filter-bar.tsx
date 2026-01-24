'use client'

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Check, ChevronsUpDown, Filter, Search, X } from 'lucide-react';
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

  // Debounce search
  React.useEffect(() => {
    const handler = setTimeout(() => {
        updateParam('q', query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  const currentCategory = searchParams.get('category');
  const currentSort = searchParams.get('sort') || (hasScore ? 'score_desc' : 'newest');

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-card/50 p-4 rounded-lg border backdrop-blur-sm shadow-sm">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20"
        />
      </div>

      <div className="flex gap-2">
        {/* Category Filter */}
        <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCategory}
                className="w-[200px] justify-between bg-background/50 border-muted-foreground/20"
            >
                {currentCategory
                ? categories.find((c) => c.slug === currentCategory)?.name
                : "Filter by category..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem
                            value="all"
                            onSelect={() => {
                                updateParam('category', null);
                                setOpenCategory(false);
                            }}
                        >
                            <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                !currentCategory ? "opacity-100" : "opacity-0"
                            )}
                            />
                            All Categories
                        </CommandItem>
                        {categories.map((category) => (
                            <CommandItem
                            key={category.slug}
                            value={category.name} // Command searches by this value
                            onSelect={() => {
                                updateParam('category', category.slug === currentCategory ? null : category.slug);
                                setOpenCategory(false);
                            }}
                            >
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                currentCategory === category.slug ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {category.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
            </PopoverContent>
        </Popover>

        {/* Sort Select */}
        <Select
            value={currentSort}
            onValueChange={(val) => updateParam('sort', val)}
        >
            <SelectTrigger className="w-[180px] bg-background/50 border-muted-foreground/20">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                {hasScore && <SelectItem value="score_desc">Highest Score</SelectItem>}
                {hasScore && <SelectItem value="score_asc">Lowest Score</SelectItem>}
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
        </Select>

        {/* Clear Filters Button (only if filters active) */}
        {(currentCategory || query) && (
            <Button variant="ghost" size="icon" onClick={() => {
                setQuery('');
                router.replace(pathname);
            }}>
                <X className="h-4 w-4" />
            </Button>
        )}
      </div>
    </div>
  );
}
