import type { Metadata } from 'next';
import SalaryRaiseCalculator from '@/components/calculators/salary-raise/SalaryRaiseCalculator';

export const metadata: Metadata = {
  title: 'Salary Raise Calculator – See Your New Pay | CalcKit.us',
  description:
    'Calculate the impact of a salary raise. See your new annual salary, monthly pay, and the dollar amount of your increase.',
  keywords: [
    'salary raise calculator',
    'pay raise calculator',
    'salary increase calculator',
    'raise percentage calculator',
    'new salary calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/salary-raise',
  },
  openGraph: {
    title: 'Salary Raise Calculator – See Your New Pay',
    description: 'Calculate the impact of a salary raise. See your new annual salary, monthly pay, and the dollar amount of your increase.',
    url: 'https://calckit.us/calculators/salary-raise',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Raise Calculator – See Your New Pay',
    description: 'Calculate the impact of a salary raise on your annual and monthly pay.',
  },
};

export default function SalaryRaisePage() {
  return <SalaryRaiseCalculator />;
}
