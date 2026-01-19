import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FITNESS COACH | AI Training Partner",
  description: "Your AI-powered fitness coaching assistant for weightlifting, yoga, mobility, and nutrition guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
