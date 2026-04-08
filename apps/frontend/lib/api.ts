import { FetchOptions } from "@/types";
import { buildQueryString } from "./query-params";

const BASE_URL = "http://localhost:3001/api";

export async function apiRequest<T = any>(endpoint: string, { method = "GET", body, headers = {}, queryParams }: FetchOptions = {}): Promise<T> {
  const queryString = buildQueryString(queryParams);

  const url = BASE_URL + endpoint + queryString;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  };

  const res = await fetch(url, { ...fetchOptions, cache: "no-store" });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.error || "API request failed");
  }

  return json as T;
}

export const apiClient = {
  get: <T = any>(endpoint: string, options?: Omit<FetchOptions, "method" | "body">) => apiRequest<T>(endpoint, { ...options, method: "GET" }),
  post: <T = any>(endpoint: string, body?: any, options?: Omit<FetchOptions, "method">) => apiRequest<T>(endpoint, { ...options, method: "POST", body }),
  put: <T = any>(endpoint: string, body?: any, options?: Omit<FetchOptions, "method">) => apiRequest<T>(endpoint, { ...options, method: "PUT", body }),
  patch: <T = any>(endpoint: string, body?: any, options?: Omit<FetchOptions, "method">) => apiRequest<T>(endpoint, { ...options, method: "PATCH", body }),
  delete: <T = any>(endpoint: string, options?: Omit<FetchOptions, "method" | "body">) => apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};
