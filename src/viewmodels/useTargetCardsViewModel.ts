// ViewModel for the Target Cards page.
// Composes model logic with data source — View consumes this hook only.

import { goals } from "@/data/mock";
import { enrichGoal } from "@/models/target-cards";
import type { GoalViewModel } from "@/models/target-cards";

export function useTargetCardsViewModel() {
  const enrichedGoals: GoalViewModel[] = goals.map((g) => enrichGoal(g));

  return { goals: enrichedGoals };
}
