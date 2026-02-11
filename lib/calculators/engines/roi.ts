import { round } from './shared/math';

export interface ROIResult {
  totalReturn: number;
  roi: number;
  annualizedROI: number;
  netProfit: number;
}

export function calculateROI(
  initialInvestment: number,
  finalValue: number,
  years: number
): ROIResult {
  const netProfit = finalValue - initialInvestment;
  const roi = (netProfit / initialInvestment) * 100;
  const annualizedROI =
    years > 0 ? (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100 : roi;

  return {
    totalReturn: round(finalValue, 2),
    roi: round(roi, 2),
    annualizedROI: round(annualizedROI, 2),
    netProfit: round(netProfit, 2),
  };
}
