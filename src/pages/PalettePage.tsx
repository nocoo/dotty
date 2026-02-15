import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import {
  Palette, LineChart as LineChartIcon,
  Target, BarChart3, Activity,
} from "lucide-react";
import {
  CHART_COLORS, chart,
  chartPrimary, chartPositive, chartNegative, chartAxis,
} from "@/lib/palette";

// ── View Model — mock data ──

const LINE_DATA = [
  { name: "Jan", a: 4000, b: 2400, c: 1200 },
  { name: "Feb", a: 3000, b: 3200, c: 1800 },
  { name: "Mar", a: 5000, b: 2800, c: 2200 },
  { name: "Apr", a: 4500, b: 3600, c: 1600 },
  { name: "May", a: 6000, b: 3000, c: 2800 },
  { name: "Jun", a: 5500, b: 4200, c: 2400 },
];

const PIE_DATA = [
  { name: "Stocks", value: 45 },
  { name: "Bonds", value: 20 },
  { name: "Real Estate", value: 15 },
  { name: "Crypto", value: 10 },
  { name: "Cash", value: 10 },
].map((d, i) => ({ ...d, fill: CHART_COLORS[i] }));

const BAR_DATA = [
  { name: "Mon", income: 1200, expense: 800 },
  { name: "Tue", income: 900, expense: 1100 },
  { name: "Wed", income: 1500, expense: 700 },
  { name: "Thu", income: 800, expense: 900 },
  { name: "Fri", income: 2000, expense: 1200 },
];

const AREA_DATA = [
  { name: "Jul", inflow: 6200, outflow: 4800 },
  { name: "Aug", inflow: 5800, outflow: 5200 },
  { name: "Sep", inflow: 7100, outflow: 4900 },
  { name: "Oct", inflow: 6500, outflow: 5500 },
  { name: "Nov", inflow: 8200, outflow: 6100 },
];

// ── View Model — color swatch data ──

interface SwatchVM {
  token: string;
  label: string;
  subtitle?: string;
}

const BASE_COLORS: SwatchVM[] = [
  { token: "--background", label: "Background", subtitle: "L0" },
  { token: "--card", label: "Card", subtitle: "L1" },
  { token: "--secondary", label: "Secondary", subtitle: "L2" },
  { token: "--foreground", label: "Foreground" },
  { token: "--primary", label: "Primary" },
  { token: "--muted", label: "Muted" },
  { token: "--muted-foreground", label: "Muted FG" },
  { token: "--accent", label: "Accent" },
  { token: "--border", label: "Border" },
  { token: "--destructive", label: "Destructive" },
  { token: "--success", label: "Success" },
  { token: "--badge-red", label: "Badge Red" },
];

const CHART_SWATCH_COLORS: SwatchVM[] = [
  { token: "--chart-1", label: "Primary", subtitle: "Primary" },
  { token: "--chart-2", label: "Sky" },
  { token: "--chart-3", label: "Teal" },
  { token: "--chart-4", label: "Jade" },
  { token: "--chart-5", label: "Green", subtitle: "Positive" },
  { token: "--chart-6", label: "Lime" },
  { token: "--chart-7", label: "Amber" },
  { token: "--chart-8", label: "Orange" },
  { token: "--chart-9", label: "Vermilion" },
  { token: "--chart-10", label: "Red", subtitle: "Destructive" },
  { token: "--chart-11", label: "Rose" },
  { token: "--chart-12", label: "Magenta" },
  { token: "--chart-13", label: "Orchid" },
  { token: "--chart-14", label: "Purple" },
  { token: "--chart-15", label: "Indigo" },
  { token: "--chart-16", label: "Cobalt" },
  { token: "--chart-17", label: "Steel" },
  { token: "--chart-18", label: "Cadet" },
  { token: "--chart-19", label: "Seafoam" },
  { token: "--chart-20", label: "Olive" },
  { token: "--chart-21", label: "Gold" },
  { token: "--chart-22", label: "Tangerine" },
  { token: "--chart-23", label: "Crimson" },
  { token: "--chart-24", label: "Gray", subtitle: "Muted" },
];

const UTILITY_COLORS: SwatchVM[] = [
  { token: "--chart-axis", label: "Axis Text" },
  { token: "--chart-muted", label: "Muted Fill" },
];

interface LegendItemVM {
  label: string;
  color: string;
}

const LINE_LEGEND: LegendItemVM[] = [
  { label: "Series A", color: chart.primary },
  { label: "Series B", color: chart.purple },
  { label: "Series C", color: chart.green },
];

const BAR_LEGEND: LegendItemVM[] = [
  { label: "Income", color: chartPrimary },
  { label: "Expense", color: chart.gray },
];

const AREA_LEGEND: LegendItemVM[] = [
  { label: "Inflow", color: chartPositive },
  { label: "Outflow", color: chartNegative },
];

// ── View components ──

function Swatch({ token, label, subtitle }: SwatchVM) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-14 w-14 rounded-[var(--radius-widget)] border border-border"
        style={{ background: `hsl(var(${token}))` }}
      />
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">{label}</p>
        {subtitle && (
          <p className="text-[10px] text-muted-foreground">{subtitle}</p>
        )}
        <p className="text-[10px] text-muted-foreground font-mono">{token}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        )}
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

function Legend({ items }: { items: LegendItemVM[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-4">
      {items.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: s.color }}
          />
          <span className="text-xs text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Page ──

export default function PalettePage() {
  return (
    <>
      {/* Base Colors */}
      <Section title="Base Colors" icon={Palette}>
        <div className="flex flex-wrap gap-5">
          {BASE_COLORS.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </div>
      </Section>

      {/* Visualization Palette */}
      <div className="mt-4">
        <Section title="Visualization Palette" icon={Palette}>
          <div className="grid grid-cols-6 gap-4 sm:grid-cols-8 lg:grid-cols-12">
            {CHART_SWATCH_COLORS.map((c) => (
              <Swatch key={c.token} {...c} />
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">
              Utility Tokens
            </p>
            <div className="flex flex-wrap gap-5">
              {UTILITY_COLORS.map((c) => (
                <Swatch key={c.token} {...c} />
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Chart Examples */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        {/* Line Chart */}
        <Section title="Line Chart" icon={LineChartIcon}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <div
              className="h-[200px]"
              role="img"
              aria-label="Example multi-series line chart"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={LINE_DATA}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: chartAxis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: chartAxis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={35}
                  />
                  <Line
                    type="monotone"
                    dataKey="a"
                    stroke={chart.primary}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="b"
                    stroke={chart.purple}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="c"
                    stroke={chart.green}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Legend items={LINE_LEGEND} />
          </div>
        </Section>

        {/* Donut Chart */}
        <Section title="Donut Chart" icon={Target}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <div className="flex flex-col items-center">
              <div
                className="h-[180px] w-[180px]"
                role="img"
                aria-label="Example donut chart showing asset allocation"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={PIE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      dataKey="value"
                      strokeWidth={0}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid w-full grid-cols-3 gap-x-4 gap-y-3">
                {PIE_DATA.map((item, i) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <span className="font-mono-num text-sm text-foreground">
                      {item.value}%
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ background: CHART_COLORS[i] }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Grouped Bar Chart */}
        <Section title="Grouped Bar Chart" icon={BarChart3}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <div
              className="h-[200px]"
              role="img"
              aria-label="Example grouped bar chart showing income vs expense"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BAR_DATA} barGap={4}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: chartAxis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: chartAxis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={30}
                  />
                  <Bar
                    dataKey="income"
                    fill={chartPrimary}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="expense"
                    fill={chart.gray}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <Legend items={BAR_LEGEND} />
          </div>
        </Section>

        {/* Area Chart */}
        <Section title="Area Chart (Positive / Negative)" icon={Activity}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
            <div
              className="h-[200px]"
              role="img"
              aria-label="Example area chart showing positive and negative cash flow"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={AREA_DATA}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: chartAxis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: chartAxis, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={35}
                  />
                  <defs>
                    <linearGradient id="palInG" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={chartPositive}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={chartPositive}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="palOutG" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={chartNegative}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="100%"
                        stopColor={chartNegative}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="inflow"
                    stroke={chartPositive}
                    strokeWidth={2}
                    fill="url(#palInG)"
                  />
                  <Area
                    type="monotone"
                    dataKey="outflow"
                    stroke={chartNegative}
                    strokeWidth={2}
                    fill="url(#palOutG)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <Legend items={AREA_LEGEND} />
          </div>
        </Section>
      </div>
    </>
  );
}
