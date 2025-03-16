import React from "react";
import styled from "styled-components";

import { ColumnsContainer } from "../../../default/Containers";
import { CopyButton } from "../../../default/Buttons";

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
  if (!withCopy) return <Container $maxWidth={maxWidth}>{text}</Container>;

  return (
    <ColumnsContainer
      $colsRatio={["1fr", "50px"]}
      style={{ alignItems: "center" }}
    >
      <Container $maxWidth={maxWidth}>{text}</Container>
      <CopyButton size="small" value={text} listName={text || ""} />
    </ColumnsContainer>
  );
};

export { ShortedText };
