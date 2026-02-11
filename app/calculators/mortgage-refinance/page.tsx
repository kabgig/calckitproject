import type { Metadata } from 'next';
import MortgageRefinanceCalculator from '@/components/calculators/mortgage-refinance/MortgageRefinanceCalculator';

export const metadata: Metadata = {
  title: 'Mortgage Refinance Calculator – Should You Refinance? | CalcKit.us',
  description:
    'Calculate monthly savings, break-even point, and lifetime savings from refinancing your mortgage. Includes closing costs analysis.',
  keywords: [
    'mortgage refinance calculator',
    'should I refinance',
    'refinance savings calculator',
    'refinance break even',
    'mortgage rate comparison',
  ],
};

export default function MortgageRefinancePage() {
  return <MortgageRefinanceCalculator />;
}
