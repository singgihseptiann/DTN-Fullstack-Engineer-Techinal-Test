import ShowGraph from "@/features/graph/graph";
import UploadData from "@/features/upload-data/upload-data";

export default function GraphPage() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center justify-end">
        <UploadData />
      </div>
      <ShowGraph />
    </div>
  );
}
