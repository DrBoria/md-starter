import React from "react";
import styled from "styled-components";

import { LucideIcon } from "../../../../default/common/Icons";
import { useLogger } from "../../../feedback/Logger";
import { ColumnsContainer } from "../../../../default/layout/Containers";

interface TShortedTextProps {
  text: string | null;
  withCopy?: boolean;
  maxWidth?: number;
}

const Container = styled.div<{ $maxWidth?: number }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${({ $maxWidth }) => `${$maxWidth}px`};
`;

const ShortedText: React.FC<TShortedTextProps> = ({
  text,
  withCopy,
  maxWidth,
}) => {
  const { add } = useLogger();

  if (!withCopy) return <Container $maxWidth={maxWidth}>{text}</Container>;

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text)
      .then(() => {
        add({
          title: "Copied",
          tone: "positive",
          description: text,
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to copy text: ', error);
      });
  };

  return (
    <ColumnsContainer
      $colsRatio={["1fr", "auto"]}
      style={{ alignItems: "center", gap: "8px" }}
    >
      <Container $maxWidth={maxWidth}>{text}</Container>
      <div onClick={handleCopy} style={{ cursor: "pointer", display: "flex" }}>
        <LucideIcon name="Copy" size={16} />
      </div>
    </ColumnsContainer>
  );
};

export { ShortedText };
