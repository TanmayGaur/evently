import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { SupabaseProvider } from "@/contexts/SupabaseContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evently",
  description: "Event booking app",
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
