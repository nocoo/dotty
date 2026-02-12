// ViewModel for the Portfolio page.
// Composes model logic with data source — View consumes this hook only.

import { portfolio, performanceData } from "@/data/mock";
import { computePortfolioTotal } from "@/models/portfolio";

export function usePortfolioViewModel() {
  const totalValue = computePortfolioTotal(portfolio);

  return { totalValue, holdings: portfolio, performanceData };
}
