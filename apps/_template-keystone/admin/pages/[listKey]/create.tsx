import React from "react";
import { useRouter } from "next/router";
import { useKeystone } from "@keystone-6/core/admin-ui/context";
import { ColumnsContainer } from "@md/components";
import { CreateItemForm, PageContainer } from "@md/sections/keystone";

const GenericCreatePage = () => {
    const router = useRouter();
    const { adminMeta } = useKeystone();
    const { listKey } = router.query;

    const list = Object.values(adminMeta?.lists || {}).find(l => l.path === listKey);
    const listName = list?.key || (typeof listKey === 'string' ? listKey : '');

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
