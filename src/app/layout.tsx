import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import Header from "./components/header";
import Footer from "./components/footer";

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

export const metadata: Metadata = {
  title: "Manufacture P",
  description: "Меблі, шафи купе, кухні, столи, стільці, софи, ліжка, матраси місто Ромни",
  alternates: {
    languages: {
      'uk-UA': '/uk-UA',  // Українська
      'ru-RU': '/ru-RU',  // Російська
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <div className="heightContainer">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
