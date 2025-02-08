import React from "react";

import { ColumnsContainer } from "@md/components";
import { CreateItemForm, PageContainer } from "@md/sections/keystone";

const CreateAgentTemplatePage = () => {
  return (
    <PageContainer
      header="Example Create"
    >
      <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
        <CreateItemForm
          listName="User"
        />
      </ColumnsContainer>
    </PageContainer>
  );
};

export default CreateAgentTemplatePage;
