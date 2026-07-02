import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Thrift Kro — Pakistan's AI-Powered Preloved Streetwear Marketplace",
  description:
    "Buy, sell, and discover curated secondhand streetwear with AI-powered styling, zero-risk escrow payments, and a thriving Gen-Z community. Join the waitlist today.",
  keywords: [
    "thrift",
    "streetwear",
    "preloved",
    "secondhand",
    "AI",
    "marketplace",
    "Pakistan",
    "Gen-Z",
    "escrow",
    "fashion",
  ],
  openGraph: {
    title: "Thrift Kro — Pakistan's AI-Powered Preloved Streetwear Marketplace",
    description:
      "Buy, sell, and discover curated secondhand streetwear with AI-powered styling, zero-risk escrow payments, and a thriving Gen-Z community.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col bg-[#F6F6F4] text-[#121212]"
        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
