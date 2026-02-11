import type { Metadata } from 'next';
import EmergencyFundCalculator from '@/components/calculators/emergency-fund/EmergencyFundCalculator';

export const metadata: Metadata = {
  title: 'Emergency Fund Calculator – How Much Do You Need? | CalcKit.us',
  description:
    'Calculate your ideal emergency fund size based on monthly expenses. Track your savings progress toward your target.',
  keywords: [
    'emergency fund calculator',
    'how much emergency fund',
    'emergency savings calculator',
    'rainy day fund calculator',
    'financial safety net',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/emergency-fund',
  },
  openGraph: {
    title: 'Emergency Fund Calculator – How Much Do You Need?',
    description: 'Calculate your ideal emergency fund size based on monthly expenses. Track your savings progress toward your target.',
    url: 'https://calckit.us/calculators/emergency-fund',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Fund Calculator – How Much Do You Need?',
    description: 'Calculate your ideal emergency fund size based on monthly expenses.',
  },
};

export default function EmergencyFundPage() {
  return <EmergencyFundCalculator />;
}
