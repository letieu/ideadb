import { getProducts, getCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { FilterBar } from '@/components/filter-bar';
import { Pagination } from '@/components/pagination';
import { TitleNav } from '@/components/title-nav';
import { getCategoryColor, cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}) {
  const { q, category, sort, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data: products, metadata } = getProducts(q, category, sort, currentPage);
  const categories = getCategories();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <TitleNav />
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Case studies of existing solutions and products currently serving the market.
            {metadata.total > 0 && (
              <span className="block mt-1 font-medium text-primary">
                Showing {metadata.total} product{metadata.total !== 1 ? 's' : ''}
              </span>
            )}
        </p>
      </header>

      <div className="space-y-8">
        <FilterBar categories={categories} hasScore={false} />

        <div className="space-y-4">
          {products.map((product) => (
            <article key={product.id} className="group border-2 border-dashed border-border hover:border-primary/50 bg-transparent hover:bg-accent/5 transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="p-4 sm:p-8 space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                  <div className="space-y-2 flex-1 min-w-0 w-full">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold tracking-tight text-foreground leading-tight">{product.name}</h2>
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                          {product.categories.map((c) => (
                            <Badge 
                              key={c.slug} 
                              variant="outline" 
                              className={cn("text-xs font-medium", getCategoryColor(c.slug))}
                            >
                              {c.name}
                            </Badge>
                          ))}
                      </div>
                    )}
                  </div>
                  {product.url && (
                      <Link href={product.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-start">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-product hover:bg-product/10 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Visit product website</span>
                        </Button>
                      </Link>
                  )}
                </div>
                
                <div className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <span className="mb-0">{children}</span>,
                    }}
                  >
                    {product.description}
                  </ReactMarkdown>
                </div>
              </div>
            </article>
          ))}
          
          {products.length === 0 && (
            <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
              <p className="text-base text-muted-foreground font-medium">No products found matching your criteria</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filters</p>
            </div>
          )}

          <Pagination totalPages={metadata.totalPages} currentPage={metadata.page} />
        </div>
      </div>
    </div>
  );
}
