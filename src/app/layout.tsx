import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from 'next/font/local'
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const hackMono = localFont({
  src: "./HackNerdFontMono-Bold.ttf",
  variable: "--font-hack-mono"
})

export const metadata: Metadata = {
  title: "Sketchybar Editor",
  description: "Simple web editor to get started with configuring your own sketchybar config",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${hackMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
