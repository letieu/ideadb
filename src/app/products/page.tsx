import { getProducts, getCategories } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { FilterBar } from '@/components/filter-bar';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>;
}) {
  const { q, category, sort } = await searchParams;
  const products = getProducts(q, category, sort);
  const categories = getCategories();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Existing solutions in the market.</p>
      </div>

      <FilterBar categories={categories} hasScore={false} />

      <div className="grid gap-4 md:grid-cols-1">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 p-6 bg-card/80 backdrop-blur-sm">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                {product.url && (
                    <Button variant="ghost" size="icon" asChild className="ml-2 hover:bg-primary/10 hover:text-primary transition-colors">
                        <Link href={product.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.categories?.map((c) => (
                  <Badge key={c.slug} variant="secondary" className="hover:bg-secondary/80 transition-colors">
                    {c.name}
                  </Badge>
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </Card>
        ))}
        {products.length === 0 && (
           <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-card/50 rounded-lg border border-dashed">
             <p className="text-lg font-medium">No products found</p>
             <p className="text-sm">Try adjusting your filters or search terms.</p>
           </div>
        )}
      </div>
    </div>
  );
}