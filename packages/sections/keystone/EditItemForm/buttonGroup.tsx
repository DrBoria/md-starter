import React from "react";

import { DeleteTemplate } from "../Modals/CentralModal";
import { Button, ColumnsContainer } from "@md/components";
import { IModalButton } from "../Modals/types";

interface TButtonGroupProps {
  listName: string;
  isPristine: boolean;
  onUpdate: () => void;
  onReset: () => void;
  onDelete: () => void;
  buttons?: IModalButton[];
  GlobalVars?: { ModalData: unknown };
}
const ButtonGroup = ({
  listName,
  isPristine,
  buttons,
  onUpdate,
  onReset,
  onDelete,
  GlobalVars
}: TButtonGroupProps) => {
  const handleOnDelete = () => {
    onDelete?.();
    if (GlobalVars) {
      GlobalVars.ModalData = null;
    }
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
                if (GlobalVars) {
                  GlobalVars.ModalData = {
                    content: (
                      <DeleteTemplate
                        item={listName}
                        onCancel={() => GlobalVars.ModalData = null}
                        onDelete={handleOnDelete}
                      />
                    ),
                  };
                }
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
