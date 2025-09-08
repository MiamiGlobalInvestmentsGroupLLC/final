import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MGI Chatbot SaaS",
  description: "Miami Global Investments Group — Chatbot SaaS Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}