"use client";
import { ReusableLineChart } from "@/components/line-chart";
import { useGraph } from "./useGraph";

export default function ShowGraph() {
  const { data, isLoading, error } = useGraph({
    enodebId: "1041003",
    cellId: "22",
    startDate: "2022-07-22T00:00:00Z",
    endDate: "2022-07-22T23:59:59Z",
  });

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  const chartData = data.map((item) => ({
    x: new Date(item.resultTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    y: item.availability,
  }));

  return <ReusableLineChart title="Cell Availability" description="Availability per time" data={chartData} lineKey="y" />;
}
