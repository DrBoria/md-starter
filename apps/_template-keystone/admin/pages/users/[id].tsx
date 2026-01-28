import React from "react";
import { useRouter } from "next/router";

import { ColumnsContainer } from "@md/components";
import { Input } from "@md/components";
import { EditItemForm, PageContainer } from "@md/sections/keystone";

const UpdateAgentTemplatePage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PageContainer
      header="Example Edit"
    >
      <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
        <EditItemForm
          itemId={id as string}
          listName="User"
        />

        <div className="flex gap-1 py-6">
          <Input value={id} readOnly />
        </div>
      </ColumnsContainer>
    </PageContainer>
  );
};

export default UpdateAgentTemplatePage;
