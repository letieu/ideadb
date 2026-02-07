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
      "flex items-center",
      orientation === 'horizontal' ? "flex-row gap-2" : 
      orientation === 'vertical' ? "flex-col gap-1" : 
      "flex-row sm:flex-col gap-2 sm:gap-1",
      isSmall && "gap-1"
    )}>
            <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hover:bg-primary/10 hover:text-primary transition-colors p-0",
                  isSmall ? "h-5 w-5" : "h-6 w-6"
                )}
                onClick={() => handleVote(1)} 
                disabled={isPending}
                aria-label="Upvote"
            >
                <ArrowBigUp className={cn(
                  currentScore > 0 && "fill-primary text-primary",
                  isSmall ? "h-3.5 w-3.5" : "h-4 w-4"
                )} />
            </Button>
            <span className={cn(
                "font-semibold tabular-nums min-w-[2ch] text-center",
                orientation === 'horizontal' ? "px-1" : 
                orientation === 'vertical' ? "py-1" : 
                "px-1 sm:px-0 sm:py-1",
                isSmall ? "text-xs" : "text-xs",
                currentScore > 0 ? "text-primary" : currentScore < 0 ? "text-destructive" : "text-muted-foreground"
            )}>
                {currentScore}
            </span>
             <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hover:bg-destructive/10 hover:text-destructive transition-colors p-0",
                  isSmall ? "h-5 w-5" : "h-6 w-6"
                )}
                onClick={() => handleVote(-1)} 
                disabled={isPending}
                aria-label="Downvote"
            >
                <ArrowBigDown className={cn(
                  currentScore < 0 && "fill-destructive text-destructive",
                  isSmall ? "h-3.5 w-3.5" : "h-4 w-4"
                )} />
            </Button>
        </div>
    );
}