import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AcenteHane | Sigorta Acenteleri İçin Dijital Yönetim",
  description: "AcenteHane, sigorta acenteleri için müşteri, poliçe, teklif ve yenileme süreçlerini tek merkezde yönetmeye yönelik geliştirilen dijital platformdur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
