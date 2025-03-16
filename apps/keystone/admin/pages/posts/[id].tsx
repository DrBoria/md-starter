import React from "react";
import { useRouter } from "next/router";

import { Button, ColumnsContainer, useModal } from "@md/components";
import { Input } from "@md/components";
import { DeleteTemplate, EditItemForm, PageContainer } from "@md/sections/keystone";
import { CopyButton } from "@md/components/keystone";

const UpdateAgentTemplatePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { modalData, sideBarModalData, setModalData, setSideBarModalData } = useModal();

  return (
    <PageContainer
      header="Example Edit"
    >
      <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
        <EditItemForm
          itemId={id as string}
          listName="Post"
        />

        <div className="flex gap-1 py-6">
          <Input value={id} readOnly />
        </div>

        <CopyButton />
        <Button onClick={() => {
          setModalData({
            content: (
              <DeleteTemplate
                item={'Post'}
                onCancel={() => setModalData(null)}
                onDelete={console.log}
              />
            ),
          })
        }}>Central Modal</Button>
        <Button onClick={() => {
          setSideBarModalData({
            listName: "Post",
            headerText: "Upload CSV File(s) using provided command",
            id: 'cm8285ocd0000bkxt6jkwffw4',
            type: "edit",
          });
        }}>SideBar Modal</Button>
      </ColumnsContainer>
    </PageContainer>
  );
};

export default UpdateAgentTemplatePage;
