"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { AreaResult } from "@/lib/scoring";

interface RadarChartViewProps {
  areaResults: AreaResult[];
  /** Fixed size for off-screen PDF capture; omit to use responsive container */
  size?: number;
  accentColor?: string;
  tickColor?: string;
  gridColor?: string;
}

export function RadarChartView({
  areaResults,
  size,
  accentColor = "#6366F1",
  tickColor = "hsl(var(--muted-foreground))",
  gridColor = "hsl(var(--border))",
}: RadarChartViewProps) {
  const data = areaResults.map((a) => ({
    area: a.short,
    score: a.score,
    fullMark: 25,
  }));

  const chart = (
    <RadarChart
      data={data}
      width={size}
      height={size}
      outerRadius="72%"
      margin={{ top: 12, right: 16, bottom: 12, left: 16 }}
    >
      <PolarGrid stroke={gridColor} />
      <PolarAngleAxis
        dataKey="area"
        tick={{ fill: tickColor, fontSize: 12 }}
      />
      <PolarRadiusAxis
        angle={90}
        domain={[0, 25]}
        tick={{ fill: tickColor, fontSize: 10 }}
        tickCount={6}
      />
      <Radar
        name="점수"
        dataKey="score"
        stroke={accentColor}
        fill={accentColor}
        fillOpacity={0.45}
        strokeWidth={2}
        isAnimationActive={false}
      />
    </RadarChart>
  );

  if (size) {
    return <div style={{ width: size, height: size }}>{chart}</div>;
  }

  return (
    <div className="h-[320px] w-full sm:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        {chart}
      </ResponsiveContainer>
    </div>
  );
}
