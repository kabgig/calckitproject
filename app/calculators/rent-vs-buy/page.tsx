import type { Metadata } from 'next';
import RentVsBuyCalculator from '@/components/calculators/rent-vs-buy/RentVsBuyCalculator';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator – Should You Rent or Buy? | CalcKit.us',
  description:
    'Compare the true cost of renting versus buying a home over time. See break-even year, equity buildup, and net cost analysis.',
  keywords: [
    'rent vs buy calculator',
    'should I rent or buy',
    'rent or buy comparison',
    'home buying analysis',
    'rent vs mortgage',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/rent-vs-buy',
  },
  openGraph: {
    title: 'Rent vs Buy Calculator – Should You Rent or Buy?',
    description: 'Compare the true cost of renting versus buying a home over time. See break-even year, equity buildup, and net cost analysis.',
    url: 'https://calckit.us/calculators/rent-vs-buy',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator – Should You Rent or Buy?',
    description: 'Compare the true cost of renting versus buying a home over time.',
  },
};

export default function RentVsBuyPage() {
  return <RentVsBuyCalculator />;
}
