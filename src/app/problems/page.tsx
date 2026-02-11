import { getProblems, getCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from '@/components/filter-bar';
import { VoteButton } from '@/components/vote-button';
import { Pagination } from '@/components/pagination';
import { TitleNav } from '@/components/title-nav';
import { getCategoryColor, cn } from '@/lib/utils';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default async function ProblemsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}) {
  const { q, category, sort, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data: problems, metadata } = getProblems(q, category, sort, currentPage);
  const categories = getCategories();

  return (
    <div className="space-y-12 sm:space-y-16">
      <header className="space-y-4 sm:space-y-5 px-0">
        <TitleNav />
        <p className="text-base text-muted-foreground/80 max-w-2xl leading-[1.7]">
          Deeply understand real-world challenges before thinking about solutions.
          {metadata.total > 0 && (
            <span className="block mt-2 text-sm font-semibold text-foreground/60 tracking-wide">
              {metadata.total} problem{metadata.total !== 1 ? 's' : ''}
            </span>
          )}
        </p>
      </header>

      <div className="space-y-8 sm:space-y-10">
        <div className="px-0">
          <FilterBar categories={categories} />
        </div>

        <div className="space-y-4 sm:space-y-5 -mx-4 sm:mx-0">
          {problems.map((problem) => (
            <Link key={problem.id} href={`/problems/${problem.slug}`} className="block px-4 sm:px-0">
              <article className="group border-0 sm:border border-border/40 hover:border-border bg-card/30 hover:bg-card/60 backdrop-blur-sm transition-all duration-200 rounded-none sm:rounded-xl overflow-hidden cursor-pointer shadow-none sm:shadow-sm hover:shadow-md border-b border-b-border/20 last:border-b-0 sm:border-b-0">
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 py-6 sm:p-8">
                  <aside className="order-2 sm:order-1 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 sm:flex-shrink-0">
                      <VoteButton id={problem.id} type="problem" currentScore={problem.score} />
                  </aside>
                  <div className="order-1 sm:order-2 flex-1 min-w-0 space-y-4 sm:space-y-5">
                    <div className="space-y-3">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold tracking-[-0.01em] text-foreground leading-[1.2] group-hover:text-problem transition-colors duration-200">
                          {problem.title}
                      </h2>
                      {problem.categories && problem.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {problem.categories.map((c) => (
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
                    
                    <div className="text-base text-muted-foreground/90 leading-[1.7] line-clamp-2">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <span className="mb-0">{children}</span>,
                        }}
                      >
                        {problem.description}
                      </ReactMarkdown>
                    </div>

                    {problem.pain_points && (
                      <blockquote className="bg-problem/8 border-l-2 border-problem/40 pl-4 pr-4 py-4 text-sm text-foreground/85 rounded-r-lg">
                        <span className="text-[11px] font-bold text-problem uppercase tracking-[0.1em] block mb-2">Pain Points</span>
                        <div className="line-clamp-2 leading-[1.6]">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <span className="mb-0 italic">&ldquo;{children}&rdquo;</span>,
                            }}
                          >
                            {problem.pain_points}
                          </ReactMarkdown>
                        </div>
                      </blockquote>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
          
          {problems.length === 0 && (
            <div className="text-center py-16 sm:py-20 mx-4 sm:mx-0 border border-dashed border-border/50 rounded-xl bg-muted/20">
              <p className="text-base text-muted-foreground/80 font-semibold">No problems found matching your criteria</p>
              <p className="text-sm text-muted-foreground/50 mt-2">Try adjusting your filters</p>
            </div>
          )}

          <Pagination totalPages={metadata.totalPages} currentPage={metadata.page} />
        </div>
      </div>
    </div>
  );
}