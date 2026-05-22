import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veronica Fortuno Seput — International Business, Marketing & Startup Founder",
  description:
    "Trilingual startup founder, UNLV International Business & Marketing student. Founder of RebelBot. Open to global opportunities.",
  openGraph: {
    title: "Veronica Fortuno Seput",
    description:
      "International Business & Marketing student, startup founder, and world traveler.",
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
      <body className="min-h-screen bg-navy text-white font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
