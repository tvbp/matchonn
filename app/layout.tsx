import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matchonn — Insurance, matched to you",
  description:
    "Compare term life and health insurance plans across India's top insurers, with an AI advisor to guide you and a licensed human to close the deal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
