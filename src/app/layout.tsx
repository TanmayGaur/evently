import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { SupabaseProvider } from "@/contexts/SupabaseContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Evently - Premium Event Booking Platform",
    template: "%s | Evently",
  },
  description:
    "Discover and book premium events with Evently. Access exclusive events with our tiered membership plans including free, silver, gold, and platinum tiers.",
  keywords: [
    "events",
    "booking",
    "premium",
    "tickets",
    "membership",
    "exclusive",
  ],
  authors: [{ name: "Evently Team" }],
  creator: "Evently",
  publisher: "Evently",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Evently - Premium Event Booking Platform",
    description:
      "Discover and book premium events with Evently. Access exclusive events with our tiered membership plans.",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    siteName: "Evently",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evently - Premium Event Booking Platform",
    description:
      "Discover and book premium events with Evently. Access exclusive events with our tiered membership plans.",
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gradient-dark text-white`}>
          <SupabaseProvider>
            {children}
            <Toaster />
          </SupabaseProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
