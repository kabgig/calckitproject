import type { Metadata } from 'next';
import ROICalculator from '@/components/calculators/roi/ROICalculator';

export const metadata: Metadata = {
  title: 'ROI Calculator – Return on Investment | CalcKit.us',
  description:
    'Calculate your return on investment including total ROI, annualized ROI, and net profit from any investment.',
  keywords: [
    'ROI calculator',
    'return on investment calculator',
    'investment return calculator',
    'annualized ROI',
    'investment profit calculator',
  ],
  alternates: {
    canonical: 'https://calckit.us/calculators/roi',
  },
  openGraph: {
    title: 'ROI Calculator – Return on Investment',
    description: 'Calculate your return on investment including total ROI, annualized ROI, and net profit from any investment.',
    url: 'https://calckit.us/calculators/roi',
    type: 'website',
    siteName: 'CalcKit.us',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator – Return on Investment',
    description: 'Calculate total ROI, annualized ROI, and net profit from any investment.',
  },
};

export default function ROIPage() {
  return <ROICalculator />;
}
