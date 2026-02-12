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
  const { data: products, metadata } = await getProducts(q, category, sort, currentPage);
  const categories = await getCategories();

  return (
    <div className="space-y-12 sm:space-y-16">
      <header className="space-y-4 sm:space-y-5 px-0">
        <TitleNav />
        <p className="text-base text-muted-foreground/80 max-w-2xl leading-[1.7]">
            Case studies of existing solutions and products currently serving the market.
            {metadata.total > 0 && (
              <span className="block mt-2 text-sm font-semibold text-foreground/60 tracking-wide">
                {metadata.total} product{metadata.total !== 1 ? 's' : ''}
              </span>
            )}
        </p>
      </header>

      <div className="space-y-8 sm:space-y-10">
        <div className="px-0">
          <FilterBar categories={categories} hasScore={false} />
        </div>

        <div className="space-y-4 sm:space-y-5 -mx-4 sm:mx-0">
          {products.map((product) => (
            <article key={product.id} className="group border-0 sm:border border-border/40 hover:border-border bg-card/30 hover:bg-card/60 backdrop-blur-sm transition-all duration-200 rounded-none sm:rounded-xl overflow-hidden shadow-none sm:shadow-sm hover:shadow-md border-b border-b-border/20 last:border-b-0 sm:border-b-0 px-4 sm:px-0">
              <div className="py-6 sm:p-8 space-y-4 sm:space-y-5">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                  <div className="space-y-3 flex-1 min-w-0 w-full">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-[-0.01em] text-foreground leading-[1.2]">{product.name}</h2>
                    {product.categories && product.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                          {product.categories.map((c) => (
                            <Badge 
                              key={c.slug} 
                              variant="outline" 
                              className={cn("text-xs font-semibold tracking-wide", getCategoryColor(c.slug))}
                            >
                              {c.name}
                            </Badge>
                          ))}
                      </div>
                    )}
                  </div>
                  {product.url && (
                      <Link href={product.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 self-start">
                        <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-product hover:bg-product/10 transition-colors duration-200">
                          <ExternalLink className="h-5 w-5" />
                          <span className="sr-only">Visit product website</span>
                        </Button>
                      </Link>
                  )}
                </div>
                
                <div className="text-base text-muted-foreground/90 leading-[1.7] line-clamp-3">
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
            <div className="text-center py-16 sm:py-20 mx-4 sm:mx-0 border border-dashed border-border/50 rounded-xl bg-muted/20">
              <p className="text-base text-muted-foreground/80 font-semibold">No products found matching your criteria</p>
              <p className="text-sm text-muted-foreground/50 mt-2">Try adjusting your filters</p>
            </div>
          )}

          <Pagination totalPages={metadata.totalPages} currentPage={metadata.page} />
        </div>
      </div>
    </div>
  );
}
