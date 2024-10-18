import React from 'react';
import styled from "styled-components";

import { Copy } from "../../../keystone/Button";
import { ColumnsContainer } from "../../Containers";

interface TTextProps {
  text: string | null;
  maxWidth?: number;
}

const Container = styled.div<{ maxWidth?: number }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${({ maxWidth }) => `${maxWidth}px`};
`;

const ShortedText: React.FC<TTextProps> = ({
  text,
  maxWidth,
}) => {

  return (
    <ColumnsContainer
      $colsRatio={["1fr", "50px"]}
      style={{ alignItems: "center" }}
    >
      <Container maxWidth={maxWidth}>{text}</Container>
      <Copy size="small" value={text} listName={text || ""} />
    </ColumnsContainer>
  );
};

export { ShortedText };
