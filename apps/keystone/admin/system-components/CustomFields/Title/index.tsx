import { text, TextFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function Title<T extends BaseListTypeInfo>(config: TextFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/system-components/CustomFields/Title/views"
    };
    return text({
        ...config,
        ui
    });
}
