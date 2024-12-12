import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Assignment Submission Portal",
  description: "The Assignment Submission Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
