import { gql, useQuery } from "@apollo/client";

const useQueryAdminMeta = <TData>(list: string[]) => {
  let resultString = "";
  for (const item of list) {
    const firstLetterLower = item.charAt(0).toLowerCase();
    const remainingItem = item.slice(1);
    resultString += `${item}: ${firstLetterLower}${remainingItem}sCount\n`;
  }

  const query = useQuery<TData>(
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
