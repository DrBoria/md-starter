import { relationship, RelationshipFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function RelationshipMany<T extends BaseListTypeInfo>(config: RelationshipFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/system-components/CustomFields/RelationshipMany/views"
    };

    return relationship({
        ...config,
        ui
    } as RelationshipFieldConfig<T>);
}
