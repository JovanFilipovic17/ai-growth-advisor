import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IC Systems Growth Intelligence",
  description:
    "Private market and competitor intelligence workspace for IC Systems.",
};

// Explicit (not just Next's default) so mobile Safari never falls back to a
// desktop-width layout viewport, and pinch-zoom stays available for users.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
