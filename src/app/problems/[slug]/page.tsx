import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Lightbulb, Package, FileText } from 'lucide-react';
import { getProblemBySlug, getIdeasForProblem, getProductsForProblem, getSourceItemsForProblem } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { VoteButton } from '@/components/vote-button';
import { getCategoryColor, cn, formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = await getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const ideas = await getIdeasForProblem(problem.id);
  const products = await getProductsForProblem(problem.id);
  const sources = await getSourceItemsForProblem(problem.id);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link 
        href="/problems" 
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground/70 hover:text-foreground transition-all duration-200 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
        Back to Problems
      </Link>

      {/* Problem Header */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] text-foreground leading-[1.1]">
            {problem.title}
          </h1>
          
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

          <p className="text-sm text-muted-foreground/60 font-medium">
            Created {formatDate(problem.created_at)}
          </p>
        </div>

        {/* Action Bar - Place for Upvote, and future actions like Save, Like, Share */}
        <div className="flex items-center gap-4">
           <VoteButton id={problem.id} type="problem" currentScore={problem.score} orientation="horizontal" />
           {/* Future actions: <Button variant="outline" size="sm">Save</Button> */}
        </div>

        <Separator className="opacity-20" />

        <div className="space-y-6">
          <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown 
              components={{
                p: ({ children }) => <p className="text-lg sm:text-xl text-foreground/90 leading-[1.7] mb-5 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-lg sm:text-xl text-foreground/90 leading-[1.7]">{children}</li>,
                h1: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
                h2: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                h3: ({ children }) => <h4 className="text-lg font-bold mt-5 mb-2">{children}</h4>,
              }}
            >
              {problem.description}
            </ReactMarkdown>
          </div>

          {problem.pain_points && (
            <blockquote className="bg-problem/8 border-l-[3px] border-problem/50 pl-6 pr-6 py-5 rounded-r-lg">
              <span className="text-[11px] font-bold text-problem uppercase tracking-[0.1em] block mb-3">
                Pain Points
              </span>
              <ul className="list-disc list-inside text-base text-foreground/85 leading-[1.7] space-y-2">
                {problem.pain_points.split(',').map((point, idx) => (
                  <li key={idx}>{point.trim()}</li>
                ))}
              </ul>
            </blockquote>
          )}
        </div>
      </div>

      {/* Related Ideas */}
      {ideas.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-idea" />
            <h2 className="text-3xl font-serif font-bold tracking-[-0.01em] text-foreground">
              Related Ideas ({ideas.length})
            </h2>
          </div>
          
          <div className="grid gap-5">
            {ideas.map((idea) => (
              <Link key={idea.id} href={`/ideas/${idea.slug}`}>
                <Card className="group hover:shadow-lg hover:border-border transition-all duration-200 h-full">
                  <CardHeader>
                    <div className="flex items-start gap-5">
                      <VoteButton id={idea.id} type="idea" currentScore={idea.score} size="sm" />
                      <div className="flex-1 space-y-3">
                        <CardTitle className="text-xl sm:text-2xl font-bold tracking-[-0.01em] group-hover:text-idea transition-colors duration-200">
                          {idea.title}
                        </CardTitle>
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
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-base leading-[1.7] text-muted-foreground/90 line-clamp-3">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <span className="mb-0">{children}</span>,
                        }}
                      >
                        {idea.description}
                      </ReactMarkdown>
                    </div>
                    {idea.features && (
                      <div className="bg-idea/8 border-l-2 border-idea/40 pl-4 pr-4 py-3 rounded-r-lg">
                        <span className="text-[11px] font-bold text-idea uppercase tracking-[0.1em] block mb-2">
                          Key Features
                        </span>
                        <div className="text-sm text-foreground/85 leading-[1.6]">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                            }}
                          >
                            {idea.features}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {products.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-product" />
            <h2 className="text-3xl font-serif font-bold tracking-[-0.01em] text-foreground">
              Related Products ({products.length})
            </h2>
          </div>
          
          <div className="grid gap-5 sm:grid-cols-2">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg hover:border-border transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold tracking-[-0.01em] group-hover:text-product transition-colors duration-200">
                    {product.name}
                  </CardTitle>
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
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm leading-[1.6] text-muted-foreground/90">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      }}
                    >
                      {product.description}
                    </ReactMarkdown>
                  </div>
                  {product.url && (
                    <a 
                      href={product.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-product hover:text-product/80 transition-colors duration-200 font-semibold"
                    >
                      Visit Product
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Source Items */}
      {sources.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-muted-foreground" />
            <h2 className="text-3xl font-serif font-bold tracking-[-0.01em] text-foreground">
              Sources ({sources.length})
            </h2>
          </div>
          
          <div className="space-y-4">
            {sources.map((source) => (
              <Card key={source.id} className="hover:bg-accent/5 hover:border-border transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <CardTitle className="text-lg font-bold tracking-tight">
                        {source.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground/70">
                        <Badge variant="secondary" className="text-xs font-semibold">
                          {source.source}
                        </Badge>
                        {source.author && (
                          <span>by {source.author}</span>
                        )}
                        {source.source_created_at && (
                          <span>• {formatDate(source.source_created_at)}</span>
                        )}
                        {source.score > 0 && (
                          <span>• {source.score} points</span>
                        )}
                      </div>
                    </div>
                    {source.url && (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground/90 leading-[1.6] line-clamp-3">
                    {source.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Empty state when no related content */}
      {ideas.length === 0 && products.length === 0 && sources.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No related ideas, products, or sources found for this problem yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
