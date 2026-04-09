"use client";

import { useState } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { GraphApiResponse, GraphQueryParams } from "@/types";

export const useGetGraph = (options?: Omit<UseQueryOptions<GraphApiResponse[], Error>, "queryKey" | "queryFn">) => {
  const [params, setParams] = useState<GraphQueryParams>({});

  const { data, isLoading, error, isFetching, isFetched, refetch } = useQuery<GraphApiResponse[], Error>({
    queryKey: ["graph", params],
    queryFn: () => apiClient.get<GraphApiResponse[]>("/raw-data/graph", { queryParams: params }),
    ...options,
  });

  const handleSubmit = () => {
    // Mocking filter for now as per previous implementation logic
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

  return {
    params,
    data,
    isLoading: isLoading || isFetching,
    error,
    handleSubmit,
    resetSubmit,
    chartData,
    chartConfig,
    isFetched,
    refetch,
  };
};
