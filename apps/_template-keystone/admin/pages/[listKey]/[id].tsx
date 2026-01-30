import React from "react";
import { useRouter } from "next/router";
import { ColumnsContainer, Input } from "@md/components";
import { EditItemForm, PageContainer } from "@md/sections/keystone";

const GenericEditPage = () => {
    const router = useRouter();
    const { listKey, id } = router.query;
    const listName = typeof listKey === 'string' ? listKey : '';

    if (!listName || !id) return null;

    return (
        <PageContainer header={`Edit ${listName}`}>
            <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
                <EditItemForm
                    itemId={id as string}
                    listName={listName}
                />
                <div className="flex gap-1 py-6">
                    <Input value={id} readOnly />
                </div>
            </ColumnsContainer>
        </PageContainer>
    );
};

export default GenericEditPage;
