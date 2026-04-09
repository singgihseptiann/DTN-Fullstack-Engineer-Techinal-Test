"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUploadData } from "./useUploadData";
import { Loader2, Upload } from "lucide-react";

export default function UploadData() {
  const { inputRef, handleUpload, isPending } = useUploadData();

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Upload className="w-5 h-5 text-blue-600" />
          </div>
          <CardTitle>Upload Your Data</CardTitle>
        </div>
        <CardDescription>Unggah file CSV Anda di sini untuk memproses data eNodeB dan menampilkan grafik ketersediaan.</CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 border-2 border-dashed rounded-xl border-blue-100 bg-blue-50/30">
            <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
            <p className="text-blue-600 font-medium">Sedang mengunggah...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="grid w-full items-center gap-1.5">
              <Input
                ref={inputRef}
                id="file-upload"
                type="file"
                accept=".csv, .xlsx"
                className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
              />
              <p className="text-xs text-muted-foreground mt-1">Hanya mendukung format .csv dan .xlsx</p>
            </div>
            <Button
              onClick={handleUpload}
              className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-lg font-medium shadow-lg hover:shadow-blue-200 transition-all cursor-pointer"
              disabled={isPending}
            >
              Mulai Unggah
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
