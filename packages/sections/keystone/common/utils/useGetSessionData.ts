import type { AuthenticatedItem } from "@keystone-6/core/types";
import { useEffect } from "react";

import type { TSession } from "@md/types";
import { useQueryListItem } from "@md/api/graphql";
import type { QueryResult } from "@apollo/client";
import { useQuery } from "@apollo/client";

let isSessionSet = false;
const sessionData =
  "id createdAt role { id name }";
const useGetSessionData = (
  authenticatedItem: AuthenticatedItem,
): TSession["data"][] | null => {
  if (authenticatedItem.state !== "authenticated") return null;

  const { data: session, error: sessionError } = useQueryListItem<QueryResult<{
    user: TSession["data"];
  }>>({
    listName: "user",
    selectedFields: sessionData,
    itemId: authenticatedItem.id,
    useQuery
  });

  useEffect(() => {
    if (isSessionSet) return;
    if (session) {
      isSessionSet = true;
      localStorage.setItem("user", JSON.stringify(session?.user));
    }
  }, [session]);

  if (sessionError) {
    console.error("Error getting Session Data", sessionError);
  }

  if (!session?.user) return null;
  return [session.user];
};

export { useGetSessionData };
