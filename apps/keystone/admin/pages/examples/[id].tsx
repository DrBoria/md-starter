import React from "react";
import { useRouter } from "next/router";

import { ColumnsContainer } from "@md/components";
import { Input } from "@md/components";
import { EditItemForm } from "../../system-components/EditItemForm";
import { PageContainer } from "../../system-components/PageContainer";

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

        <div className="flex gap-1 py-6">
          <Input value={id} readOnly />
        </div>
      </ColumnsContainer>
    </PageContainer>
  );
};

export default UpdateAgentTemplatePage;
