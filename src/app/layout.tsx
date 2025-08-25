import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";
import AnalyticsProvider from "./providers/AnalyticsProvider";
import ConsentBanner from "./components/ConsentBanner";
import Preloader from "./components/Preloader";
import Script from "next/script";
import { businessSchema } from "./lib/constants";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const Geometria = localFont({
  src: "./fonts/Geometria.ttf",
  variable: "--font-Geometria-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Меблі Ромни | Купити шафи-купе, кухні, дивани, столи з доставкою",
  description:
    "Купити меблі у Ромнах – шафи-купе, кухні, столи, дивани, матраци. Висока якість, стильний дизайн і доступні ціни. Замовте меблі з доставкою по Ромнах вже сьогодні!",
  keywords: [
    "меблі Ромни",
    "шафи купе Ромни",
    "кухні на замовлення Ромни",
    "дивани Ромни",
    "купити меблі Ромни",
  ],
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
        url: "https://mebliromny.com.ua/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsicero-9aa5f.appspot.com%2Fo%2Fab6b1568-5878-4e76-ad1b-86f3373bd3ce.jpg%3Falt%3Dmedia&w=1920&q=75",
        width: 1024,
        height: 1077,
        alt: "Сучасні меблі у Ромнах",
      },
    ],
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
      <body className={`${geistSans.variable} ${geistMono.variable} ${Geometria.variable}`}>
        <Preloader />
        <Providers>
          <div className="heightContainer">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
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
