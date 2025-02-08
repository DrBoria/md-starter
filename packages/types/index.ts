import type { BaseListTypeInfo } from "@keystone-6/core/types";
import type { GraphQLError } from "graphql";
import type { StatusCodes } from "http-status-codes";

export interface IGraphQLObject {
  id: string;
  created_at: Date | string;
  __typename: string;
  [key: string]: unknown;
}

export interface TSession {
  listKey: BaseListTypeInfo["key"];
  itemId: string;
  data: {
    id: string;
    createdAt: string;
    role: {
      id: string;
      name: string;
    };
  };
}

export type TOperation = (baseArgs: {
  session?: TSession;
  item?: BaseListTypeInfo["item"];
}) => boolean | Promise<boolean>;

export interface TError extends Error {
  code?: StatusCodes;
  statusCode?: StatusCodes;
  errorMessage: string;
}

export interface IPrismaError {
  extensions: {
    code: "string";
    debug: "string";
  };
  message: "Prisma error";
}

export interface IOption {
  label: string;
  value: string | number;
}

export type TValue = Record<
  string,
  | { kind: "error"; errors: readonly [GraphQLError, ...GraphQLError[]] }
  | { kind: "value"; value: unknown }
>;

export type { Lists } from '../../apps/keystone/node_modules/.keystone/types';
export type { FieldMeta, ListMeta } from "@keystone-6/core/types";
