// ── Calculator Registry ──
// Single source of truth for all calculators on CalcKit.us.
// Drives: navigation, sitemap, index page, SEO metadata, related links.

export type CalculatorCategory =
  | 'budgeting'
  | 'loans'
  | 'investing'
  | 'income'
  | 'debt';

export interface CalculatorConfig {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: CalculatorCategory;
  icon: string;
  keywords: string[];
  features: {
    hasSchedule: boolean;
    hasChart: boolean;
    hasComparison: boolean;
    hasPdfExport: boolean;
  };
  relatedCalculators: string[];
  relatedArticleSlugs: string[];
}

// ── Category metadata ──

export const categoryMeta: Record<
  CalculatorCategory,
  { label: string; color: string; bg: string }
> = {
  budgeting: { label: 'Money & Budgeting', color: 'teal.700', bg: 'teal.50' },
  loans: { label: 'Loans & Mortgages', color: 'purple.700', bg: 'purple.50' },
  investing: { label: 'Saving & Investing', color: 'blue.700', bg: 'blue.50' },
  income: { label: 'Income & Work', color: 'pink.700', bg: 'pink.50' },
  debt: { label: 'Insurance & Debt', color: 'orange.700', bg: 'orange.50' },
};

// ── Registry ──

export const calculators: CalculatorConfig[] = [
  // ── Loans & Mortgages ──
  {
    slug: 'mortgage',
    name: 'Mortgage Calculator',
    shortDescription:
      'Calculate your monthly mortgage payment and generate a full amortization schedule.',
    longDescription:
      'Calculate your monthly mortgage payment and generate a complete amortization schedule. See how principal and interest change over time and export your results to PDF.',
    category: 'loans',
    icon: '🏠',
    keywords: [
      'mortgage calculator',
      'home loan calculator',
      'mortgage payment calculator',
      'amortization calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: true,
    },
    relatedCalculators: ['home-affordability', 'mortgage-refinance', 'loan-payment'],
    relatedArticleSlugs: [
      'mortgage-calculator-guide',
      'amortization-schedule-explained',
      'first-time-buyer-mortgage-tips',
    ],
  },
  {
    slug: 'loan-payment',
    name: 'Loan Payment Calculator',
    shortDescription:
      'Calculate monthly payments, total interest, and amortization for any loan.',
    longDescription:
      'Calculate monthly payments for any type of loan—personal, auto, student, or other. See total interest paid and generate a full payment schedule.',
    category: 'loans',
    icon: '💳',
    keywords: [
      'loan payment calculator',
      'loan monthly payment calculator',
      'personal loan calculator',
      'auto loan calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: true,
    },
    relatedCalculators: ['mortgage', 'loan-comparison', 'loan-payoff'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'loan-comparison',
    name: 'Loan Comparison Calculator',
    shortDescription:
      'Compare two loans side by side to find the cheaper option.',
    longDescription:
      'Compare two loan offers by entering amount, rate, term, and fees for each. See monthly payments, total costs, and which loan saves you more money.',
    category: 'loans',
    icon: '⚖️',
    keywords: [
      'loan comparison calculator',
      'compare two loans',
      'which loan is cheaper',
      'loan APR comparison',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: true,
      hasPdfExport: false,
    },
    relatedCalculators: ['loan-payment', 'mortgage', 'mortgage-refinance'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'loan-payoff',
    name: 'Loan Payoff Calculator',
    shortDescription:
      'See how extra payments shorten your loan and save on interest.',
    longDescription:
      'Enter your current loan details and see how making extra monthly or one-time payments can shorten your payoff timeline and reduce total interest.',
    category: 'loans',
    icon: '🎯',
    keywords: [
      'loan payoff calculator',
      'extra payment calculator',
      'pay off loan faster',
      'loan early payoff savings',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: true,
      hasPdfExport: true,
    },
    relatedCalculators: ['loan-payment', 'credit-card-payoff', 'debt-payoff-planner'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'mortgage-refinance',
    name: 'Mortgage Refinance Calculator',
    shortDescription:
      'Find your break-even point and total savings from refinancing.',
    longDescription:
      'Compare your current mortgage to a refinanced loan. See your new monthly payment, break-even month, and how much you save over the life of the loan.',
    category: 'loans',
    icon: '🔄',
    keywords: [
      'mortgage refinance calculator',
      'refinance break even calculator',
      'should I refinance calculator',
      'refinance savings estimator',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: true,
      hasPdfExport: false,
    },
    relatedCalculators: ['mortgage', 'home-affordability', 'loan-comparison'],
    relatedArticleSlugs: ['mortgage-calculator-guide'],
  },
  {
    slug: 'home-affordability',
    name: 'Home Affordability Calculator',
    shortDescription:
      'Find out how much house you can afford based on your income and debts.',
    longDescription:
      'Enter your income, debts, down payment, and interest rate to discover the maximum home price you can afford. See a breakdown of monthly costs including taxes and insurance.',
    category: 'loans',
    icon: '🏡',
    keywords: [
      'home affordability calculator',
      'how much house can I afford',
      'borrowing power calculator',
      'mortgage qualification calculator',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['mortgage', 'rent-vs-buy', 'mortgage-refinance'],
    relatedArticleSlugs: ['first-time-buyer-mortgage-tips'],
  },
  {
    slug: 'rent-vs-buy',
    name: 'Rent vs Buy Calculator',
    shortDescription:
      'Compare the total cost of renting versus buying a home over time.',
    longDescription:
      'Enter your rent, home price, mortgage terms, and costs to see a year-by-year comparison. Find the break-even point where buying becomes cheaper than renting.',
    category: 'loans',
    icon: '🏘️',
    keywords: [
      'rent vs buy calculator',
      'renting vs buying comparison',
      'should I buy or rent',
      'cost of renting vs buying',
    ],
    features: {
      hasSchedule: true,
      hasChart: true,
      hasComparison: true,
      hasPdfExport: false,
    },
    relatedCalculators: ['home-affordability', 'mortgage', 'mortgage-refinance'],
    relatedArticleSlugs: ['mortgage-vs-rent-calculator'],
  },
  {
    slug: 'credit-card-payoff',
    name: 'Credit Card Payoff Calculator',
    shortDescription:
      "See how long it takes to pay off your credit card and how much interest you'll pay.",
    longDescription:
      'Enter your credit card balance, APR, and monthly payment to see your payoff timeline, total interest cost, and a detailed month-by-month payment schedule.',
    category: 'loans',
    icon: '💳',
    keywords: [
      'credit card payoff calculator',
      'credit card debt payoff time',
      'how long to pay off credit card',
      'minimum payment calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: true,
    },
    relatedCalculators: ['debt-payoff-planner', 'loan-payoff', 'debt-consolidation'],
    relatedArticleSlugs: [],
  },

  // ── Saving & Investing ──
  {
    slug: 'apy',
    name: 'APY Calculator',
    shortDescription:
      'Calculate Annual Percentage Yield and see how compounding grows your savings.',
    longDescription:
      'Calculate Annual Percentage Yield (APY) with different compounding frequencies. See how your savings grow over time and compare rates across different accounts.',
    category: 'investing',
    icon: '📈',
    keywords: [
      'APY calculator',
      'annual percentage yield calculator',
      'savings interest calculator',
      'compound interest rate calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: true,
    },
    relatedCalculators: ['compound-interest', 'savings-goal', 'roi'],
    relatedArticleSlugs: [
      'apy-calculator-explained',
      'apy-vs-apr-difference',
      'compound-interest-daily-weekly',
    ],
  },
  {
    slug: 'compound-interest',
    name: 'Compound Interest Calculator',
    shortDescription:
      'See how your money grows with compound interest and regular contributions.',
    longDescription:
      'Calculate the future value of an investment with compound interest and optional periodic contributions. View a year-by-year growth table and interactive chart.',
    category: 'investing',
    icon: '📊',
    keywords: [
      'compound interest calculator',
      'investment growth calculator',
      'compound interest with contributions',
      'compound interest daily vs monthly',
    ],
    features: {
      hasSchedule: true,
      hasChart: true,
      hasComparison: false,
      hasPdfExport: true,
    },
    relatedCalculators: ['apy', 'roi', 'millionaire-calculator'],
    relatedArticleSlugs: ['compound-interest-daily-weekly'],
  },
  {
    slug: 'roi',
    name: 'ROI Calculator',
    shortDescription:
      'Calculate your return on investment and annualized (CAGR) return.',
    longDescription:
      'Enter your initial investment and final value to see total ROI, annualized return (CAGR), and total gain or loss. Include dividends for a complete picture.',
    category: 'investing',
    icon: '💰',
    keywords: [
      'ROI calculator',
      'return on investment calculator',
      'CAGR calculator',
      'investment return calculator',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['compound-interest', 'apy', 'millionaire-calculator'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'millionaire-calculator',
    name: 'Millionaire Calculator',
    shortDescription:
      'Find out how much to save monthly to become a millionaire by your target age.',
    longDescription:
      'Enter your current age, savings, and expected return to calculate the monthly contribution needed to reach $1M (or any target) by your goal age.',
    category: 'investing',
    icon: '🎩',
    keywords: [
      'millionaire calculator',
      'millionaire by age calculator',
      'how to become a millionaire',
      'savings goal rate of return',
    ],
    features: {
      hasSchedule: true,
      hasChart: true,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['compound-interest', 'retirement-savings', 'savings-goal'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'retirement-savings',
    name: 'Retirement Savings Calculator',
    shortDescription:
      'Check if you\'re on track for retirement with your current savings rate.',
    longDescription:
      'Enter your age, savings, contributions, and goals to see if your retirement nest egg is on track. Get a projected balance and on-track score.',
    category: 'investing',
    icon: '🏖️',
    keywords: [
      'retirement calculator',
      'am I on track for retirement',
      'retirement savings calculator',
      'retirement nest egg calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: true,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['retirement-drawdown', 'millionaire-calculator', 'compound-interest'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'retirement-drawdown',
    name: 'Retirement Drawdown Calculator',
    shortDescription:
      'See how long your retirement savings will last with annual withdrawals.',
    longDescription:
      'Enter your nest egg, annual withdrawal, expected return, and inflation to see how many years your money lasts and view a year-by-year balance projection.',
    category: 'investing',
    icon: '📉',
    keywords: [
      'retirement drawdown calculator',
      'retirement income calculator',
      'how long will my retirement savings last',
      '4 percent rule calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: true,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['retirement-savings', 'compound-interest', 'millionaire-calculator'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'college-savings',
    name: 'College Savings Calculator',
    shortDescription:
      'Plan for education costs and find out how much to save each month.',
    longDescription:
      'Estimate future college costs with tuition inflation, project your savings growth, and find the monthly contribution needed to close any funding gap.',
    category: 'investing',
    icon: '🎓',
    keywords: [
      'college savings calculator',
      'education savings calculator',
      '529 plan calculator',
      'how much to save for college',
    ],
    features: {
      hasSchedule: true,
      hasChart: true,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['compound-interest', 'savings-goal', 'millionaire-calculator'],
    relatedArticleSlugs: [],
  },

  // ── Money & Budgeting ──
  {
    slug: 'budget',
    name: 'Budget Calculator',
    shortDescription:
      'Break down your income using the 50/30/20 rule for needs, wants, and savings.',
    longDescription:
      'Enter your monthly income and see a recommended budget breakdown using the 50/30/20 rule. Customize percentages and categories to match your lifestyle.',
    category: 'budgeting',
    icon: '📋',
    keywords: [
      'budget calculator',
      '50 30 20 rule calculator',
      'monthly budget planner',
      'budget breakdown calculator',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['savings-goal', 'emergency-fund', 'net-worth'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'savings-goal',
    name: 'Savings Goal Calculator',
    shortDescription:
      'Find out how long it takes to reach your savings goal with monthly contributions.',
    longDescription:
      'Enter your goal amount, current savings, monthly contribution, and expected return to calculate the time needed. View a month-by-month growth projection.',
    category: 'budgeting',
    icon: '🎯',
    keywords: [
      'savings goal calculator',
      'how long to save calculator',
      'time to savings goal',
      'savings timeline calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: true,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['compound-interest', 'emergency-fund', 'budget'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'net-worth',
    name: 'Net Worth Calculator',
    shortDescription:
      'Calculate your net worth by listing your assets and liabilities.',
    longDescription:
      'Add your assets (cash, investments, property) and liabilities (loans, credit card debt) to calculate your total net worth and see a detailed breakdown.',
    category: 'budgeting',
    icon: '🏦',
    keywords: [
      'net worth calculator',
      'calculate net worth',
      'personal net worth tracker',
      'assets minus liabilities',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['budget', 'savings-goal', 'emergency-fund'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'emergency-fund',
    name: 'Emergency Fund Calculator',
    shortDescription:
      'Find out how much you need in your emergency fund and your current gap.',
    longDescription:
      'Enter your monthly expenses and target months of coverage to calculate your ideal emergency fund. See how your current savings compare and what gap remains.',
    category: 'budgeting',
    icon: '🛡️',
    keywords: [
      'emergency fund calculator',
      'how much emergency fund',
      'emergency savings calculator',
      'rainy day fund calculator',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['budget', 'savings-goal', 'net-worth'],
    relatedArticleSlugs: [],
  },

  // ── Income & Work ──
  {
    slug: 'salary-hourly',
    name: 'Salary to Hourly Calculator',
    shortDescription:
      'Convert between salary and hourly pay with weekly, monthly, and annual breakdowns.',
    longDescription:
      'Enter a salary or hourly rate and convert between all pay frequencies. See weekly, biweekly, monthly, and annual equivalents including overtime calculations.',
    category: 'income',
    icon: '💵',
    keywords: [
      'salary to hourly calculator',
      'hourly to annual salary',
      'paycheck calculator',
      'salary breakdown calculator',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['salary-raise', 'freelance-rate', 'income-tax'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'salary-raise',
    name: 'Salary Raise Calculator',
    shortDescription:
      'See how a raise impacts your paycheck, monthly, and annual income.',
    longDescription:
      'Enter your current salary and raise percentage (or dollar amount) to see the impact on each paycheck, monthly income, and annual earnings.',
    category: 'income',
    icon: '📈',
    keywords: [
      'salary raise calculator',
      'raise impact calculator',
      'pay increase calculator',
      'how much is a 5 percent raise',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: true,
      hasPdfExport: false,
    },
    relatedCalculators: ['salary-hourly', 'income-tax', 'freelance-rate'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'income-tax',
    name: 'Income Tax Calculator',
    shortDescription:
      'Estimate your federal income tax, effective rate, and take-home pay.',
    longDescription:
      'Enter your gross income and filing status to estimate federal income tax using current brackets. See your effective tax rate, marginal rate, and take-home pay.',
    category: 'income',
    icon: '🧾',
    keywords: [
      'income tax calculator',
      'tax estimator',
      'federal tax calculator',
      'take home pay calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['salary-hourly', 'salary-raise', 'freelance-rate'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'freelance-rate',
    name: 'Freelance Rate Calculator',
    shortDescription:
      'Calculate the hourly rate you need to charge to meet your income goals.',
    longDescription:
      'Enter your target income, expenses, tax rate, and billable hours to calculate the hourly and daily rate you need to charge as a freelancer or consultant.',
    category: 'income',
    icon: '🧑‍💻',
    keywords: [
      'freelance rate calculator',
      'freelance hourly rate',
      'consulting rate calculator',
      'how much to charge freelance',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['salary-hourly', 'income-tax', 'salary-raise'],
    relatedArticleSlugs: [],
  },

  // ── Insurance & Debt ──
  {
    slug: 'life-insurance',
    name: 'Life Insurance Calculator',
    shortDescription:
      'Estimate how much life insurance coverage you need.',
    longDescription:
      'Enter your income, debts, future obligations, and existing coverage to calculate your recommended life insurance coverage and identify any gaps.',
    category: 'debt',
    icon: '🛡️',
    keywords: [
      'life insurance calculator',
      'how much life insurance do I need',
      'life insurance needs analysis',
      'insurance coverage calculator',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['net-worth', 'emergency-fund', 'budget'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'heloc-payment',
    name: 'HELOC Payment Calculator',
    shortDescription:
      'Calculate payments for your home equity line of credit.',
    longDescription:
      'Enter your HELOC details including credit limit, draw amount, rate, and terms to calculate payments during the draw period and repayment period.',
    category: 'debt',
    icon: '🏠',
    keywords: [
      'HELOC calculator',
      'home equity line of credit calculator',
      'HELOC payment calculator',
      'home equity loan calculator',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: false,
      hasPdfExport: false,
    },
    relatedCalculators: ['mortgage', 'home-affordability', 'mortgage-refinance'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'debt-consolidation',
    name: 'Debt Consolidation Calculator',
    shortDescription:
      'Compare keeping current debts versus consolidating into one loan.',
    longDescription:
      'Enter your current debts and a potential consolidation loan to see if combining your debts into one payment saves you money and simplifies your finances.',
    category: 'debt',
    icon: '🔗',
    keywords: [
      'debt consolidation calculator',
      'consolidate debt calculator',
      'should I consolidate my debt',
      'debt consolidation savings',
    ],
    features: {
      hasSchedule: false,
      hasChart: false,
      hasComparison: true,
      hasPdfExport: false,
    },
    relatedCalculators: ['debt-payoff-planner', 'credit-card-payoff', 'loan-payment'],
    relatedArticleSlugs: [],
  },
  {
    slug: 'debt-payoff-planner',
    name: 'Debt Payoff Planner',
    shortDescription:
      'Compare snowball vs avalanche strategies to pay off debt faster.',
    longDescription:
      'Enter all your debts and extra monthly budget. Compare the snowball method (lowest balance first) vs avalanche method (highest rate first) side by side.',
    category: 'debt',
    icon: '📋',
    keywords: [
      'debt payoff calculator',
      'snowball vs avalanche calculator',
      'debt free calculator',
      'fastest way to pay off debt',
    ],
    features: {
      hasSchedule: true,
      hasChart: false,
      hasComparison: true,
      hasPdfExport: true,
    },
    relatedCalculators: ['credit-card-payoff', 'debt-consolidation', 'loan-payoff'],
    relatedArticleSlugs: [],
  },
];

// ── Helpers ──

export function getCalculatorBySlug(slug: string): CalculatorConfig | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(
  category: CalculatorCategory
): CalculatorConfig[] {
  return calculators.filter((c) => c.category === category);
}

export function getAllCategories(): CalculatorCategory[] {
  return Object.keys(categoryMeta) as CalculatorCategory[];
}

export function getRelatedCalculators(slug: string): CalculatorConfig[] {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return [];
  return calc.relatedCalculators
    .map((s) => getCalculatorBySlug(s))
    .filter(Boolean) as CalculatorConfig[];
}
