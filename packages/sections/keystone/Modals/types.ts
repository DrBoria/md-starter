import { TSideBarModalData, IModalButton } from "@md/components";
import { ITabs, TConditionalField } from "../DynamicForms";

export type TSideBarModalDataKeystone = {
  type: "edit" | "dataSource" | "create" | "custom";
  listName?: string;
  id?: string;
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  tabs?: ITabs;
  // TODO: make default value visible for users
  defaultValues?: Record<string, unknown>;
  conditionalFields?: TConditionalField[];
  buttons?: IModalButton[];
} & TSideBarModalData | null;
