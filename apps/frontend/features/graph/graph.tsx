"use client";
import { useState } from "react";
import { ReusableAreaChart } from "@/components/area-chart";
import { useGraph } from "@/features/graph/useGraph";
import SkeletonChart from "@/components/skeleton-chart";
import UploadData from "../upload-data/upload-data";
import { Button } from "@/components/ui/button";

export default function ShowGraph() {
  const [params, setParams] = useState<{
    enodebId?: string;
    cellId?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  const { data, isLoading, error, isFetching, isFetched, refetch } = useGraph(params);

  const handleSubmit = () => {
    setParams({
      enodebId: "1041003",
      cellId: "22",
      startDate: "2022-07-22T00:00:00Z",
      endDate: "2022-07-22T23:59:59Z",
    });
  };

  const resetSubmit = () => {
    setParams({});
  };
  const chartData =
    data?.map((item) => ({
      x: new Date(item.resultTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      y: item.availability,
    })) || [];

  const chartConfig = {
    y: { label: "Availability", color: "var(--chart-1)" },
  };

  if (isLoading || isFetching) {
    return <SkeletonChart />;
  }
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-end gap-2">
        <UploadData />
        <Button variant="default" onClick={handleSubmit}>
          Filter Graph
        </Button>
        <Button variant="destructive" onClick={resetSubmit}>
          Reset Filter
        </Button>
      </div>

      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && chartData.length === 0 && <div>No data available</div>}
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
