import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import Footer from "./components/footer";
import AnalyticsProvider from "./providers/AnalyticsProvider";
import ConsentBanner from "./components/ConsentBanner";
import Script from "next/script";
import { businessSchema } from "./lib/constants";
import { CartProvider } from "./context/CartContext";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header.server";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Меблі Ромни | шафи-купе, кухні, дивани, столи, матраци",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },        // класична іконка
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  description: "Купити меблі у Ромнах – шафи-купе, кухні, столи, дивани, матраци. По доступним цінам. Замовте меблі, доставка Ромни та Сумська область!",
  openGraph: {
    title: "Меблі Ромни – шафи, кухні, дивани, столи | Купити меблі",
    description:
      "Меблі у Ромнах: шафи-купе, кухні, дивани, столи, матраци. Замовлення з доставкою. Висока якість та стиль.",
    url: "https://mebliromny.com.ua",
    siteName: "Меблі Ромни",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dnwcmqbtm/image/upload/v1758481933/1_aouicz.png",
        width: 1536,
        height: 1024,
        alt: "Купити меблі у Ромнах – ліжка, матраци, дивани, столи",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mebliromny",
    title: "Меблі Ромни – сучасні меблі з доставкою",
    description:
      "Шафи-купе, кухні, дивани, столи, матраци. Доставка по Ромнах та області.",
    images: ["https://mebliromny.com.ua/og-image.jpg"],
  },
  alternates: {
    languages: {
      uk: 'https://mebliromny.com.ua/',       // Українська
      'x-default': 'https://mebliromny.com.ua/'  // За замовчуванням
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${manrope.variable}`}>
        <CartProvider>
          <Providers>
            {/* <Header /> */}
            <Header />
            {children}
            <Footer />
          </Providers>
        </CartProvider>
        <ConsentBanner />
        <AnalyticsProvider />
        <Script
          id="json-ld-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
      </body>
    </html>
  );
}
