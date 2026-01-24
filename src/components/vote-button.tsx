'use client'

import { Button } from '@/components/ui/button';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { voteItem } from '@/lib/actions';
import { useTransition } from 'react';

export function VoteButton({ id, type, currentScore }: { id: string, type: 'problem' | 'idea', currentScore: number }) {
    const [isPending, startTransition] = useTransition();

    const handleVote = (value: number) => {
        startTransition(async () => {
             await voteItem(id, type, value);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center mr-4 space-y-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-transparent hover:text-primary p-0" onClick={() => handleVote(1)} disabled={isPending}>
                <ArrowBigUp className="h-8 w-8" />
            </Button>
            <span className="font-bold text-sm tabular-nums">{currentScore}</span>
             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-transparent hover:text-destructive p-0" onClick={() => handleVote(-1)} disabled={isPending}>
                <ArrowBigDown className="h-8 w-8" />
            </Button>
        </div>
    );
}
