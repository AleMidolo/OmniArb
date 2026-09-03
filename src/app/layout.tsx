import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OmniArb | Arbitraggio sportivo, spiegato con precisione",
  description:
    "Scopri come funziona l'arbitraggio sportivo e come OmniArb segnalerà opportunità su Telegram. Servizio in preparazione per l'Italia, riservato ai maggiorenni.",
  applicationName: "OmniArb",
  keywords: [
    "arbitraggio sportivo",
    "surebet",
    "alert Telegram",
    "quote sportive",
  ],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#071716",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
