import type { Metadata } from 'next';
import LifeInsuranceCalculator from '@/components/calculators/life-insurance/LifeInsuranceCalculator';

export const metadata: Metadata = {
  title: 'Life Insurance Calculator – How Much Coverage Do You Need? | CalcKit.us',
  description:
    'Calculate how much life insurance you need based on income replacement, debts, education costs, and existing coverage.',
  keywords: [
    'life insurance calculator',
    'how much life insurance',
    'life insurance needs calculator',
    'insurance coverage calculator',
    'term life insurance calculator',
  ],
};

export default function LifeInsurancePage() {
  return <LifeInsuranceCalculator />;
}
