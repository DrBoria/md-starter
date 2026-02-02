import { timestamp } from "@keystone-6/core/fields";
import { allowAll, denyAll } from "@keystone-6/core/access";
import type { BaseListTypeInfo } from "@keystone-6/core/types";

export const readOnlyFieldProps = {
    isReadOnly: true,
    access: {
        read: allowAll,
        create: denyAll,
        update: denyAll,
    },
    graphql: {
        omit: {
            create: true,
            update: true,
        },
    },
    ui: {
        createView: { fieldMode: () => "hidden" as const },
        itemView: { fieldMode: () => "read" as const },
        listView: { fieldMode: () => "read" as const },
    },
};

export function createdAt<T extends BaseListTypeInfo>() {
    return timestamp<T>({
        defaultValue: { kind: "now" },
        db: { map: "created_at", isNullable: false },
        ...readOnlyFieldProps,
    });
}

export function updatedAt<T extends BaseListTypeInfo>() {
    return timestamp<T>({
        db: { map: "updated_at", isNullable: false, updatedAt: true },
        ...readOnlyFieldProps,
    });
}
