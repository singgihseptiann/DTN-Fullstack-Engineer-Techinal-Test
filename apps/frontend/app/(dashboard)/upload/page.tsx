import UploadData from "@/features/upload-data/upload-data";

export default function UploadPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="max-w-xl mx-auto space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Upload Data</h1>
        <p className="text-muted-foreground">Silakan unggah file CSV data telekomunikasi Anda untuk memproses statistik ketersediaan.</p>
      </div>
      <UploadData />
    </div>
  );
}
