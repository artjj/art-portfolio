import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

// Raiz independente (Next.js "multiple root layouts") — o Studio não deve
// herdar Navbar/tema/i18n do site público em app/[locale]/layout.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Studio — ART",
  robots: { index: false, follow: false },
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
