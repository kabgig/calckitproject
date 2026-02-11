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
};

export default function BudgetPage() {
  return <BudgetCalculator />;
}
