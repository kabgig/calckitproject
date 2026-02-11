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
};

export default function FreelanceRatePage() {
  return <FreelanceRateCalculator />;
}
