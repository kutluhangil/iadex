import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "iadex — Shopify İade Yönetimi",
  description: "Shopify mağazanız için akıllı iade yönetimi. Otomatik onay, kargo etiketi ve derin analitik.",
  keywords: ["shopify iade", "iade yönetimi", "returnbox", "iadex"],
  authors: [{ name: "iadex" }],
  openGraph: {
    title: "iadex — Shopify İade Yönetimi",
    description: "Shopify mağazanız için akıllı iade yönetimi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
