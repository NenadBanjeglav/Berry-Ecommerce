import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import React from "react";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";

const poppins = localFont({
  src: "../fonts/Poppins.woff2",
  variable: "--font-poppins",
  weight: "400",
  preload: false,
});

export const metadata: Metadata = {
  title: "Berry Online Shop",
  description: "Berry Shop for educational purposes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
