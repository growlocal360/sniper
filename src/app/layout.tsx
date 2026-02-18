import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sniper Elite Services | Precision Under Pressure",
  description:
    "Sniper Elite Services provides expert catalyst handling, specialty welding, and mechanical services for industrial facilities. 24/7 emergency response with military-grade precision.",
  keywords: [
    "catalyst services",
    "specialty welding",
    "mechanical services",
    "industrial services",
    "turnaround support",
    "refinery services",
    "Sulphur LA",
    "reactor loading",
  ],
  openGraph: {
    title: "Sniper Elite Services | Precision Under Pressure",
    description:
      "Expert catalyst handling, specialty welding, and mechanical services with military-grade precision for industrial facilities.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-tactical-950 text-tactical-100`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
