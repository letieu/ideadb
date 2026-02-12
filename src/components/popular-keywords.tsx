import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

const POPULAR_KEYWORDS = {
  problems: [
    "productivity",
    "automation",
    "workflow",
    "management",
    "tracking",
    "collaboration",
    "analytics",
    "saas",
    "mobile app",
    "web app",
    "b2b",
    "b2c",
    "ecommerce",
    "fintech",
    "healthtech",
    "edtech",
  ],
  ideas: [
    "ai powered",
    "automation tool",
    "dashboard",
    "integration",
    "api",
    "chrome extension",
    "mobile app",
    "web app",
    "plugin",
    "widget",
    "saas platform",
    "marketplace",
    "generator",
    "builder",
    "assistant",
    "tracker",
  ],
  products: [
    "saas",
    "open source",
    "api",
    "tool",
    "platform",
    "service",
    "framework",
    "library",
    "app",
    "software",
    "solution",
    "system",
  ],
};

interface PopularKeywordsProps {
  type: "problems" | "ideas" | "products";
}

export function PopularKeywords({ type }: PopularKeywordsProps) {
  const keywords = POPULAR_KEYWORDS[type];

  return (
    <div className="flex flex-wrap items-center gap-2 mt-4">
      <div className="flex items-center gap-1.5 text-muted-foreground/50 mr-1">
        <TrendingUp className="h-3 w-3" />
        <span className="text-[10px] uppercase tracking-wider font-medium">
          Popular:
        </span>
      </div>
      {keywords.map((keyword) => (
        <Link
          key={keyword}
          href={`/${type}?q=${encodeURIComponent(keyword)}`}
          className="text-[10px] text-muted-foreground/50 hover:text-foreground/70 transition-colors duration-200"
        >
          {keyword}
        </Link>
      ))}
    </div>
  );
}
