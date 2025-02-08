import { gql } from "@apollo/client";
import { TUseQuery } from ".";

const useQueryAdminMeta = <TData>(list: string[], useQuery: TUseQuery<TData>) => {
  let resultString = "";
  for (const item of list) {
    const firstLetterLower = item.charAt(0).toLowerCase();
    const remainingItem = item.slice(1);
    resultString += `${item}: ${firstLetterLower}${remainingItem}sCount\n`;
  }

  const query = useQuery(
    gql`
      query AdminMetaQuery {
        keystone {
          adminMeta {
            lists {
              key
              hideCreate
              __typename
            }
          }
          __typename
        }
        ${resultString}
      }
    `,
    { errorPolicy: "all" },
  );

  return query;
};

export { useQueryAdminMeta };
