import React from "react";
import { Button } from "@keystone-ui/button";

import type { IModalButton, TModalData } from "../../state";
import { DeleteTemplate } from "../../sections/Modals/CentralModal";
import { ModalData, useGlobalVariable } from "../../state";

interface TButtonGroupProps {
  listName: string;
  isPristine: boolean;
  onUpdate: () => void;
  onReset: () => void;
  onDelete: () => void;
  buttons?: IModalButton[];
}
const ButtonGroup = ({
  listName,
  isPristine,
  buttons,
  onUpdate,
  onReset,
  onDelete,
}: TButtonGroupProps) => {
  const [_, setModalData] = useGlobalVariable<TModalData>(
    ModalData,
    "ModalData",
  );

  const handleOnDelete = () => {
    onDelete?.();
    setModalData(null);
  };

  return (
    <div className="flex justify-between">
      {!buttons && (
        <>
          <Button
            weight="bold"
            tone={"active"}
            isDisabled={isPristine}
            onClick={() => onUpdate()}
          >
            Save changes
          </Button>
          <div className="flex gap-4">
            {isPristine ? (
              <Button
                weight="none"
                isDisabled={true}
                onClick={() => onUpdate()}
              >
                No changes
              </Button>
            ) : (
              <Button weight="none" onClick={() => onReset()}>
                Reset changes
              </Button>
            )}

            <Button
              tone={"negative"}
              onClick={() => {
                setModalData({
                  content: (
                    <DeleteTemplate
                      item={listName}
                      onCancel={() => setModalData(null)}
                      onDelete={handleOnDelete}
                    />
                  ),
                });
              }}
            >
              Delete
            </Button>
          </div>
        </>
      )}

      {/* Render buttons passed from actions */}
      {buttons?.map((button) => {
        if (button.name === "submit") {
          return button.view?.(onUpdate, isPristine);
        }
        if (button.name === "delete") {
          return button.view?.(onDelete);
        }
        if (button.name === "reset") {
          return button.view?.(onDelete, isPristine);
        }
        return button.view?.();
      })}
    </div>
  );
};

export { ButtonGroup };
