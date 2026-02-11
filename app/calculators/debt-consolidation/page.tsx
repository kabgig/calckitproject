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
  alternates: {
    canonical: 'https://calckit.us/calculators/debt-consolidation',
  },
  openGraph: {
    title: 'Debt Consolidation Calculator – Save on Interest',
    description: 'Compare your current debts with a consolidation loan. See potential monthly savings and total interest reduction.',
    url: 'https://calckit.us/calculators/debt-consolidation',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Consolidation Calculator – Save on Interest',
    description: 'Compare your current debts with a consolidation loan and see potential savings.',
  },
};

export default function DebtConsolidationPage() {
  return <DebtConsolidationCalculator />;
}
