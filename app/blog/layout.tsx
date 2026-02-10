import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Calculators & Expert Guides | CalcKit.us',
  description:
    'Expert guides on mortgages, savings, APY calculations and more. Learn how to make smarter financial decisions with comprehensive, evergreen content.',
  keywords: [
    'financial guides',
    'mortgage guides',
    'savings tips',
    'apy explained',
    'compound interest',
    'financial planning',
  ],
  openGraph: {
    title: 'Blog | CalcKit.us',
    description:
      'Expert guides on mortgages, savings, APY calculations and more.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
