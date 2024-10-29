import React from "react";

import { ColumnsContainer } from "@md/components";
import { CreateItemForm } from "../../system-components/CreateItemForm";
import { PageContainer } from "../../system-components/PageContainer";

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
