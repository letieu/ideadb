import { getIdeas, getCategories } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FilterBar } from '@/components/filter-bar';
import { VoteButton } from '@/components/vote-button';

export default async function IdeasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const { q, category, sort } = await searchParams;
  const ideas = getIdeas(q, category, sort);
  const categories = getCategories();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Startup Ideas</h1>
        <p className="text-muted-foreground">Explore potential solutions and features.</p>
      </div>

      <FilterBar categories={categories} />

      <div className="grid gap-4 md:grid-cols-1">
        {ideas.map((idea) => (
          <Card key={idea.id} className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-row p-6 bg-card/80 backdrop-blur-sm">
            <VoteButton id={idea.id} type="idea" currentScore={idea.score} />
             <div className="flex-1 ml-4 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{idea.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {idea.categories?.map((c) => (
                    <Badge key={c.slug} variant="secondary" className="hover:bg-secondary/80 transition-colors">
                        {c.name}
                    </Badge>
                    ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">{idea.description}</p>
                
                {idea.features && (
                    <div className="bg-muted/30 p-4 rounded-lg text-sm border border-border/50">
                        <span className="font-semibold block mb-1 text-foreground/80">Key Features</span>
                        <span className="text-muted-foreground">{idea.features}</span>
                    </div>
                )}
            </div>
          </Card>
        ))}
        {ideas.length === 0 && (
           <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-card/50 rounded-lg border border-dashed">
             <p className="text-lg font-medium">No ideas found</p>
             <p className="text-sm">Try adjusting your filters or search terms.</p>
           </div>
        )}
      </div>
    </div>
  );
}
