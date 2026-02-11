import type { Metadata } from 'next';
import DebtPayoffPlannerCalculator from '@/components/calculators/debt-payoff-planner/DebtPayoffPlannerCalculator';

export const metadata: Metadata = {
  title: 'Debt Payoff Planner – Avalanche vs Snowball | CalcKit.us',
  description:
    'Create a personalized debt payoff plan using avalanche or snowball strategy. See your payoff timeline, total interest, and payment schedule.',
  keywords: [
    'debt payoff planner',
    'debt snowball calculator',
    'debt avalanche calculator',
    'debt payoff calculator',
    'debt free calculator',
  ],
};

export default function DebtPayoffPlannerPage() {
  return <DebtPayoffPlannerCalculator />;
}
