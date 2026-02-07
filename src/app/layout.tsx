import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingBar } from "@/components/loading-bar";
import Link from "next/link";

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
  title: "ideaDB",
  description: "Explore problems, ideas, and products.",
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
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            themes={['light', 'dark', 'rose-pine', 'rose-pine-dawn', 'ayu-light', 'ayu-dark']}
          >
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<LoadingBar />}>
              <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full flex-1">
                <div className="max-w-4xl mx-auto">
                  {/* Minimal Utility Row */}
                  <div className="flex items-center justify-between mb-16">
                    <Link href="/" className="group flex items-center gap-3">
                      <Logo className="h-7 w-7 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                      <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground/40 group-hover:text-primary transition-colors">ideaDB</span>
                    </Link>
                    <ModeToggle />
                  </div>
                  {children}
                </div>
              </main>
            </Suspense>
            <footer className="mt-24 border-t border-border/10">
              <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs tracking-widest uppercase text-muted-foreground/30">
                  Built for innovators and problem solvers
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}