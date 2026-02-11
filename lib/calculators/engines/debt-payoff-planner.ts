import { round } from './shared/math';

export interface DebtEntry {
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

export interface DebtPayoffStep {
  month: number;
  debtName: string;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface DebtPayoffPlanResult {
  strategy: 'avalanche' | 'snowball';
  totalMonths: number;
  totalInterest: number;
  totalPaid: number;
  payoffOrder: string[];
  schedule: DebtPayoffStep[];
}

export function calculateDebtPayoffPlan(
  debts: DebtEntry[],
  extraMonthly: number,
  strategy: 'avalanche' | 'snowball'
): DebtPayoffPlanResult {
  // Clone debts
  const active = debts.map((d) => ({ ...d, balance: d.balance }));
  const schedule: DebtPayoffStep[] = [];
  const payoffOrder: string[] = [];
  let totalInterest = 0;
  let totalPaid = 0;
  let month = 0;

  while (active.some((d) => d.balance > 0.01) && month < 600) {
    month++;
    // Sort for target: avalanche = highest rate first, snowball = lowest balance first
    const sorted = [...active]
      .filter((d) => d.balance > 0.01)
      .sort((a, b) =>
        strategy === 'avalanche' ? b.rate - a.rate : a.balance - b.balance
      );

    let extraLeft = extraMonthly;

    // First pass: apply interest and min payments
    for (const debt of active) {
      if (debt.balance <= 0.01) continue;
      const interest = debt.balance * (debt.rate / 100 / 12);
      debt.balance += interest;
      totalInterest += interest;
      const payment = Math.min(debt.minPayment, debt.balance);
      debt.balance -= payment;
      totalPaid += payment;
      schedule.push({
        month,
        debtName: debt.name,
        payment: round(payment, 2),
        interest: round(interest, 2),
        principal: round(payment - interest, 2),
        balance: round(Math.max(debt.balance, 0), 2),
      });
      if (debt.balance <= 0.01 && !payoffOrder.includes(debt.name)) {
        payoffOrder.push(debt.name);
      }
    }

    // Second pass: apply extra to target debt
    for (const targetDebt of sorted) {
      if (extraLeft <= 0) break;
      if (targetDebt.balance <= 0.01) continue;
      const extraPayment = Math.min(extraLeft, targetDebt.balance);
      targetDebt.balance -= extraPayment;
      extraLeft -= extraPayment;
      totalPaid += extraPayment;
      // Update last schedule entry for this debt
      const lastEntry = [...schedule].reverse().find(
        (s) => s.month === month && s.debtName === targetDebt.name
      );
      if (lastEntry) {
        lastEntry.payment = round(lastEntry.payment + extraPayment, 2);
        lastEntry.principal = round(lastEntry.principal + extraPayment, 2);
        lastEntry.balance = round(Math.max(targetDebt.balance, 0), 2);
      }
      if (targetDebt.balance <= 0.01 && !payoffOrder.includes(targetDebt.name)) {
        payoffOrder.push(targetDebt.name);
      }
    }
  }

  return {
    strategy,
    totalMonths: month,
    totalInterest: round(totalInterest, 2),
    totalPaid: round(totalPaid, 2),
    payoffOrder,
    schedule,
  };
}
