import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veronica Fortuno Seput — International Business & Marketing",
  description:
    "University of Nevada, Las Vegas International Business & Marketing student, founder of RebelBot, and community builder with a global perspective.",
  openGraph: {
    title: "Veronica Fortuno Seput",
    description:
      "International Business & Marketing student, RebelBot founder, and community builder.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
