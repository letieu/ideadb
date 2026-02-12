import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Target, ExternalLink, FileText, Users } from 'lucide-react';
import { getIdeaBySlug, getProblemsForIdea, getSourceItemsForIdea } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { VoteButton } from '@/components/vote-button';
import { getCategoryColor, cn, formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import { KeywordsList } from '@/components/keywords-list';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);

  if (!idea) {
    return {
      title: 'Idea Not Found',
    };
  }

  const description = idea.description.slice(0, 160).replace(/[#*_`]/g, '');
  const categoryNames = idea.categories?.map(c => c.name).join(', ') || '';
  const keywords = [
    'idea',
    'solution',
    'innovation',
    'startup idea',
    'product idea',
    'mvp idea',
    'business idea',
    'feature idea',
    ...categoryNames.toLowerCase().split(', ').filter(Boolean)
  ];

  return {
    title: idea.title,
    description: `${description}...`,
    keywords,
    alternates: {
      canonical: `/ideas/${idea.slug}`,
    },
    openGraph: {
      title: idea.title,
      description: `${description}...`,
      type: 'article',
      url: `https://ideadb.shop/ideas/${idea.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: idea.title,
      description: `${description}...`,
    },
  };
}

export default async function IdeaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);

  if (!idea) {
    notFound();
  }

  const problems = await getProblemsForIdea(idea.id);
  const sources = await getSourceItemsForIdea(idea.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: idea.title,
    description: idea.description.slice(0, 200).replace(/[#*_`]/g, ''),
    datePublished: idea.created_at,
    author: {
      "@type": "Organization",
      name: "ideaDB",
    },
    publisher: {
      "@type": "Organization",
      name: "ideaDB",
      logo: {
        "@type": "ImageObject",
        url: "https://ideadb.shop/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ideadb.shop/ideas/${idea.slug}`,
    },
    about: idea.categories?.map((c) => ({
      "@type": "Thing",
      name: c.name,
    })),
    isRelatedTo: problems.map((problem) => ({
      "@type": "Thing",
      name: problem.title,
      url: `https://ideadb.shop/problems/${problem.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
      {/* Back button */}
      <Link 
        href="/ideas" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Ideas
      </Link>

      {/* Idea Header */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground leading-tight">
            {idea.title}
          </h1>
          
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

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>Created {formatDate(idea.created_at)}</span>
            <span className="text-border">|</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground/70">
              <Users className="h-3 w-3" />
              <span className="text-xs">From community</span>
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-4">
           <VoteButton id={idea.id} type="idea" currentScore={idea.score} orientation="horizontal" />
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
              {idea.description}
            </ReactMarkdown>
          </div>

          {idea.features && (
            <blockquote className="bg-idea/5 border-l-4 border-idea pl-4 pr-4 py-4 rounded-r-xl">
              <span className="text-xs font-semibold text-idea uppercase tracking-wide block mb-2">
                Key Features
              </span>
              <ul className="text-base text-foreground/90 leading-relaxed list-disc pl-4 space-y-1">
                {idea.features.split(',').map((feature, idx) => (
                  <li key={idx}>{feature.trim()}</li>
                ))}
              </ul>
            </blockquote>
          )}
          
          <KeywordsList 
            keywords={[
              'idea',
              'solution',
              'innovation',
              'startup idea',
              'product idea',
              'mvp',
              ...idea.categories?.map(c => c.name.toLowerCase()) || []
            ]}
          />
        </div>
      </div>

      {/* Related Problems */}
      {problems.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-problem" />
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Related Problems ({problems.length})
            </h2>
          </div>
          
          <div className="grid gap-4">
            {problems.map((problem) => (
              <Card key={problem.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <VoteButton id={problem.id} type="problem" currentScore={problem.score} size="sm" />
                    <div className="flex-1 space-y-2">
                      <CardTitle className="text-lg sm:text-xl group-hover:text-problem transition-colors">
                        {problem.title}
                      </CardTitle>
                      {problem.categories && problem.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {problem.categories.map((c) => (
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
                      {problem.description}
                    </ReactMarkdown>
                  </div>
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
      {problems.length === 0 && sources.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              No related problems or sources found for this idea yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
    </>
  );
}
