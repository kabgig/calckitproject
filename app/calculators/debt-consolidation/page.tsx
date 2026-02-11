import type { Metadata } from 'next';
import DebtConsolidationCalculator from '@/components/calculators/debt-consolidation/DebtConsolidationCalculator';

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator – Save on Interest | CalcKit.us',
  description:
    'Compare your current debts with a consolidation loan. See potential monthly savings and total interest reduction.',
  keywords: [
    'debt consolidation calculator',
    'consolidate debt calculator',
    'debt consolidation savings',
    'combine debts calculator',
    'debt refinance calculator',
  ],
};

export default function DebtConsolidationPage() {
  return <DebtConsolidationCalculator />;
}
