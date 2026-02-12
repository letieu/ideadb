import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface KeywordsListProps {
  keywords: string[];
  title?: string;
}

export function KeywordsList({ keywords, title = "Keywords" }: KeywordsListProps) {
  if (keywords.length === 0) return null;

  return (
    <div className="mt-6 pt-6 border-t border-border/10">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="h-3.5 w-3.5 text-muted-foreground/50" />
        <span className="text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
          {title}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="text-[10px] px-2 py-0.5 bg-muted/30 text-muted-foreground/70 hover:bg-muted/50 cursor-default"
          >
            {keyword}
          </Badge>
        ))}
      </div>
    </div>
  );
}
