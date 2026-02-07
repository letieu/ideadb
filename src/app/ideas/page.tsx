import { getIdeas, getCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from '@/components/filter-bar';
import { VoteButton } from '@/components/vote-button';
import { getCategoryColor, cn } from '@/lib/utils';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default async function IdeasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const { q, category, sort } = await searchParams;
  const ideas = getIdeas(q, category, sort);
  const categories = getCategories();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-foreground">
          Ideas
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Innovative concepts and feature-sets proposed to tackle hard problems.
        </p>
      </header>

      <div className="space-y-8">
        <FilterBar categories={categories} />

        <div className="space-y-4">
          {ideas.map((idea) => (
            <Link key={idea.id} href={`/ideas/${idea.slug}`} className="block">
              <article className="group border-2 border-dashed border-border hover:border-primary/50 bg-transparent hover:bg-accent/5 transition-all duration-200 rounded-2xl overflow-hidden cursor-pointer">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 sm:p-8">
                  <aside className="order-2 sm:order-1 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 sm:flex-shrink-0">
                      <VoteButton id={idea.id} type="idea" currentScore={idea.score} />
                  </aside>
                  <div className="order-1 sm:order-2 flex-1 min-w-0 space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold tracking-tight text-foreground leading-tight group-hover:text-idea transition-colors">
                          {idea.title}
                      </h2>
                      {idea.categories && idea.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {idea.categories.map((c) => (
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
                    
                    <div className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <span className="mb-0">{children}</span>,
                        }}
                      >
                        {idea.description}
                      </ReactMarkdown>
                    </div>

                    {idea.features && (
                      <div className="bg-idea/5 pl-3 sm:pl-4 pr-3 sm:pr-4 py-3 sm:py-4 text-sm rounded-xl shadow-sm">
                        <span className="text-xs font-semibold text-idea uppercase tracking-wide block mb-1">Key Features</span>
                        <div className="text-foreground/80">
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
            <div className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
              <p className="text-base text-muted-foreground font-medium">No ideas found matching your criteria</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}