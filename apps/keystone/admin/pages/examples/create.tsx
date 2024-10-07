import React from "react";

import { ColumnsContainer } from "@repo/components";
import { CreateItemForm } from "../../system-components/CreateItemForm";
import { PageContainer } from "../../system-components/PageContainer";

const CreateAgentTemplatePage = () => {
  return (
    <PageContainer
      header="Example Create"
    >
      <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
        <CreateItemForm
          listName="Example"
          tabs={{
            // Use tab names as keyst for tabsContent
            tabNames: ["First", "Second"],
            tabsContent: {
              // Add list of fields that should be displayed in tabs content
              First: ["customRelationship", "checkbox"],
              Second: [
                "timestamp_createdAt",
                "customRelationship",
              ],
            },
          }}
          conditionalFields={[
            {
              // Filed name that will be used as master field
              fieldName: "exampleType",
              // first and second is possible values that exampleType can take
              first: [
                // Fields displayed if exampleType = first
                { fieldName: "customRelationship" },
                { fieldName: "checkbox" },
              ],
              second: [
                // Fields displayed if exampleType = second
                { fieldName: "timestamp_createdAt" },
                { fieldName: "customRelationship" },
              ],
            },
          ]}
        />
      </ColumnsContainer>
    </PageContainer>
  );
};

export default CreateAgentTemplatePage;
