export type TProps = {
  data: ChartData;
  referenceLine?: number;
  variant?: 'green' | 'red' | 'yellow';
  hideAxisX?: boolean;
};

export type TComponentProps = {
  variant: TProps['variant'];
  referenceLine: TProps['referenceLine'];
};

interface BarData {
  name: string;
  value: number;
  category?: string;
}

export type ChartData = BarData[];
