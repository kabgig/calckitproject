import type { Metadata } from 'next';
import MillionaireCalculator from '@/components/calculators/millionaire-calculator/MillionaireCalculator';

export const metadata: Metadata = {
  title: 'Millionaire Calculator – When Will You Be a Millionaire? | CalcKit.us',
  description:
    'Find out how many years it takes to reach one million dollars or any savings target based on your current savings and contributions.',
  keywords: [
    'millionaire calculator',
    'when will I be a millionaire',
    'savings goal calculator',
    'million dollar calculator',
    'wealth calculator',
  ],
};

export default function MillionaireCalculatorPage() {
  return <MillionaireCalculator />;
}
