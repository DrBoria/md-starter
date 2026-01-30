import React from "react";
import { useRouter } from "next/router";
import { ColumnsContainer } from "@md/components";
import { CreateItemForm, PageContainer } from "@md/sections/keystone";

const GenericCreatePage = () => {
    const router = useRouter();
    const { listKey } = router.query;
    const listName = typeof listKey === 'string' ? listKey : '';

    if (!listName) return null;

    return (
        <PageContainer header={`Create ${listName}`}>
            <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
                <CreateItemForm
                    listName={listName}
                />
            </ColumnsContainer>
        </PageContainer>
    );
};

export default GenericCreatePage;
