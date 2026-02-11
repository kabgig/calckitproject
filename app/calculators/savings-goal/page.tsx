import type { Metadata } from 'next';
import SavingsGoalCalculator from '@/components/calculators/savings-goal/SavingsGoalCalculator';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator – Reach Your Target | CalcKit.us',
  description:
    'Calculate how long it takes to reach your savings goal with monthly contributions and compound interest.',
  keywords: [
    'savings goal calculator',
    'how long to save',
    'savings timeline calculator',
    'savings plan calculator',
    'goal savings calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/savings-goal',
  },
  openGraph: {
    title: 'Savings Goal Calculator – Reach Your Target',
    description: 'Calculate how long it takes to reach your savings goal with monthly contributions and compound interest.',
    url: 'https://calckit.us/calculators/savings-goal',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Goal Calculator – Reach Your Target',
    description: 'Calculate how long it takes to reach your savings goal with monthly contributions.',
  },
};

export default function SavingsGoalPage() {
  return <SavingsGoalCalculator />;
}
