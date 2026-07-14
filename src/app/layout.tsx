import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harsh Upadhyay",
  description: "Computer science student at McMaster University. Full stack developer & software engineer.",
  openGraph: {
    title: "Harsh Upadhyay",
    description: "Computer science student at McMaster University.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}