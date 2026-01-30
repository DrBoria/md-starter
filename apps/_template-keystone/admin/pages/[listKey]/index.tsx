import React from "react";
import { useRouter } from "next/router";
import { useKeystone } from "@keystone-6/core/admin-ui/context";
import { Button, ColumnsContainer } from "@md/components";
import { ItemsList, PageContainer } from "@md/sections/keystone";

const GenericListPage = () => {
    const router = useRouter();
    const { adminMeta } = useKeystone();
    const { listKey } = router.query;

    const list = Object.values(adminMeta?.lists || {}).find(l => l.path === listKey);
    const listName = list?.key || (typeof listKey === 'string' ? listKey : '');

    if (!listName) return null;

    return (
        <PageContainer header={`${listName} List`}>
            <ColumnsContainer $colsRatio={["2fr", "1fr"]} className="py-4">
                <ItemsList
                    listName={listName}
                    withFullSupport
                    withFilter
                    withPagination
                // No hardcoded fieldsToRender -> default behavior
                />
                <div className="flex gap-1 py-6">
                    <Button onClick={() => router.push(`/${listName}/create`)}>Create</Button>
                </div>
            </ColumnsContainer>
        </PageContainer>
    );
};

export default GenericListPage;
