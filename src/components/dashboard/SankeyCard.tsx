import { Sankey, ResponsiveContainer, Tooltip } from "recharts";
import { CHART_COLORS } from "@/lib/palette";

const data = {
  nodes: [
    { name: "Visits" },
    { name: "Signup" },
    { name: "Activate" },
    { name: "Upgrade" },
    { name: "Churn" },
  ],
  links: [
    { source: 0, target: 1, value: 1200 },
    { source: 1, target: 2, value: 620 },
    { source: 2, target: 3, value: 240 },
    { source: 2, target: 4, value: 110 },
  ],
};

export function SankeyCard() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          User flow (Sankey)
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={data}
              nodePadding={16}
              nodeWidth={12}
              linkCurvature={0.5}
              node={{ stroke: CHART_COLORS[2], strokeWidth: 1, fill: CHART_COLORS[2] }}
              link={{ stroke: CHART_COLORS[0], strokeOpacity: 0.3 }}
            >
              <Tooltip />
            </Sankey>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
