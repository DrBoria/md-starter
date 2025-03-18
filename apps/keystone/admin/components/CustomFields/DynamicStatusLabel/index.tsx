import type { SelectFieldConfig } from "@keystone-6/core/fields";
import { select } from "@keystone-6/core/fields";
import type { BaseListTypeInfo } from "@keystone-6/core/types";

export function DynamicStatusLabel<T extends BaseListTypeInfo>(config: SelectFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/DynamicStatusLabel/views"
    };
    return select({
        ...config,
        ui
    });
}
