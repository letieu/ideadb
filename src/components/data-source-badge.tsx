import { Users, Globe, RefreshCw } from "lucide-react";

interface DataSourceBadgeProps {
  sources?: string[];
  showUpdateFreq?: boolean;
}

export function DataSourceBadge({ sources = ["Reddit", "Hacker News"], showUpdateFreq = true }: DataSourceBadgeProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-muted-foreground/60">
      <div className="flex items-center gap-1.5">
        <Users className="h-3 w-3" />
        <span className="text-[10px] sm:text-xs font-medium">Real user submissions</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Globe className="h-3 w-3" />
        <span className="text-[10px] sm:text-xs font-medium">from {sources.join(", ")}</span>
      </div>
      {showUpdateFreq && (
        <div className="flex items-center gap-1.5">
          <RefreshCw className="h-3 w-3" />
          <span className="text-[10px] sm:text-xs font-medium">Updated daily</span>
        </div>
      )}
    </div>
  );
}
