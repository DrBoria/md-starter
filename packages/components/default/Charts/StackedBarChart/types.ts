export type TProps = {
  data: any[];
  referenceLine?: number;
  variant?: 'green' | 'red' | 'yellow';
  hideAxisX?: boolean;
};

export type TComponentProps = {
  variant: TProps['variant'];
  referenceLine: TProps['referenceLine'];
};
