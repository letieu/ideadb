import { getIdeas, getCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from '@/components/filter-bar';
import { VoteButton } from '@/components/vote-button';
import { Pagination } from '@/components/pagination';
import { TitleNav } from '@/components/title-nav';
import { getCategoryColor, cn } from '@/lib/utils';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default async function IdeasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}) {
  const { q, category, sort, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data: ideas, metadata } = await getIdeas(q, category, sort, currentPage);
  const categories = await getCategories();

  return (
    <div className="space-y-12 sm:space-y-16">
      <header className="space-y-4 sm:space-y-5 px-0">
        <TitleNav />
        <p className="text-base text-muted-foreground/80 max-w-2xl leading-[1.7]">
            Innovative concepts and feature-sets proposed to tackle hard problems.
            {metadata.total > 0 && (
              <span className="block mt-2 text-sm font-semibold text-foreground/60 tracking-wide">
                {metadata.total} idea{metadata.total !== 1 ? 's' : ''}
              </span>
            )}
        </p>
      </header>

      <div className="space-y-8 sm:space-y-10">
        <div className="px-0">
          <FilterBar categories={categories} />
        </div>

        <div className="space-y-4 sm:space-y-5 -mx-4 sm:mx-0">
          {ideas.map((idea) => (
            <Link key={idea.id} href={`/ideas/${idea.slug}`} className="block px-4 sm:px-0">
              <article className="group border-0 sm:border border-border/40 hover:border-border bg-card/30 hover:bg-card/60 backdrop-blur-sm transition-all duration-200 rounded-none sm:rounded-xl overflow-hidden cursor-pointer shadow-none sm:shadow-sm hover:shadow-md border-b border-b-border/20 last:border-b-0 sm:border-b-0">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 py-6 sm:p-8">
                  <aside className="order-2 sm:order-1 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 sm:flex-shrink-0">
                      <VoteButton id={idea.id} type="idea" currentScore={idea.score} />
                  </aside>
                  <div className="order-1 sm:order-2 flex-1 min-w-0 space-y-4 sm:space-y-5">
                    <div className="space-y-3">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-[-0.01em] text-foreground leading-[1.2] group-hover:text-idea transition-colors duration-200">
                          {idea.title}
                      </h2>
                      {idea.categories && idea.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {idea.categories.map((c) => (
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
                    
                    <div className="text-base text-muted-foreground/90 leading-[1.7] line-clamp-3">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <span className="mb-0">{children}</span>,
                        }}
                      >
                        {idea.description}
                      </ReactMarkdown>
                    </div>

                    {idea.features && (
                      <div className="bg-idea/8 border-l-2 border-idea/40 pl-4 pr-4 py-4 text-sm rounded-r-lg">
                        <span className="text-[11px] font-bold text-idea uppercase tracking-[0.1em] block mb-2">Key Features</span>
                        <div className="text-foreground/85 leading-[1.6]">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                            }}
                          >
                            {idea.features}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
          
          {ideas.length === 0 && (
            <div className="text-center py-16 sm:py-20 mx-4 sm:mx-0 border border-dashed border-border/50 rounded-xl bg-muted/20">
              <p className="text-base text-muted-foreground/80 font-semibold">No ideas found matching your criteria</p>
              <p className="text-sm text-muted-foreground/50 mt-2">Try adjusting your filters</p>
            </div>
          )}

          <Pagination totalPages={metadata.totalPages} currentPage={metadata.page} />
        </div>
      </div>
    </div>
  );
}