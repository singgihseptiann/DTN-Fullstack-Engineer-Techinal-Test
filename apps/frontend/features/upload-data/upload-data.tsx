"use client";

import Modal from "@/components/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useUploadData } from "./useUploadData";
import { Loader2 } from "lucide-react";

export default function UploadData() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadData();

  const handleUpload = () => {
    const file = inputRef.current?.files?.[0];
    if (!file) return;
    mutate(file);
  };

  return (
    <Modal titleModal="Upload Data" dialogTitle="Upload Your Data" dialogDescription="Please upload your data in the correct format.">
      {isPending ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
          <p className="text-blue-600 font-medium">Uploading...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Input ref={inputRef} type="file" accept=".csv, .xlsx" className="cursor-pointer" />
          <Button onClick={handleUpload} className="w-full">
            Upload
          </Button>
        </div>
      )}
    </Modal>
  );
}
