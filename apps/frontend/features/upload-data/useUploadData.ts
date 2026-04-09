"use client";

import { apiClient } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export const useUploadData = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("files", file);
      return apiClient.post("/raw-data/upload", formData);
    },
    onSuccess: (data: any) => {
      const message = data?.message;

      queryClient.invalidateQueries({ queryKey: ["graph"] });
      toast.success(message);
      router.push("/graph");
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || "Upload failed!";
      toast.error(message);
    },
  });

  const handleUpload = () => {
    const file = inputRef.current?.files?.[0];
    if (!file) {
      toast.error("Silakan pilih file terlebih dahulu");
      return;
    }
    mutation.mutate(file);
  };

  return {
    inputRef,
    handleUpload,
    isPending: mutation.isPending,
  };
};
