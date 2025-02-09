import React from "react";
import styled from "styled-components";

import { Copy } from "../../Button";
import { ColumnsContainer } from "../../../default/Containers";

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
      <Copy size="small" value={text} listName={text || ""} />
    </ColumnsContainer>
  );
};

export { ShortedText };
