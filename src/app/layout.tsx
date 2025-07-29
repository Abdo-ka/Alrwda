import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alrwda - Islamic Electric Clocks",
  description: "Your trusted source for premium Islamic electric clocks",
  keywords: ["Islamic clocks", "electric clocks", "prayer times", "Islamic market", "Alrwda"],
  authors: [{ name: "Alrwda Market" }],
  openGraph: {
    title: "Alrwda - Islamic Electric Clocks",
    description: "Your trusted source for premium Islamic electric clocks",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
