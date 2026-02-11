import type { Metadata } from 'next';
import SalaryHourlyCalculator from '@/components/calculators/salary-hourly/SalaryHourlyCalculator';

export const metadata: Metadata = {
  title: 'Salary to Hourly Calculator – Convert Pay Rates | CalcKit.us',
  description:
    'Convert between annual salary and hourly rate. See monthly, bi-weekly, weekly, and daily pay breakdowns instantly.',
  keywords: [
    'salary to hourly calculator',
    'hourly to salary calculator',
    'pay rate converter',
    'salary converter',
    'wage calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/salary-hourly',
  },
  openGraph: {
    title: 'Salary to Hourly Calculator – Convert Pay Rates',
    description: 'Convert between annual salary and hourly rate. See monthly, bi-weekly, weekly, and daily pay breakdowns instantly.',
    url: 'https://calckit.us/calculators/salary-hourly',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary to Hourly Calculator – Convert Pay Rates',
    description: 'Convert between annual salary and hourly rate with all pay period breakdowns.',
  },
};

export default function SalaryHourlyPage() {
  return <SalaryHourlyCalculator />;
}
