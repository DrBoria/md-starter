import type { CellComponent, FieldController } from "@keystone-6/core/types";
import React from "react";
import { useRouter } from "next/router";
import { CellContainer } from "@keystone-6/core/admin-ui/components";
import { useToasts } from "@keystone-ui/toast";

import type { TSideBarModalData } from "../../../state";
import { ActionsMenuButton } from "@md/components/keystone";
import { SideBarModalData, useGlobalVariable } from "../../../state";
import { useDuplicateMutation } from "../../../utils/queries/useDuplicateMutation";
import { controller, DefaultCardValue } from "../utils/viewStarter";
import { ThemeProvider } from "@md/styles";

export interface IListName {
  listName: string;
}

const Cell: CellComponent<
  (...args: unknown[]) => FieldController<string, string> & IListName
> = ({
  item,
  field,
}: {
  item: Record<string, string>;
  field: FieldController<string, string> & IListName;
}) => {
    const toasts = useToasts();
    const [_, setSideBarModalData] = useGlobalVariable<TSideBarModalData>(
      SideBarModalData,
      "SideBarModalData",
    );

    const router = useRouter();
    const { duplicate } = useDuplicateMutation<{ item: { id: string } }>(
      field.listName,
    );

    const handleDuplicateClick = async () => {
      if (!item.id) return;

      try {
        const { data } = await duplicate({
          variables: { id: item.id.toString() },
        });

        if (data?.item) {
          toasts.addToast({
            tone: "positive",
            title: `Successfully created ${field.listName}`,
          });
          await router.push(`/${field.listName.toLowerCase()}s/${data?.item.id}`);
        }
      } catch (error: unknown) {
        console.error(`Error duplicating ${field.listName}:`, error);
      }
    };

    return (
      <ThemeProvider>
        <CellContainer>
          <ActionsMenuButton
            onDuplicate={handleDuplicateClick}
            onEdit={() =>
              setSideBarModalData({
                listName: field.listName,
                headerText: `Edit ${field.listName}`,
                id: item.id,
                type: "edit",
              })
            }
          />
        </CellContainer>
      </ThemeProvider>
    );
  };

const Field = () => null;
const CardValue = DefaultCardValue;

export { controller, CardValue, Field, Cell };
