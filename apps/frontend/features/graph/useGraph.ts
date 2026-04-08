"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { GraphApiResponse, GraphQueryParams } from "@/types";

export const useGraph = (params: GraphQueryParams, options?: Omit<UseQueryOptions<GraphApiResponse[], Error>, "queryKey" | "queryFn">) => {
  return useQuery<GraphApiResponse[], Error>({
    queryKey: ["graph", params],
    queryFn: () => apiClient.get<GraphApiResponse[]>("/raw-data/graph", { queryParams: params }),
    ...options,
  });
};
