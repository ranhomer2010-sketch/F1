import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Массаж в Краснодаре | Александра",
  description:
    "Массаж в Краснодаре для снятия мышечного напряжения, глубокого расслабления и ощущения лёгкости. Александра, 12 лет практики.",
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
        <link
          rel="preload"
          as="image"
          href="./images/hero-main.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
