import type { ApolloError } from "@apollo/client/errors";
import type {
  DataGetter,
  DeepNullable,
  ItemData,
} from "@keystone-6/core/admin-ui/utils";
import { useMemo } from "react";
import { makeDataGetter } from "@keystone-6/core/admin-ui/utils";

import { lowerCaseFirstLetter } from "@md/utils";

export type FlexibleItemData = Record<string, DeepNullable<ItemData>>;

const useItemDataGetter = (
  data: DeepNullable<FlexibleItemData> | undefined,
  listName: string,
  error?: ApolloError,
): [DataGetter<ItemData>, DataGetter<ItemData>] => {
  const dataGetter = makeDataGetter<DeepNullable<FlexibleItemData>>(
    data ?? {},
    error?.graphQLErrors,
  );

  const itemGetter =
    useMemo(() => {
      if (data) {
        return makeDataGetter(data, error?.graphQLErrors).get(
          lowerCaseFirstLetter(listName),
        );
      }
    }, [data, error]) ?? (dataGetter.get("item") as DataGetter<ItemData>);

  const keystone = dataGetter.get("keystone") as DataGetter<ItemData>;
  return [itemGetter as DataGetter<ItemData>, keystone];
};

export { useItemDataGetter };
