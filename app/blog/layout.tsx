import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Guides & Calculator Tutorials - Expert Articles',
  description:
    'Expert guides on mortgages, savings, APY calculations and more. Learn how to make smarter financial decisions with comprehensive, evergreen content. Master financial calculators and planning strategies.',
  keywords: [
    'financial guides',
    'mortgage guides',
    'savings tips',
    'apy explained',
    'compound interest',
    'financial planning',
    'mortgage calculator guide',
    'apy calculator tutorial',
  ],
  openGraph: {
    title: 'Financial Guides & Tutorials | CalcKit.us',
    description:
      'Expert guides on mortgages, savings, APY calculations and more. Learn to make smarter financial decisions.',
    url: 'https://calckit.us/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Financial Guides | CalcKit.us',
    description: 'Expert articles on mortgages, savings, and financial planning.',
  },
  alternates: {
    canonical: 'https://calckit.us/blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
