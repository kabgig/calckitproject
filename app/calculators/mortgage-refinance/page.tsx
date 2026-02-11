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
  alternates: {
    canonical: 'https://calckit.us/calculators/mortgage-refinance',
  },
  openGraph: {
    title: 'Mortgage Refinance Calculator – Should You Refinance?',
    description: 'Calculate monthly savings, break-even point, and lifetime savings from refinancing your mortgage. Includes closing costs analysis.',
    url: 'https://calckit.us/calculators/mortgage-refinance',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Refinance Calculator – Should You Refinance?',
    description: 'Calculate monthly savings, break-even point, and lifetime savings from refinancing.',
  },
};

export default function MortgageRefinancePage() {
  return <MortgageRefinanceCalculator />;
}
