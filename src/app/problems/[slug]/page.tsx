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
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const ideas = getIdeasForProblem(problem.id);
  const products = getProductsForProblem(problem.id);
  const sources = getSourceItemsForProblem(problem.id);

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link 
        href="/problems" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Problems
      </Link>

      {/* Problem Header */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
            {problem.title}
          </h1>
          
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

          <p className="text-sm text-muted-foreground">
            Created {formatDate(problem.created_at)}
          </p>
        </div>

        {/* Action Bar - Place for Upvote, and future actions like Save, Like, Share */}
        <div className="flex items-center gap-4">
           <VoteButton id={problem.id} type="problem" currentScore={problem.score} orientation="horizontal" />
           {/* Future actions: <Button variant="outline" size="sm">Save</Button> */}
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert max-w-none">
            <ReactMarkdown 
              components={{
                p: ({ children }) => <p className="text-base sm:text-lg text-foreground leading-relaxed mb-4 last:mb-0">{children}</p>,
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                li: ({ children }) => <li className="text-base sm:text-lg text-foreground">{children}</li>,
                h1: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                h2: ({ children }) => <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>,
                h3: ({ children }) => <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>,
              }}
            >
              {problem.description}
            </ReactMarkdown>
          </div>

          {problem.pain_points && (
            <blockquote className="bg-problem/5 border-l-4 border-problem pl-4 pr-4 py-4 rounded-r-xl">
              <span className="text-xs font-semibold text-problem uppercase tracking-wide block mb-2">
                Pain Points
              </span>
              <div className="text-base text-foreground/90 italic leading-relaxed">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">&ldquo;{children}&rdquo;</p>,
                  }}
                >
                  {problem.pain_points}
                </ReactMarkdown>
              </div>
            </blockquote>
          )}
        </div>
      </div>

      {/* Related Ideas */}
      {ideas.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-idea" />
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Related Ideas ({ideas.length})
            </h2>
          </div>
          
          <div className="grid gap-4">
            {ideas.map((idea) => (
              <Link key={idea.id} href={`/ideas/${idea.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-200 h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <VoteButton id={idea.id} type="idea" currentScore={idea.score} size="sm" />
                      <div className="flex-1 space-y-2">
                        <CardTitle className="text-lg sm:text-xl group-hover:text-idea transition-colors">
                          {idea.title}
                        </CardTitle>
                        {idea.categories && idea.categories.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {idea.categories.map((c) => (
                              <Badge 
                                key={c.slug} 
                                variant="outline" 
                                className={cn("text-xs", getCategoryColor(c.slug))}
                              >
                                {c.name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <span className="mb-0">{children}</span>,
                        }}
                      >
                        {idea.description}
                      </ReactMarkdown>
                    </div>
                    {idea.features && (
                      <div className="bg-idea/5 p-3 rounded-lg">
                        <span className="text-xs font-semibold text-idea uppercase tracking-wide block mb-1">
                          Key Features
                        </span>
                        <div className="text-sm text-foreground/80">
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
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-product" />
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Related Products ({products.length})
            </h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-product transition-colors">
                    {product.name}
                  </CardTitle>
                  {product.categories && product.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.categories.map((c) => (
                        <Badge 
                          key={c.slug} 
                          variant="outline" 
                          className={cn("text-xs", getCategoryColor(c.slug))}
                        >
                          {c.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm leading-relaxed text-muted-foreground">
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
                      className="inline-flex items-center gap-2 text-sm text-product hover:text-product/80 transition-colors font-medium"
                    >
                      Visit Product
                      <ExternalLink className="h-3.5 w-3.5" />
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
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Sources ({sources.length})
            </h2>
          </div>
          
          <div className="space-y-3">
            {sources.map((source) => (
              <Card key={source.id} className="hover:bg-accent/5 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <CardTitle className="text-base font-semibold">
                        {source.title}
                      </CardTitle>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
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
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
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
