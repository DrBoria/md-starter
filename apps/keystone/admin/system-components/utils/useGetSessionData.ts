import type { AuthenticatedItem } from "@keystone-6/core/types";
import { useEffect } from "react";

import type { TSession } from "../../../types";
import type { Lists } from ".keystone/types";
import { useQueryListItem } from "../../queries/useQueryListItem";

let isSessionSet = false;
const sessionData =
  "id createdAt role { id name } organization { id }";
const useGetSessionData = (
  authenticatedItem: AuthenticatedItem,
): [Lists.User.Item & { role: Lists.Role.Item }] | null => {
  if (authenticatedItem.state !== "authenticated") return null;

  const { data: session, error: sessionError } = useQueryListItem<{
    user: TSession["data"];
  }>({
    listName: "user",
    selectedFields: sessionData,
    itemId: authenticatedItem.id,
  });

  useEffect(() => {
    if (isSessionSet) return;
    if (session) {
      isSessionSet = true;
      localStorage.setItem(
        "organization",
        JSON.stringify(session?.user?.organization),
      );
      localStorage.setItem("user", JSON.stringify(session?.user));
    }
  }, [session]);

  if (sessionError) {
    console.error("Error getting Session Data", sessionError);
  }

  return [session?.user] as unknown as [
    Lists.User.Item & { role: Lists.Role.Item },
  ];
};

export { useGetSessionData };
