import React from "react";
import { Button } from "@md/components";

import { DeleteTemplate } from "../../overlays/Modals/templates";
import { ThemeProvider } from "@md/styles";

interface TButtonGroupProps {
  isPristine: boolean;
  item: string;
  onUpdate: () => void;
  onReset: () => void;
  onDelete: () => void;
  lessButtons?: boolean;
  setModalData: (modalTemplate: React.ReactNode | null) => void;
}

const ButtonGroup = ({
  isPristine,
  onUpdate,
  onReset,
  onDelete,
  item,
  lessButtons,
  setModalData
}: TButtonGroupProps) => {
  const handleOnDelete = () => {
    onDelete();
    setModalData(null);
  };

  return (
    <ThemeProvider>
      <div className="flex justify-between">
        <Button
          weight="bold"
          tone={"active"}
          disabled={isPristine}
          onClick={() => onUpdate()}
        >
          Save changes
        </Button>

        {!lessButtons && (
          <div>
            {isPristine ? (
              <Button weight="none" disabled={true} onClick={() => onUpdate()}>
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
                setModalData(
                  <DeleteTemplate
                    item={item}
                    onCancel={() => setModalData(null)}
                    onDelete={handleOnDelete}
                  />
                );
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};
export { ButtonGroup };
