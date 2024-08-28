import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RESUME } from "@/consts/resume";
import { cn } from "@/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import type { LayoutProps } from "@/types";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster";
import { PostHogProvider } from "@/components/posthog-provider";

export const metadata: Metadata = {
  metadataBase: new URL(RESUME.url),
  title: {
    default: RESUME.name,
    template: `%s | ${RESUME.name}`,
  },
  description: RESUME.description,
  openGraph: {
    title: `${RESUME.name}`,
    description: RESUME.description,
    url: RESUME.url,
    siteName: `${RESUME.name}`,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${RESUME.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(
  () => import("../components/post-hog-page-view"),
  {
    ssr: false,
  },
);

export default ({ children }: LayoutProps) => {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <PostHogProvider>
          <body
            className={cn(
              "bg-background",
              GeistMono.variable,
              GeistSans.variable,
              GeistSans.className,
            )}
          >
            <main
              className={
                "relative mx-auto min-h-screen max-w-2xl px-6 py-12 font-sans antialiased sm:py-24"
              }
            >
              <ThemeProvider attribute="class" defaultTheme="light">
                <TooltipProvider delayDuration={0}>
                  {children}
                  <Navbar />
                </TooltipProvider>
                <Toaster />
              </ThemeProvider>
            </main>
          </body>
          <PostHogPageView />
        </PostHogProvider>
      </html>
    </ViewTransitions>
  );
};
