import { ITabs, TConditionalField } from "../DynamicForms";

export interface IModalButton {
  name: string;
  view: (
    // Onclick will have action that should be used by default - create item, save edited item, delete item and so on
    onClick?: () => unknown,
    isDisabled?: boolean,
  ) => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
}


export interface IModalButton {
  name: string;
  view: (
    // Onclick will have action that should be used by default - create item, save edited item, delete item and so on
    onClick?: () => unknown,
    isDisabled?: boolean,
  ) => React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>;
}

export type TSideBarModalData = {
  type: "edit" | "dataSource" | "create" | "custom";
  headerText: string;
  listName?: string;
  id?: string;
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  tabs?: ITabs;
  // TODO: make default value visible for users
  defaultValues?: Record<string, unknown>;
  conditionalFields?: TConditionalField[];
  buttons?: IModalButton[];
  children?: React.ReactElement;
} | null;


export type TModalData = {
  content: React.ReactNode;
} | null;


export type TFullScreenData = {
  content: React.ReactNode;
} | null;
