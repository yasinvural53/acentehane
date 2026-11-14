import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acentehane | Yeni bir başlangıç",
  description: "Acentehane’ye hoş geldiniz. Yeni bir başlangıç için hazırlanıyoruz.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
