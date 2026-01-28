import type { BaseListTypeInfo, MaybePromise } from "@keystone-6/core/types";

import type { TSession } from "../../types";

/*********************************************/
/******** Use for all access options *********/
/*********************************************/

type TIsAccessable = (baseArgs: {
  session?: TSession; // session is object that we define here - https://github.com/ablt-ai/fenix/blob/c120d5e29009c5add9dab9f3bfaeca241f7cd755/turborepo/apps/keystone/auth.ts#L38
}) => boolean | Promise<boolean>;

const isAccessable: TIsAccessable = ({ session }) => {
  if (!session?.itemId) return false;
  return session.data.role.name.toLowerCase() === "admin";
};

// NOTE: USAGE
// 1. Open or create a schema in the schema folder
// 2. Modify following example. Add it to the schema
// export const SchemaName = list<Lists.SchemaName.TypeInfo>({
// access: {
//     operation: {
//         query: isAccessable, // or update, delete, create
//     },
//     filter: {
//         query: isAccessable
//     },
//  }
// })

export { isAccessable };

/*********************************************/
/***** Use only for filter access.filter *****/
/*********************************************/

type TIsAccessableWithFilter = ({
  session,
}: {
  session?: TSession;
}) => MaybePromise<boolean | BaseListTypeInfo["inputs"]["where"]>;

const isAccessableWithFilter: TIsAccessableWithFilter = (
  { session }, // session is object that we define here - https://github.com/ablt-ai/fenix/blob/c120d5e29009c5add9dab9f3bfaeca241f7cd755/turborepo/apps/keystone/auth.ts#L38
) => {
  try {
    if (!session?.itemId) return false;
    // Here is a link to Graphql Query Filters - https://keystonejs.com/docs/graphql/filters
    // Here organization = field in a fields object of label/table where we use this utility
    // id = id of organization
    return { organization: { id: { equals: session.data.organization.id } } };
  } catch (error) {
    // If errors occures, access is forbidden
    console.error(error);
    return false;
  }
};

export { isAccessableWithFilter };

// NOTE: USAGE
// 1. Open or create a schema in the schema folder
// 2. Add it to the schema filter ONLY!
// export const SchemaName = list<Lists.SchemaName.TypeInfo>({
//     access: {
//         filter: {
//             query: isAccessableWithFilter,     // Single rule
//             update: (...context) => {          // Multiple rules combination
//                 return isAccessable(...context) || isAccessableWithFilter(...context);
//             },
//         },
//     }
// })
