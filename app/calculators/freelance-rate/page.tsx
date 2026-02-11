import type { Metadata } from 'next';
import FreelanceRateCalculator from '@/components/calculators/freelance-rate/FreelanceRateCalculator';

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator – What to Charge | CalcKit.us',
  description:
    'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours.',
  keywords: [
    'freelance rate calculator',
    'freelance hourly rate',
    'consulting rate calculator',
    'contractor rate calculator',
    'what to charge freelance',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/freelance-rate',
  },
  openGraph: {
    title: 'Freelance Rate Calculator – What to Charge',
    description: 'Calculate your ideal freelance hourly rate based on desired income, expenses, taxes, and billable hours.',
    url: 'https://calckit.us/calculators/freelance-rate',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Rate Calculator – What to Charge',
    description: 'Calculate your ideal freelance hourly rate based on your income goals and expenses.',
  },
};

export default function FreelanceRatePage() {
  return <FreelanceRateCalculator />;
}
