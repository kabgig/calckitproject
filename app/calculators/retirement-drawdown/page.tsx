import type { Metadata } from 'next';
import RetirementDrawdownCalculator from '@/components/calculators/retirement-drawdown/RetirementDrawdownCalculator';

export const metadata: Metadata = {
  title: 'Retirement Drawdown Calculator – How Long Will My Money Last? | CalcKit.us',
  description:
    'Calculate how long your retirement savings will last with annual withdrawals, investment returns, and inflation adjustments.',
  keywords: [
    'retirement drawdown calculator',
    'retirement withdrawal calculator',
    'how long will my money last',
    'retirement spending calculator',
    'safe withdrawal rate',
  ],
};

export default function RetirementDrawdownPage() {
  return <RetirementDrawdownCalculator />;
}
