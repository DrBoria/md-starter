import { DocumentNode, TypedDocumentNode } from '@apollo/client';

export { getFieldType } from './getFieldType';
export { useCreateMutation } from './useCreateMutation';
export { useDeleteMutation } from './useDeleteMutation';
export { useQueryAdminMeta } from './useQueryAdminMeta';
export { useQueryList } from './useQueryList';
export { useAuthenticate } from './useAuthenticate';
export { useQueryListItem } from './useQueryListItem';
export { useUpdateMutation } from './useUpdateMutation';
export { useDuplicateMutation } from './useDuplicateMutation';
export { client as apolloClient } from './apolloClient';

export type TUseQuery<TData> = (
    query: DocumentNode | TypedDocumentNode<any>,
    options?: any
) => TData;

export type TUseMutation<TData, TVariables> = (
    mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: any
  ) => [
    (variables: TVariables) => Promise<TData>,
    { loading: boolean; error?: any; data?: TData }
  ];
