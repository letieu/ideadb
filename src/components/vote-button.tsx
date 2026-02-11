'use client'

import { Button } from '@/components/ui/button';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { voteItem } from '@/lib/actions';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

export function VoteButton({ 
  id, 
  type, 
  currentScore, 
  size = 'default',
  orientation
}: { 
  id: string;
  type: 'problem' | 'idea';
  currentScore: number;
  size?: 'default' | 'sm';
  orientation?: 'vertical' | 'horizontal';
}) {
    const [isPending, startTransition] = useTransition();

    const handleVote = (value: number) => {
        startTransition(async () => {
             await voteItem(id, type, value);
        });
    }

    const isSmall = size === 'sm';

    return (
    <div className={cn(
      "flex items-center rounded-lg bg-muted/30 border border-border/30",
      orientation === 'horizontal' ? "flex-row gap-2 px-3 py-1.5" : 
      orientation === 'vertical' ? "flex-col gap-1 px-2 py-2" : 
      "flex-row sm:flex-col gap-2 sm:gap-1 px-3 py-1.5 sm:px-2 sm:py-2",
      isSmall && "gap-1 px-2 py-1"
    )}>
            <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hover:bg-primary/10 hover:text-primary transition-all duration-200 p-0",
                  isSmall ? "h-6 w-6" : "h-7 w-7"
                )}
                onClick={() => handleVote(1)} 
                disabled={isPending}
                aria-label="Upvote"
            >
                <ArrowBigUp className={cn(
                  currentScore > 0 && "fill-primary text-primary",
                  isSmall ? "h-4 w-4" : "h-5 w-5"
                )} />
            </Button>
            <span className={cn(
                "font-bold tabular-nums min-w-[2.5ch] text-center",
                orientation === 'horizontal' ? "px-1" : 
                orientation === 'vertical' ? "py-1" : 
                "px-1 sm:px-0 sm:py-1",
                isSmall ? "text-xs" : "text-sm",
                currentScore > 0 ? "text-primary" : currentScore < 0 ? "text-destructive" : "text-muted-foreground/70"
            )}>
                {currentScore}
            </span>
             <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hover:bg-destructive/10 hover:text-destructive transition-all duration-200 p-0",
                  isSmall ? "h-6 w-6" : "h-7 w-7"
                )}
                onClick={() => handleVote(-1)} 
                disabled={isPending}
                aria-label="Downvote"
            >
                <ArrowBigDown className={cn(
                  currentScore < 0 && "fill-destructive text-destructive",
                  isSmall ? "h-4 w-4" : "h-5 w-5"
                )} />
            </Button>
        </div>
    );
}