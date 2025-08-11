import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PromptLab - Premium AI Prompts Library",
  description: "Discover and access a curated collection of high-quality AI prompts for ChatGPT, Claude, Midjourney, and more. Free and premium prompts for content creation, coding, marketing, and business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check if Clerk keys are configured
  const isClerkConfigured = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
    !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('your_clerk_publishable_key_here');

  if (isClerkConfigured) {
    return (
      <ClerkProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <Navbar />
            <main>{children}</main>
          </body>
        </html>
      </ClerkProvider>
    );
  }

  // Fallback without Clerk when not configured
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
