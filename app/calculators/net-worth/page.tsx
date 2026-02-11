import type { Metadata } from 'next';
import NetWorthCalculator from '@/components/calculators/net-worth/NetWorthCalculator';

export const metadata: Metadata = {
  title: 'Net Worth Calculator – Assets vs Liabilities | CalcKit.us',
  description:
    'Calculate your net worth by listing all your assets and liabilities. See your total financial picture at a glance.',
  keywords: [
    'net worth calculator',
    'assets vs liabilities',
    'financial net worth',
    'personal net worth calculator',
    'wealth calculator',
  ],
};

export default function NetWorthPage() {
  return <NetWorthCalculator />;
}
