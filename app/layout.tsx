import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kopahi — Truly Indigenous · Assam Farms To Your Home",
    template: "%s · Kopahi",
  },
  description:
    "Premium agri-marketplace of North East India. Authentic, GI-tagged tea, honey, rice and spices sourced directly from verified Assam farmers.",
  keywords: [
    "Kopahi",
    "Assam tea",
    "GI tagged",
    "North East India",
    "organic produce",
    "wild honey",
    "black rice",
    "Lakadong turmeric",
    "Bhut Jolokia",
    "agri marketplace",
  ],
  metadataBase: new URL("https://kopahi.com"),
  openGraph: {
    title: "Kopahi — Truly Indigenous · Assam Farms To Your Home",
    description:
      "Premium agri-marketplace of North East India. Authentic, GI-tagged tea, honey, rice and spices direct from verified farmers.",
    url: "https://kopahi.com",
    siteName: "Kopahi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kopahi — Truly Indigenous",
    description:
      "Premium agri-marketplace of North East India. Authentic, GI-tagged produce direct from verified farmers.",
  },
  icons: {
    icon: "/Logo1.png",
    apple: "/Logo1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
