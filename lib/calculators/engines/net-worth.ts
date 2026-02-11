import { round } from './shared/math';

export interface NetWorthItem {
  name: string;
  value: number;
}

export interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export function calculateNetWorth(
  assets: NetWorthItem[],
  liabilities: NetWorthItem[]
): NetWorthResult {
  const totalAssets = assets.reduce((sum, a) => sum + a.value, 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.value, 0);
  return {
    totalAssets: round(totalAssets, 2),
    totalLiabilities: round(totalLiabilities, 2),
    netWorth: round(totalAssets - totalLiabilities, 2),
  };
}
