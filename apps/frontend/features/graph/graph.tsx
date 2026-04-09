"use client";

import { ReusableAreaChart } from "@/components/area-chart";
import { useGetGraph } from "./useGetGraph";
import SkeletonChart from "@/components/skeleton-chart";
import { Button } from "@/components/ui/button";

export default function ShowGraph() {
  const { chartData, chartConfig, isLoading, error, params, handleSubmit, resetSubmit } = useGetGraph();

  if (isLoading) {
    return <SkeletonChart />;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Button variant="default" onClick={handleSubmit}>
          Filter Graph
        </Button>
        <Button variant="destructive" onClick={resetSubmit}>
          Reset Filter
        </Button>
      </div>

      {error && <div className="text-destructive font-medium">Error: {error.message}</div>}
      {!isLoading && !error && chartData.length === 0 && (
        <div className="flex items-center justify-center p-20 border border-dashed rounded-xl text-muted-foreground">No data available</div>
      )}

      {chartData.length > 0 && (
        <ReusableAreaChart
          title={`Cell ${params.cellId || "All"} Availability`}
          description={params.cellId ? "Filtered availability per time" : "Availability per time for all cells"}
          data={chartData}
          lineKey="y"
          chartConfig={chartConfig}
        />
      )}
    </div>
  );
}
