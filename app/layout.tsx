import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/shared/GoogleAnalytics";
import { Flex } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "CalcKit.us - Free Financial Calculators",
  description: "Free mortgage and APY calculators with comprehensive guides. Calculate monthly payments, amortization schedules, and compound interest.",
  keywords: ["mortgage calculator", "APY calculator", "financial calculator", "amortization schedule", "compound interest"],
  openGraph: {
    title: "CalcKit.us - Free Financial Calculators",
    description: "Free mortgage and APY calculators with comprehensive guides",
    url: "https://calckit.us",
    siteName: "CalcKit.us",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
