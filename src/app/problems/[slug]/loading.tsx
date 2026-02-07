import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ProblemDetailLoading() {
  return (
    <div className="space-y-8">
      {/* Back button skeleton */}
      <Skeleton className="h-5 w-32" />

      {/* Problem Header */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-0">
          <Skeleton className="h-20 w-12" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-20 w-full" />
            <Card>
              <CardContent className="pt-6">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Related sections skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
