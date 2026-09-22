import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Массаж в Краснодаре | Александра",
  description:
    "Персональный массаж в Краснодаре: консультация перед сеансом, понятные цены и запись напрямую мастеру.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
