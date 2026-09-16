import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


import { siteConfig } from "@/config/site";
import { AppProviders } from "@/providers/app-providers";
import {MiaFloatingButton} from '@/features/floating-button';

import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full">
        <AppProviders>{children}</AppProviders>
                <MiaFloatingButton />

      </body>
    </html>
  );
}
