import React from "react";

import { useModal } from "../../../default/Modals";
import { Button } from "../../../default/Button";

interface TActionButtonsProps {
  isPristine: boolean;
  item: string;
  onUpdate: () => void;
  onReset: () => void;
  onDelete: () => void;
  lessButtons?: boolean;
}
const ActionButtons = ({
  isPristine,
  onUpdate,
  onReset,
  onDelete,
  item,
  lessButtons,
}: TActionButtonsProps) => {
  const { setModalData } = useModal();

  const handleOnDelete = () => {
    onDelete();
    setModalData(null);
  };

  return (
    <div className="flex justify-between">
      <Button
        text="Save changes"
        disabled={isPristine}
        onClick={() => onUpdate()}
      />

      {!lessButtons && (
        <div>
          {!isPristine && (
            <Button
              text="Reset changes"
              weight="none"
              onClick={() => onReset()}
            />
          )}

          <Button
            text="Delete"
            tone={"negative"}
            onClick={() => {
              setModalData({
                content: (
                  <DeleteTemplate
                    item={item}
                    onCancel={() => setModalData(null)}
                    onDelete={handleOnDelete}
                  />
                ),
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ActionButtons;
