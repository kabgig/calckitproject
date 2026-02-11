import type { Metadata } from 'next';
import HomeAffordabilityCalculator from '@/components/calculators/home-affordability/HomeAffordabilityCalculator';

export const metadata: Metadata = {
  title: 'Home Affordability Calculator – How Much House Can I Afford? | CalcKit.us',
  description:
    'Estimate the maximum home price you can afford based on income, debts, and interest rates. Uses the 28/36 DTI rule.',
  keywords: [
    'home affordability calculator',
    'how much house can I afford',
    'DTI calculator',
    'mortgage affordability',
    'home buying calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/home-affordability',
  },
  openGraph: {
    title: 'Home Affordability Calculator – How Much House Can I Afford?',
    description: 'Estimate the maximum home price you can afford based on income, debts, and interest rates. Uses the 28/36 DTI rule.',
    url: 'https://calckit.us/calculators/home-affordability',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Affordability Calculator – How Much House Can I Afford?',
    description: 'Estimate the maximum home price you can afford based on income and debts.',
  },
};

export default function HomeAffordabilityPage() {
  return <HomeAffordabilityCalculator />;
}
