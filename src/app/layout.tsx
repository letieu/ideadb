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
              <main className="w-full flex-1">
                <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
                  <div className="max-w-5xl mx-auto">
                    {/* Minimal Utility Row */}
                    <div className="flex items-center justify-between mb-16 sm:mb-20">
                      <Link href="/" className="group flex items-center gap-3">
                        <Logo className="h-8 w-8 transition-all duration-200 group-hover:scale-105" />
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground/50 group-hover:text-primary transition-colors duration-200">ideaDB</span>
                      </Link>
                      <ModeToggle />
                    </div>
                    {children}
                  </div>
                </div>
              </main>
            </Suspense>
            <footer className="mt-24 sm:mt-32 border-t border-border/5">
              <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
                <p className="text-center text-xs tracking-[0.15em] uppercase text-muted-foreground/25 font-medium">
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