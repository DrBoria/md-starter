import type { RelationshipFieldConfig } from "@keystone-6/core/fields";
import { relationship } from "@keystone-6/core/fields";
import type { BaseListTypeInfo } from "@keystone-6/core/types";

export function RelationshipMany<T extends BaseListTypeInfo>(config: RelationshipFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/RelationshipMany/views"
    };

    return relationship({
        ...config,
        ui
    } as RelationshipFieldConfig<T>);
}
