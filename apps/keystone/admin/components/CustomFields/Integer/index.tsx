import { integer, IntegerFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function Integer<T extends BaseListTypeInfo>(config: IntegerFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/Integer/views"
    };
    return integer({
        ...config,
        ui
    });
}
