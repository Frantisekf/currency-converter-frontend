export interface ConversionApiResponse {
  data: object;
}

export interface MoneyType {
  amount: number | null;
  from: string;
  to: string;
}

export type CurrencySymbolsType = Record<string, string>;

export interface CurrencyOption {
  label: string;
  value: string;
}

export interface ConversionEntry {
  id: string;
  originalAmount: number | null;
  from: string;
  to: string;
  destAmount: number | null;
  createdAt: string;
}

export interface CurrencyTableProps {
  conversionEntries: ConversionEntry[];
  isLoading: boolean;
}
