import { timestamp, TimestampFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function TimeZone<T extends BaseListTypeInfo>(config: TimestampFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/TimeZone/views"
    };
    return timestamp({
        ...config,
        ui
    });
}
