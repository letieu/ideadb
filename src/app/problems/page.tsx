import { getProblems, getCategories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from '@/components/filter-bar';
import { VoteButton } from '@/components/vote-button';
import { getCategoryColor, cn } from '@/lib/utils';

export default async function ProblemsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const { q, category, sort } = await searchParams;
  const problems = getProblems(q, category, sort);
  const categories = getCategories();

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-foreground">
          Problems
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Deeply understand real-world challenges before thinking about solutions.
        </p>
      </header>

      <div className="space-y-8">
        <FilterBar categories={categories} />

        <div className="space-y-4">
          {problems.map((problem) => (
            <article key={problem.id} className="group bg-card hover:bg-accent/5 shadow-md hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 p-4 sm:p-8">
                <aside className="order-2 sm:order-1 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0 sm:flex-shrink-0">
                    <VoteButton id={problem.id} type="problem" currentScore={problem.score} />
                </aside>
                <div className="order-1 sm:order-2 flex-1 min-w-0 space-y-3 sm:space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-semibold tracking-tight text-foreground leading-tight">
                        {problem.title}
                    </h2>
                    {problem.categories && problem.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                          {problem.categories.map((c) => (
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
                  
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>

                  {problem.pain_points && (
                    <blockquote className="bg-problem/5 pl-3 sm:pl-4 pr-3 sm:pr-4 py-3 sm:py-4 text-sm italic text-foreground/80 rounded-xl shadow-sm">
                      <span className="text-xs font-semibold text-problem uppercase tracking-wide not-italic block mb-1">Pain Points</span>
                      &ldquo;{problem.pain_points}&rdquo;
                    </blockquote>
                  )}
                </div>
              </div>
            </article>
          ))}
          
          {problems.length === 0 && (
            <div className="text-center py-16 bg-muted/30 rounded-2xl shadow-inner">
              <p className="text-base text-muted-foreground font-medium">No problems found matching your criteria</p>
              <p className="text-sm text-muted-foreground/60 mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}