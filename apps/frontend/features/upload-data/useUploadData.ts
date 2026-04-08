"use client";

import { apiClient } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("files", file);
      return apiClient.post("/raw-data/upload", formData);
    },
    onSuccess: (data: any) => {
      const message = data?.message;

      queryClient.invalidateQueries({ queryKey: ["graph"] });
      toast.success(message);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || error?.message || "Upload failed!";
      toast.error(message);
    },
  });
};
