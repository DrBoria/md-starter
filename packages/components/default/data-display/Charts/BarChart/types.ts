export type TProps = {
  data: TOrder[];
  width?: number;
  height?: number;
};

type TField = {
  param: string;
  fill: string;
};

type TOrder = {
  fields: TField[];
  name: string;
  [name: string]: TField[] | string | number;
};
