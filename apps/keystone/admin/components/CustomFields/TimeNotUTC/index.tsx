import { timestamp, TimestampFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function TimeNotUTC<T extends BaseListTypeInfo>(config: TimestampFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/components/CustomFields/TimeNotUTC/views"
    };
    return timestamp({
        ...config,
        ui
    });
}
