export type TProps = {
  data: any[];
  referenceLine?: number;
  variant?: 'green' | 'red' | 'yellow';
  hideAxisX?: boolean;
  title: string;
};

export type TComponentProps = {
  variant: TProps['variant'];
  referenceLine: TProps['referenceLine'];
};
