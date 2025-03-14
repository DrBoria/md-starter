import { select, SelectFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function DynamicStatusLabel<T extends BaseListTypeInfo>(config: SelectFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/system-components/CustomFields/DynamicStatusLabel/views"
    };
    return select({
        ...config,
        ui
    });
}
