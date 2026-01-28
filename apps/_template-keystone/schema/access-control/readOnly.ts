import { allowAll, denyAll } from "@keystone-6/core/access";
import type { BaseAccessArgs } from "@keystone-6/core/dist/declarations/src/types/config/access-control";
import type { BaseListTypeInfo, MaybePromise } from "@keystone-6/core/types";

import type { TOperation } from "../../types";
import { isAdmin, isOwner, isViewer } from "./roles";

export const readOnlyFieldProps = {
  isReadOnly: true,
  access: {
    read: allowAll,
    create: denyAll,
    update: denyAll,
  },
  graphql: {
    omit: {
      create: true,
      update: true,
    },
  },
  ui: {
    createView: {
      fieldMode: () => "hidden" as const,
    },
    itemView: {
      fieldMode: () => "read" as const,
    },
    listView: {
      fieldMode: () => "read" as const,
    },
  },
};

interface IReadOnlyAccess<T extends BaseListTypeInfo> {
  operation: {
    query: TOperation;
    create: TOperation;
    update: TOperation;
    delete: TOperation;
  };
  filter: {
    query: (
      args: BaseAccessArgs<T>,
    ) => MaybePromise<boolean | Record<string, unknown>>;
    update: (
      args: BaseAccessArgs<T>,
    ) => MaybePromise<boolean | Record<string, unknown>>;
    delete: (
      args: BaseAccessArgs<T>,
    ) => MaybePromise<boolean | Record<string, unknown>>;
  };
}

export const readOnlyWithOrg = <
  T extends BaseListTypeInfo,
>(): IReadOnlyAccess<T> => ({
  operation: {
    query: () => true,
    create: () => false,
    update: (data) => !isViewer(data),
    delete: (data) => !isViewer(data),
  },
  filter: {
    query: ({ session }: BaseAccessArgs<T>) => {
      return isAdmin({ session }) || isOwner({ session });
    },
    update: ({ session }: BaseAccessArgs<T>) => {
      return isAdmin({ session }) || isOwner({ session });
    },
    delete: ({ session }: BaseAccessArgs<T>) => {
      return isAdmin({ session }) || isOwner({ session });
    },
  },
});
