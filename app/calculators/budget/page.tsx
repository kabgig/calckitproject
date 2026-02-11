import type { Metadata } from 'next';
import BudgetCalculator from '@/components/calculators/budget/BudgetCalculator';

export const metadata: Metadata = {
  title: 'Budget Calculator – 50/30/20 Rule | CalcKit.us',
  description:
    'Create a simple budget using the 50/30/20 rule. Allocate your monthly income to needs, wants, and savings with customizable percentages.',
  keywords: [
    'budget calculator',
    '50/30/20 rule calculator',
    'budget planner',
    'monthly budget calculator',
    'budgeting tool',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/budget',
  },
  openGraph: {
    title: 'Budget Calculator – 50/30/20 Rule',
    description: 'Create a simple budget using the 50/30/20 rule. Allocate your monthly income to needs, wants, and savings with customizable percentages.',
    url: 'https://calckit.us/calculators/budget',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Calculator – 50/30/20 Rule',
    description: 'Create a simple budget using the 50/30/20 rule with customizable percentages.',
  },
};

export default function BudgetPage() {
  return <BudgetCalculator />;
}
