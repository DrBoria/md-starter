import type { TSideBarModalData, IModalButton } from "@md/components";
import type { ITabs, TConditionalField } from "@md/sections";

export type TSideBarModalDataKeystone = {
  type: "edit" | "dataSource" | "create" | "custom";
  listName?: string;
  id?: string;
  fieldsToRender?: string[];
  notToRenderFields?: string[];
  tabs?: ITabs;
  defaultValues?: Record<string, unknown>;
  conditionalFields?: TConditionalField[];
  buttons?: IModalButton[];
} & TSideBarModalData | null;
