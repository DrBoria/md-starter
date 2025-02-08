import type {
  BaseListTypeInfo,
  CommonFieldConfig,
  DBField,
  FieldTypeFunc,
} from "@keystone-6/core/types";
import { graphql } from "@keystone-6/core";
import { fieldType } from "@keystone-6/core/types";

type TDbField = {
  isNullable?: boolean;
  default?: string;
} & Partial<DBField>;

type TokenFieldConfig<ListTypeInfo extends BaseListTypeInfo> = {
  db?: TDbField;
  isReadOnly?: boolean;
  defaultValue?: string | null;
  isIndexed?: boolean | "unique";
  ui?: {
    displayMode?: "input" | "textarea" | undefined;
  };
  validation?: {
    isRequired?: boolean;
    match?: {
      regex: RegExp;
      explanation?: string;
    };
    length?: {
      min?: number;
      max?: number;
    };
  };
} & CommonFieldConfig<ListTypeInfo>;

const fieldStarter =
  <T>(viewLink: string) =>
  <ListTypeInfo extends BaseListTypeInfo>({
    isReadOnly,
    isIndexed,
    db = {} as TDbField,
    ...config
  }: TokenFieldConfig<ListTypeInfo> & {
    variables?: T;
  }): FieldTypeFunc<ListTypeInfo> => {
    const defaultValue = db?.isNullable
      ? (config.defaultValue ?? null)
      : (config.defaultValue ?? "");
    return () =>
      fieldType({
        ...db,
        kind: "scalar",
        mode: db?.isNullable ? "optional" : "required",
        default:
          defaultValue === null
            ? undefined
            : { kind: "literal", value: defaultValue },
        scalar: "String",
        index: isIndexed === true ? "index" : isIndexed || undefined,
      })({
        ...config,
        input: {
          uniqueWhere:
            isIndexed === "unique"
              ? { arg: graphql.arg({ type: graphql.String }) }
              : undefined,
          create: {
            arg: graphql.arg({
              type: graphql.String,
              defaultValue:
                typeof defaultValue === "string" ? defaultValue : undefined,
            }),
            resolve(val: string | undefined | null) {
              if (val !== undefined) return val;
              return config.defaultValue ?? null;
            },
          },
          update: { arg: graphql.arg({ type: graphql.String }) },
        },
        output: graphql.field({
          type: graphql.String,
        }),
        __ksTelemetryFieldTypeName: "@keystone-6/text",
        views: `./admin/system-components/CustomFields/${viewLink}/views.tsx`,
        getAdminMeta() {
          if (config.variables) {
            return {
              isReadOnly: Boolean(isReadOnly),
              ...config.variables,
            };
          }
          return {
            defaultValue: defaultValue ?? (db?.isNullable ? null : ""),
            isReadOnly: Boolean(isReadOnly),
          };
        },
      });
  };

export { fieldStarter };
