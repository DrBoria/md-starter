import type { DeserializedValue } from "@keystone-6/core/admin-ui/utils";
import type { ListMeta } from "@keystone-6/core/types";
import { useRouter } from "next/router";

import type { TSession } from "../../../../types";

interface IWhereParams {
  AND?: Array<{
    agentType?: { equals: "writer" | "reviewer" | "extractor" };
    state?: { equals: "success" };
  }>;
  OR: Array<
    { organization: { id: { in: string[] } } } | { organization: null }
  >;
  [key: string]: unknown;
}

const getWhereParameters = (
  list: ListMeta,
  itemValue?: DeserializedValue,
  session?: TSession["data"],
): IWhereParams => {
  const router = useRouter();
  const { pathname } = router;

  // Return early if the organization kind is 'error'
  if (itemValue?.organization?.kind === "error") return { OR: [] };

  // Initialize whereParams with an empty OR array
  const whereParams: IWhereParams = {
    OR: [],
  };

  // Handling organization filtering based on user role
  if (list.fields.organization) {
    let OrgId = session?.organization?.id;

    // Admins can have an item-based organization ID or session-based
    if (session?.role?.name === "Admin") {
      const itemOrgId = itemValue?.organization?.value?.value?.id;
      if (itemOrgId) OrgId = itemOrgId;
    }
    // Pushing the OR condition for both set and unset (null) organizations
    whereParams.OR.push(
      OrgId
        ? { organization: { id: { in: [OrgId] } } } // Filter for specific organization
        : { organization: null }, // Filter for items with no organization (null)
    );

    // Explicitly add the `organization: null` case to handle unset relations
    whereParams.OR.push({ organization: null });
  }

  // Logic for filtering by agentType and state
  if (pathname.includes("agent-writers")) {
    whereParams.AND = [{ agentType: { equals: "writer" } }];
  } else if (pathname.includes("agent-reviewers")) {
    whereParams.AND = [{ agentType: { equals: "reviewer" } }];
  } else if (
    pathname.includes("agent-extractors") ||
    pathname.includes("campaigns")
  ) {
    if (list.key.includes("FileSet")) {
      whereParams.AND = [{ state: { equals: "success" } }];
    }
  }

  return whereParams;
};

export { getWhereParameters };
