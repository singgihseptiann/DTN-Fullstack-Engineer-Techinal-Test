"use client";

import { CartesianGrid, Line, LineChart, XAxis, LineProps } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { ReusableLineChartProps } from "@/types";

export function ReusableLineChart({ title, description, data, lineKey = "y", lineProps }: ReusableLineChartProps) {
  const chartConfig = {
    y: { label: "Availability", color: "var(--chart-1)" },
  };
  return (
    <Card className="shadow-sm ">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="x" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => (typeof value === "string" && value.length > 10 ? value.slice(0, 10) : value)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey={lineKey} type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} {...lineProps} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing total metrics</div>
      </CardFooter>
    </Card>
  );
}
