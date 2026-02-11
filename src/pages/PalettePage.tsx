import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import { CHART_COLORS, chart, chartPrimary, chartPositive, chartNegative, chartAxis } from "@/lib/palette";

// ── Mock data for example charts ──

const lineData = [
  { name: "Jan", a: 4000, b: 2400, c: 1200 },
  { name: "Feb", a: 3000, b: 3200, c: 1800 },
  { name: "Mar", a: 5000, b: 2800, c: 2200 },
  { name: "Apr", a: 4500, b: 3600, c: 1600 },
  { name: "May", a: 6000, b: 3000, c: 2800 },
  { name: "Jun", a: 5500, b: 4200, c: 2400 },
];

const pieData = [
  { name: "Stocks", value: 45 },
  { name: "Bonds", value: 20 },
  { name: "Real Estate", value: 15 },
  { name: "Crypto", value: 10 },
  { name: "Cash", value: 10 },
];

const barData = [
  { name: "Mon", income: 1200, expense: 800 },
  { name: "Tue", income: 900, expense: 1100 },
  { name: "Wed", income: 1500, expense: 700 },
  { name: "Thu", income: 800, expense: 900 },
  { name: "Fri", income: 2000, expense: 1200 },
];

const areaData = [
  { name: "Jul", inflow: 6200, outflow: 4800 },
  { name: "Aug", inflow: 5800, outflow: 5200 },
  { name: "Sep", inflow: 7100, outflow: 4900 },
  { name: "Oct", inflow: 6500, outflow: 5500 },
  { name: "Nov", inflow: 8200, outflow: 6100 },
];

// ── Color swatch data ──

const baseColors = [
  { token: "--background", label: "Background", tier: "L0" },
  { token: "--card", label: "Card", tier: "L1" },
  { token: "--secondary", label: "Secondary", tier: "L2" },
  { token: "--foreground", label: "Foreground", tier: "" },
  { token: "--primary", label: "Primary", tier: "" },
  { token: "--muted", label: "Muted", tier: "" },
  { token: "--muted-foreground", label: "Muted FG", tier: "" },
  { token: "--accent", label: "Accent", tier: "" },
  { token: "--border", label: "Border", tier: "" },
  { token: "--destructive", label: "Destructive", tier: "" },
  { token: "--success", label: "Success", tier: "" },
  { token: "--badge-red", label: "Badge Red", tier: "" },
];

const chartColors = [
  { token: "--chart-1", label: "Blue", semantic: "Primary" },
  { token: "--chart-2", label: "Purple", semantic: "" },
  { token: "--chart-3", label: "Green", semantic: "Positive" },
  { token: "--chart-4", label: "Pink", semantic: "" },
  { token: "--chart-5", label: "Orange", semantic: "" },
  { token: "--chart-6", label: "Teal", semantic: "" },
  { token: "--chart-7", label: "Amber", semantic: "" },
  { token: "--chart-8", label: "Gray", semantic: "Muted" },
];

const utilityColors = [
  { token: "--chart-axis", label: "Axis Text" },
  { token: "--chart-muted", label: "Muted Fill" },
];

// ── Components ──

function Swatch({ token, label, subtitle }: { token: string; label: string; subtitle?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-14 w-14 rounded-[10px] border border-border shadow-sm"
        style={{ background: `hsl(var(${token}))` }}
      />
      <div className="text-center">
        <p className="text-xs font-medium text-foreground">{label}</p>
        {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
        <p className="text-[10px] text-muted-foreground font-mono">{token}</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] bg-secondary p-4 md:p-5">
      <p className="text-sm text-muted-foreground mb-4">{title}</p>
      {children}
    </div>
  );
}

export default function PalettePage() {
  return (
    <>
      {/* Base Colors */}
      <Section title="Base Colors">
        <div className="flex flex-wrap gap-5">
          {baseColors.map((c) => (
            <Swatch key={c.token} token={c.token} label={c.label} subtitle={c.tier || undefined} />
          ))}
        </div>
      </Section>

      {/* Chart Palette */}
      <div className="mt-4">
        <Section title="Visualization Palette">
          <div className="flex flex-wrap gap-5">
            {chartColors.map((c) => (
              <Swatch key={c.token} token={c.token} label={c.label} subtitle={c.semantic || undefined} />
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Utility Tokens</p>
            <div className="flex flex-wrap gap-5">
              {utilityColors.map((c) => (
                <Swatch key={c.token} token={c.token} label={c.label} />
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Chart Examples */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-2">
        {/* Line Chart */}
        <Section title="Line Chart">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <XAxis dataKey="name" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                <Line type="monotone" dataKey="a" stroke={chart.blue} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="b" stroke={chart.purple} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="c" stroke={chart.green} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            {[{ label: "Series A", color: chart.blue }, { label: "Series B", color: chart.purple }, { label: "Series C", color: chart.green }].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Donut Chart */}
        <Section title="Donut Chart">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="h-[180px] w-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                    {pieData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-col gap-2 sm:gap-2.5 justify-center">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: CHART_COLORS[i] }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Bar Chart */}
        <Section title="Grouped Bar Chart">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barGap={4}>
                <XAxis dataKey="name" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Bar dataKey="income" fill={chartPrimary} radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill={chart.gray} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            {[{ label: "Income", color: chartPrimary }, { label: "Expense", color: chart.gray }].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Area Chart */}
        <Section title="Area Chart (Positive / Negative)">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <XAxis dataKey="name" tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: chartAxis, fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                <defs>
                  <linearGradient id="palInG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartPositive} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={chartPositive} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="palOutG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartNegative} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={chartNegative} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="inflow" stroke={chartPositive} strokeWidth={2} fill="url(#palInG)" />
                <Area type="monotone" dataKey="outflow" stroke={chartNegative} strokeWidth={2} fill="url(#palOutG)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-4">
            {[{ label: "Inflow", color: chartPositive }, { label: "Outflow", color: chartNegative }].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
