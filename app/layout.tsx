import "./globals.css";
import type { Metadata } from "next";
import { QueryClient } from "@tanstack/react-query";
import Providers from "./providers";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Resource Explorer — Rick & Morty",
  description: "Search, filter, sort, and favorite characters.",
};

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        {/* Make sure EVERYTHING that needs theme is inside <Providers> */}
        <Providers>
          <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur">
            <div className="container-narrow flex items-center justify-between gap-4 py-3">
              <Link href="/characters" className="text-base font-semibold">
                Resource Explorer
              </Link>
              <nav className="flex items-center gap-3 text-sm">
                <Link href="/characters" className="hover:underline">
                  Characters
                </Link>
                <a
                  className="hover:underline"
                  href="https://rickandmortyapi.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  API
                </a>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="container-narrow py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
