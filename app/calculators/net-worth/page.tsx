import type { Metadata } from 'next';
import NetWorthCalculator from '@/components/calculators/net-worth/NetWorthCalculator';

export const metadata: Metadata = {
  title: 'Net Worth Calculator – Assets vs Liabilities | CalcKit.us',
  description:
    'Calculate your net worth by listing all your assets and liabilities. See your total financial picture at a glance.',
  keywords: [
    'net worth calculator',
    'assets vs liabilities',
    'financial net worth',
    'personal net worth calculator',
    'wealth calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/net-worth',
  },
  openGraph: {
    title: 'Net Worth Calculator – Assets vs Liabilities',
    description: 'Calculate your net worth by listing all your assets and liabilities. See your total financial picture at a glance.',
    url: 'https://calckit.us/calculators/net-worth',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Worth Calculator – Assets vs Liabilities',
    description: 'Calculate your net worth by listing all your assets and liabilities.',
  },
};

export default function NetWorthPage() {
  return <NetWorthCalculator />;
}
