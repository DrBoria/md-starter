import React from "react";

import { Button, ColumnsContainer } from "@md/components";
import { useRouter } from "next/router";
import { ItemsList, PageContainer } from "@md/sections/keystone";

const ExamplesList = () => {
  const router = useRouter();

  return (
    <PageContainer header="Example List">
      <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
        <ItemsList
          listName="Post"
          withFullSupport
          withFilter
          withPagination
          fieldsToRender={["name", "updateAt"]}
        />
        <div className="flex gap-1 py-6">
          <Button onClick={() => router.push("/posts/create")}>Create</Button>
        </div>
      </ColumnsContainer>
    </PageContainer>
  );
};

export default ExamplesList;
