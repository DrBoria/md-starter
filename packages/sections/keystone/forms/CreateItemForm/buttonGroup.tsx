import React from "react";

import type { IModalButton} from "@md/components";
import { Button, OneLineContainer } from "@md/components";
import { Icons } from "@md/components/keystone";
import { ThemeProvider } from "@md/styles";

interface TButtonGroupProps {
  singular: string;
  state: string;
  onSubmit: () => void;
  handleSubmit: () => void;
  buttons?: IModalButton[];
  isVertical?: boolean;
}

const ButtonGroup = ({
  singular,
  state,
  buttons,
  onSubmit,
  handleSubmit,
  isVertical,
}: TButtonGroupProps) => {
  return (
    <ThemeProvider>
      <div
        className={`flex ${isVertical ? "flex-col gap-2" : "justify-between w-full"}`}
      >
        {!buttons && (
          <>
            {!buttons && (
              <Button
                // isLoading={state === "loading"}
                // weight="bold"
                // tone="active"
                onClick={onSubmit}
              >
                <OneLineContainer>
                  <Icons.SaveIcon size="small" />
                  Create {singular}
                </OneLineContainer>
              </Button>
            )}
          </>
        )}

        {/* Render buttons passed from actions */}
        {buttons?.map((button) => {
          if (button.name === "submit") {
            return button.view(handleSubmit, state === "loading");
          }
          return button.view();
        })}
      </div>
    </ThemeProvider>
  );
};

export { ButtonGroup };
