import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { Flex } from "@chakra-ui/react";

export const metadata: Metadata = {
  metadataBase: new URL('https://calckit.us'),
  title: {
    default: "CalcKit.us - Free Financial Calculators & Expert Guides",
    template: "%s | CalcKit.us",
  },
  description: "Free mortgage and APY calculators with comprehensive guides. Calculate monthly payments, amortization schedules, and compound interest. Expert financial planning tools.",
  keywords: ["mortgage calculator", "APY calculator", "financial calculator", "amortization schedule", "compound interest", "home loan calculator", "savings calculator"],
  authors: [{ name: "CalcKit.us" }],
  creator: "CalcKit.us",
  publisher: "CalcKit.us",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CalcKit.us - Free Financial Calculators & Expert Guides",
    description: "Free mortgage and APY calculators with comprehensive guides. Calculate monthly payments, amortization schedules, and compound interest.",
    url: "https://calckit.us",
    siteName: "CalcKit.us",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcKit.us - Free Financial Calculators",
    description: "Free mortgage and APY calculators with comprehensive guides",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense - Required in head section */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3219586845995528"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        
        {/* Google Funding Choices - GDPR Consent Management */}
        <Script
          id="google-fc"
          src="https://fundingchoicesmessages.google.com/i/pub-3219586845995528?ers=1"
          strategy="beforeInteractive"
        />
        <Script
          id="google-fc-present"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`,
          }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Google Analytics - Edit components/shared/GoogleAnalytics.tsx to activate */}
        <GoogleAnalytics />
        
        <Providers>
          <Header />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
