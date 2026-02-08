import type { FieldController, FieldControllerConfig } from "@keystone-6/core/types";
import type { Value, Validation } from "@/admin/components/CustomFields/utils/validate";

export type { Value, Validation };

export type Config = FieldControllerConfig<{
    displayMode: "input" | "textarea";
    isReadOnly: boolean;
    validation: Validation;
    description?: string;
}>;

export type Controller = FieldController<Value, string> & {
    displayMode: "input" | "textarea";
    isReadOnly: boolean;
    validation: Validation;
    description: string | null;
};

export const controller = (config: Config): Controller => {
    return {
        path: config.path,
        label: config.label,
        description: config.fieldMeta?.description ?? null,
        graphqlSelection: config.path,
        displayMode: config.fieldMeta?.displayMode ?? "input",
        isReadOnly: config.fieldMeta?.isReadOnly ?? false,
        validation: config.fieldMeta?.validation ?? {
            isRequired: false,
            rejectCommon: false,
            match: null,
            length: { min: 0, max: null },
        },
        defaultValue: { kind: "initial", isSet: null },
        deserialize: (data) => ({ kind: "editing", isSet: true, value: data[config.path] ?? "", inner: { value: data[config.path] ?? "" }, confirm: "" }),
        serialize: (value) => ({ [config.path]: value.kind === "editing" ? value.value : (value as { inner?: { value: string } }).inner?.value ?? null }),
    };
};
