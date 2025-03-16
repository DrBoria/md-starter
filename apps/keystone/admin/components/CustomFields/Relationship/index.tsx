import { relationship, RelationshipFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function Relationship<T extends BaseListTypeInfo>(config: RelationshipFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/Relationship/views"
    };

    return relationship({
        ...config,
        ui
    } as RelationshipFieldConfig<T>);
}
