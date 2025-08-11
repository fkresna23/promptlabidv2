import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
import { UserSync } from '@/components/UserSync';

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
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <UserSync />
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
