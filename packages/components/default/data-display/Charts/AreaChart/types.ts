export type TProps = {
  data: { xAxis: string; yAxis: number }[];
  referenceLine?: number;
  variant?: 'green' | 'red' | 'yellow';
  isMoney?: boolean;
  hideAxisX?: boolean;
  yAxisTooltipName: string;
};

export type TComponentProps = {
  variant: TProps['variant'];
  referenceLine: TProps['referenceLine'];
};
