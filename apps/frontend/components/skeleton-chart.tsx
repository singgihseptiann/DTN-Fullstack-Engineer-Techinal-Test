import { SkeletonChartProps } from "@/types";
import { Skeleton } from "./ui/skeleton";

export default function SkeletonChart({ titleHeight = 24, descriptionHeight = 16, chartHeight = 256 }: SkeletonChartProps) {
  return (
    <div className="space-y-4 p-4 animate-pulse">
      {" "}
      {/* Tambah animate-pulse agar terlihat gerak */}
      <Skeleton style={{ height: `${titleHeight}px` }} className="w-1/4 rounded bg-slate-200 dark:bg-slate-700" />
      <Skeleton style={{ height: `${descriptionHeight}px` }} className="w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
      <Skeleton style={{ height: `${chartHeight}px` }} className="w-full rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}
