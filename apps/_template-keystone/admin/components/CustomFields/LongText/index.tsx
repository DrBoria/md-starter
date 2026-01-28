import type { TextFieldConfig } from "@keystone-6/core/fields";
import { text } from "@keystone-6/core/fields";
import type { BaseListTypeInfo } from "@keystone-6/core/types";

export function LongText<T extends BaseListTypeInfo>(config: TextFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/LongText/views"
    };
    return text({
        ...config,
        ui
    });
}
