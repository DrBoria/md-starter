import type { TextFieldConfig } from "@keystone-6/core/fields";
import { text } from "@keystone-6/core/fields";
import type { BaseListTypeInfo } from "@keystone-6/core/types";

export function Title<T extends BaseListTypeInfo>(config: TextFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/Title/views"
    };
    return text({
        ...config,
        ui
    });
}
