import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Sora } from "next/font/google";
import "./globals.css";

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Simulateur TJM",
  description: "Calcule ton TJM freelance simplement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${sora.variable} antialiased bg-background text-foreground`}>
        <Hero />
        <main className="container min-h-screen py-8">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
