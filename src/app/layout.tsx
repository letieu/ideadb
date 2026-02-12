import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import { Github, Users, RefreshCw, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ideaDB - Problems, Ideas & Products Database",
    template: "%s | ideaDB",
  },
  description: "Discover real-world problems, explore innovative ideas, and find existing products. A curated database for innovators, entrepreneurs, and problem solvers.",
  keywords: ["problems", "ideas", "products", "innovation", "entrepreneurship", "startup ideas", "market research", "pain points", "business opportunities", "startup inspiration", "saas ideas", "app ideas", "side project ideas", "indie hacker", "product validation", "customer problems", "reddit problems", "hacker news ideas", "real user problems", "startup database", "problem database"],
  authors: [{ name: "ideaDB" }],
  creator: "ideaDB",
  publisher: "ideaDB",
  metadataBase: new URL("https://ideadb.shop"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ideadb.shop",
    siteName: "ideaDB",
    title: "ideaDB - Problems, Ideas & Products Database",
    description: "Discover real-world problems, explore innovative ideas, and find existing products. A curated database for innovators, entrepreneurs, and problem solvers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ideaDB - Problems, Ideas & Products Database",
    description: "Discover real-world problems, explore innovative ideas, and find existing products.",
    creator: "@ideadb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ideaDB",
  description: "Discover real-world problems, explore innovative ideas, and find existing products.",
  url: "https://ideadb.shop",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://ideadb.shop/problems?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen bg-background font-sans text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            themes={['light', 'dark', 'rose-pine', 'rose-pine-dawn', 'ayu-light', 'ayu-dark']}
          >
          <div className="flex flex-col min-h-screen">
            <main className="w-full flex-1">
              <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
                <div className="max-w-5xl mx-auto">
                  {/* Minimal Utility Row */}
                  <div className="flex items-center justify-between mb-16 sm:mb-20">
                    <Link href="/" className="group flex items-center gap-3">
                      <Logo className="h-8 w-8 transition-all duration-200 group-hover:scale-105" />
                      <span className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground/50 group-hover:text-primary transition-colors duration-200">ideaDB</span>
                    </Link>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <a href="https://github.com/letieu/ideadb" target="_blank" rel="noopener noreferrer">
                          <Github className="h-[1.2rem] w-[1.2rem]" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                      <ModeToggle />
                    </div>
                  </div>
                  
                  {/* Trust Badge */}
                  <div className="mb-8 -mt-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-border/10">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                        Live data from Reddit, HN & real users — updated daily
                      </span>
                    </div>
                  </div>
                  
                  {children}
                </div>
              </div>
            </main>
            <footer className="mt-24 sm:mt-32 border-t border-border/5">
              <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-8">
                  <div className="flex items-center gap-2 text-muted-foreground/50">
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-medium">Real User Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground/50">
                    <Globe className="h-4 w-4" />
                    <span className="text-xs font-medium">From Social Networks</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground/50">
                    <RefreshCw className="h-4 w-4" />
                    <span className="text-xs font-medium">Updated Daily</span>
                  </div>
                </div>
                <p className="text-center text-xs tracking-[0.15em] uppercase text-muted-foreground/25 font-medium">
                  Built for innovators and problem solvers
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}