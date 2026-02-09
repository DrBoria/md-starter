import React from "react";
import styled from "styled-components";

import { Button } from "@md/components";

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.highlighted};
  color: ${({ theme }) => theme.colors.highlightedText};

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
    text-decoration: underline;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.offsets.betweenElements};
  min-height: 50vh;
  justify-content: center;
`;

const NotFoundSection: React.FC<{
  name: string;
  buttonText?: string;
  onClick?: () => void;
}> = ({ name, buttonText, onClick }) => (
  <Container>
    <b>No {name}s found.</b>
    {onClick && (
      <>
        <span className="mb-5">Import your {name} data to begin.</span>
        <StyledButton onClick={onClick}>{buttonText}</StyledButton>
      </>
    )}
  </Container>
);

export { NotFoundSection };
