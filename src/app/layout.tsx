import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mayank Upadhyay",
  description: "Software Engineering student at University Of Waterloo. Full stack developer & software engineer.",
  openGraph: {
    title: "Mayank Upadhyay",
    description: "Software Engineering student at University Of Waterloo.",
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