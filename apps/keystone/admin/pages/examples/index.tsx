import React from "react";
import { PageContainer } from "@keystone-6/core/admin-ui/components";

import { Button, ColumnsContainer, Link } from "@repo/components";
import { ItemsList } from "../../system-components/ItemsList";
import { useRouter } from "next/router";

const CampaignsOverviewPage = () => {
  const router = useRouter();
  return (
    <PageContainer header="Example List">
      <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
        <ItemsList
          listName="Example"
          withFullSupport
          withFilter
          withPagination
          displayedFields={["shortedText", "customRelationship"]}
        />
        <div className="flex gap-1 py-6">
          <Button onClick={() => router.push("/examples/create")}>Create</Button>
        </div>
      </ColumnsContainer>
    </PageContainer>
  );
};

export default CampaignsOverviewPage;
