import React from "react";

import { Button, ColumnsContainer } from "@md/components";
import { ItemsList } from "../../system-components/ItemsList";
import { useRouter } from "next/router";
import { PageContainer } from "../../system-components/PageContainer";

const ExamplesList = () => {
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

export default ExamplesList;
