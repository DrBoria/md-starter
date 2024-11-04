import React from "react";

import type { IModalButton, TModalData } from "../../state";
import { DeleteTemplate } from "../../sections/Modals/CentralModal";
import { ModalData, useGlobalVariable } from "../../state";
import { Button, ColumnsContainer } from "@md/components";

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
    <ColumnsContainer>
      {!buttons && (
        <>
          <div>
            <Button
              type='submit'
              isDisabled={isPristine}
              onClick={() => onUpdate()}
            >
              Save changes
            </Button>
          </div>
          <ColumnsContainer>
            {isPristine ? (
              <Button
                isDisabled={true}
                onClick={() => onUpdate()}
              >
                No changes
              </Button>
            ) : (
              <Button onClick={() => onReset()}>
                Reset changes
              </Button>
            )}

            <Button
              type='delete'
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
          </ColumnsContainer>
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
    </ColumnsContainer>
  );
};

export { ButtonGroup };
