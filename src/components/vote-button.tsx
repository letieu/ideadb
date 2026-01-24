'use client'

import { Button } from '@/components/ui/button';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { voteItem } from '@/lib/actions';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

export function VoteButton({ id, type, currentScore }: { id: string, type: 'problem' | 'idea', currentScore: number }) {
    const [isPending, startTransition] = useTransition();

    const handleVote = (value: number) => {
        startTransition(async () => {
             await voteItem(id, type, value);
        });
    }

    return (
    <div className="flex flex-row sm:flex-col gap-2 sm:gap-1">
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 hover:bg-primary/10 hover:text-primary transition-colors p-0" 
                onClick={() => handleVote(1)} 
                disabled={isPending}
                aria-label="Upvote"
            >
                <ArrowBigUp className={cn("h-4 w-4", currentScore > 0 && "fill-primary text-primary")} />
            </Button>
            <span className={cn(
                "font-semibold text-xs tabular-nums min-w-[2ch] text-center px-1 sm:px-0 sm:py-1",
                currentScore > 0 ? "text-primary" : currentScore < 0 ? "text-destructive" : "text-muted-foreground"
            )}>
                {currentScore}
            </span>
             <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive transition-colors p-0" 
                onClick={() => handleVote(-1)} 
                disabled={isPending}
                aria-label="Downvote"
            >
                <ArrowBigDown className={cn("h-4 w-4", currentScore < 0 && "fill-destructive text-destructive")} />
            </Button>
        </div>
    );
}