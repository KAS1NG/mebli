import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";
import AnalyticsProvider from "./providers/AnalyticsProvider";
import ConsentBanner from "./components/ConsentBanner";
// import Preloader from "./components/Preloader";
import Script from "next/script";
import { businessSchema } from "./lib/constants";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Manrope, Raleway } from "next/font/google";

// Основний шрифт (для тексту)
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

// Додатковий (для заголовків)
const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-raleway",
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const Geometria = localFont({
  src: "./fonts/Geometria.ttf",
  variable: "--font-Geometria-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Меблі Ромни | шафи-купе, кухні, дивани, столи, матраци",
  icons: {
    icon: "/icon.svg?v=2",
  },
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
      'uk-UA': '/uk-UA',  // Українська
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} ${Geometria.variable} ${manrope.variable} ${raleway.variable}`}>
        {/* <Preloader /> */}
        <CartProvider>
          <Providers>
            <div className="heightContainer">
              <Header />
              {children}
              <Footer />
            </div>
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
