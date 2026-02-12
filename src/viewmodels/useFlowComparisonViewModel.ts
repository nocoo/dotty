// ViewModel for the Flow Comparison page.
// Composes model logic with data source — View consumes this hook only.

import { monthlyFlow } from "@/data/mock";
import { computeFlowSummary, deriveNetFlow } from "@/models/flow-comparison";
import type { FlowSummary, NetFlowEntry } from "@/models/flow-comparison";

export function useFlowComparisonViewModel() {
  const summary: FlowSummary = computeFlowSummary(monthlyFlow);
  const netFlowData: NetFlowEntry[] = deriveNetFlow(monthlyFlow);

  return { summary, flowData: monthlyFlow, netFlowData };
}
