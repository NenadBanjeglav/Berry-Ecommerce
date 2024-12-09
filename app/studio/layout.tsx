import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Berry Online Shop",
  description: "Berry Shop for educational purposes",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
