import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Filecoin Strategy OS | Strategic Clarity for Ecosystem Teams",
  description: "Enterprise-grade strategy methodology for Filecoin ecosystem teams. Transform technical excellence into market traction with proven frameworks used by Fortune 50 companies.",
  keywords: ["Filecoin", "Strategy", "Web3", "Blockchain", "Brand Strategy", "Go-to-Market"],
  openGraph: {
    title: "Filecoin Strategy OS",
    description: "Enterprise-grade strategy methodology for Filecoin ecosystem teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filecoin Strategy OS",
    description: "Enterprise-grade strategy methodology for Filecoin ecosystem teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
