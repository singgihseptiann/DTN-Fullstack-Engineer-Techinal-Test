import { ChartConfig } from "@/components/ui/chart";
import { LineProps } from "recharts";

export interface ModalProps {
  children?: React.ReactNode;
  titleModal?: string;
  dialogTitle?: string;
  dialogDescription?: string;
}

export interface LineChartData {
  x: string; // bisa resultTime, month, dsb
  y: number; // metric
}

export interface ReusableLineChartProps {
  title: string;
  description?: string;
  data: LineChartData[];
  lineKey?: keyof LineChartData;
  lineProps?: Partial<LineProps>;
}

export interface FetchOptions {
  method?: HttpMethod;
  body?: any; // Object atau FormData
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number | undefined>;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type GraphApiResponse = {
  resultTime: string;
  availability: number;
};

export type GraphQueryParams = {
  enodebId: string;
  cellId: string;
  startDate: string;
  endDate: string;
};
