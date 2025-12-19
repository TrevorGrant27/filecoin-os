import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filecoin Strategy Launchpad",
  description: "Strategic clarity for Filecoin ecosystem teams. Turn technical excellence into market traction.",
  openGraph: {
    title: "Filecoin Strategy Launchpad",
    description: "Strategic clarity for Filecoin ecosystem teams.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filecoin Strategy Launchpad",
    description: "Strategic clarity for Filecoin ecosystem teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full">
      <body className="antialiased w-full min-h-screen">
        {children}
      </body>
    </html>
  );
}
