import RetroGrid from "@/components/ui/retro-grid";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const burbank = localFont({
  src: "./fonts/Burbank Big Condensed Black.otf",
  variable: "--font-burbank",
});

export const metadata: Metadata = {
  title: "CUBA VERIFICACIÓN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${burbank.variable} relative flex items-center justify-center overflow-x-hidden antialiased dark:bg-black`}
      >
        <RetroGrid angle={0} />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
