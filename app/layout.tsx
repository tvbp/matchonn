import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const heading = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Matchonn — Insurance, matched right",
  description:
    "Compare term life and health insurance from India's top insurers in minutes, talk it through with an AI advisor, then close with a licensed human — on WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
