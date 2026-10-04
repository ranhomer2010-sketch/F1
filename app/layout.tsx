import type { Metadata } from "next";
import "./globals.css";

const siteOrigin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://reborn-massage.ru").replace(/\/$/, "");
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "Массаж в Краснодаре | Александра",
  description:
    "Массаж в Краснодаре для снятия мышечного напряжения, глубокого расслабления и ощущения лёгкости. Александра, 12 лет практики.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    title: "Массаж в Краснодаре | Александра",
    description:
      "Массаж в Краснодаре для снятия мышечного напряжения, глубокого расслабления и ощущения лёгкости. Александра, 12 лет практики.",
  },
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
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
