interface ChartDataPoint {
  date: string;
  value: number;
  xAxis?: string;
  yAxis?: number;
}

export type TProps = {
  data: ChartDataPoint[];
  referenceLine?: number;
  variant?: 'green' | 'red' | 'yellow';
  hideAxisX?: boolean;
  title: string;
};

export type TComponentProps = {
  variant: TProps['variant'];
  referenceLine: TProps['referenceLine'];
};
