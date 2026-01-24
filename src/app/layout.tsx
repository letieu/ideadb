import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-zen-maru-gothic",
  weight: ["300", "400", "500", "700", "900"],
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
        className={`${zenMaruGothic.variable} antialiased min-h-screen bg-background font-sans text-foreground`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={['light', 'dark', 'rose-pine', 'rose-pine-dawn', 'ayu-light', 'ayu-dark']}
          >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full flex-1">
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </main>
            <footer className="mt-24 bg-muted/20 shadow-inner">
              <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-muted-foreground">
                  Built with ❤️ for innovators and problem solvers
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}